require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Resilient DB setup: use Postgres when DATABASE_URL is present and working,
// otherwise fall back to a local JSON file (`projects.json`). This prevents
// the frontend from receiving 500 errors when the DB service is unavailable.
let pool = null;
let useDb = false;
async function initDB() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        console.warn('DATABASE_URL not set — using local JSON fallback');
        useDb = false;
        return;
    }

    try {
        const { Pool } = require('pg');
        pool = new Pool({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

        // Try a simple query to validate the connection and create table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                location TEXT NOT NULL,
                description TEXT,
                image_url TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        useDb = true;
        console.log('✅ Database available — using Postgres for projects.');
    } catch (err) {
        console.error('❌ Database initialization failed — falling back to JSON:', err.message || err);
        useDb = false;
        pool = null;
    }
}

initDB();

// --- ROUTES ---

// 1. GET Root Status
app.get('/', (req, res) => res.send('MYR API is Live.'));

// 2. GET All Projects (Newest first)
app.get('/api/projects', async (req, res) => {
    if (useDb && pool) {
        try {
            const result = await pool.query('SELECT id AS "_id", id, title, category, location, description, image_url AS "image_url", image_url AS "imageUrl", created_at AS "createdAt" FROM projects ORDER BY id DESC');
            return res.json(result.rows);
        } catch (err) {
            console.error('DB read error:', err);
        }
    }

    // JSON fallback - Normalizing keys defensively
    try {
        const file = path.join(__dirname, 'projects.json');
        if (!fs.existsSync(file)) fs.writeFileSync(file, '[]', 'utf8');
        const rawData = JSON.parse(fs.readFileSync(file, 'utf8')) || [];
        
        // Clean each item dynamically so it functions on both key styles
        const normalizedData = rawData.map(p => ({
            _id: p._id || p.id,
            id: p.id || p._id,
            title: p.title,
            category: p.category,
            location: p.location,
            description: p.description,
            image_url: p.image_url || p.imageUrl,
            imageUrl: p.imageUrl || p.image_url,
            createdAt: p.createdAt || p.created_at
        }));

        return res.json(normalizedData.reverse());
    } catch (err) {
        console.error('JSON fallback read error:', err);
        return res.status(500).json({ error: 'Failed to fetch archive items' });
    }
});

// 3. GET Single Project Detail
app.get('/api/projects/:id', async (req, res) => {
    const id = req.params.id;
    if (useDb && pool) {
        try {
            const result = await pool.query(
                'SELECT id AS "_id", title, category, location, description, image_url AS "imageUrl", created_at AS "createdAt" FROM projects WHERE id = $1',
                [id]
            );
            if (result.rows.length === 0) return res.status(404).json({ message: 'Project not found' });
            return res.json(result.rows[0]);
        } catch (err) {
            console.error('DB read error (single):', err);
            // fallthrough to JSON
        }
    }

    try {
        const file = path.join(__dirname, 'projects.json');
        const data = JSON.parse(fs.readFileSync(file, 'utf8')) || [];
        const found = data.find(p => String(p._id || p.id) === String(id));
        if (!found) return res.status(404).json({ message: 'Project not found' });
        return res.json(found);
    } catch (err) {
        console.error('JSON fallback read error (single):', err);
        return res.status(500).json({ error: 'Error reading project' });
    }
});

// 4. POST New Project
app.post('/api/projects', async (req, res) => {
    const { title, category, location, description, imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: 'Please provide an image URL from Cloudinary' });
    }

    if (useDb && pool) {
        try {
            const queryText = `
                INSERT INTO projects (title, category, location, description, image_url)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id AS "_id", id, title, category, location, description, image_url AS "image_url", image_url AS "imageUrl", created_at AS "createdAt"
            `;
            const values = [
                title || 'Untitled Masterpiece',
                category || 'Curation',
                location || 'Kenya',
                description || '',
                imageUrl
            ];
            const result = await pool.query(queryText, values);
            return res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('DB write error:', err);
        }
    }

    // JSON fallback: save data safely with both naming standard variations
    try {
        const file = path.join(__dirname, 'projects.json');
        if (!fs.existsSync(file)) fs.writeFileSync(file, '[]', 'utf8');
        const data = JSON.parse(fs.readFileSync(file, 'utf8')) || [];
        const maxId = data.reduce((m, p) => Math.max(m, Number(p._id || p.id || 0)), 0);
        
        const newItem = {
            _id: maxId + 1,
            id: maxId + 1,
            title: title || 'Untitled Masterpiece',
            category: category || 'Curation',
            location: location || 'Kenya',
            description: description || '',
            image_url: imageUrl,
            imageUrl: imageUrl,
            createdAt: new Date().toISOString()
        };
        
        data.push(newItem);
        fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
        return res.status(201).json(newItem);
    } catch (err) {
        console.error('JSON fallback write error:', err);
        return res.status(500).json({ error: 'Failed to save project' });
    }
});

// 5. DELETE Project
app.delete('/api/projects/:id', async (req, res) => {
    const id = req.params.id;
    if (useDb && pool) {
        try {
            const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ message: 'Project not found' });
            return res.json({ message: 'Removed successfully from permanent archive' });
        } catch (err) {
            console.error('DB delete error:', err);
            // fallthrough to JSON
        }
    }

    try {
        const file = path.join(__dirname, 'projects.json');
        const data = JSON.parse(fs.readFileSync(file, 'utf8')) || [];
        const idx = data.findIndex(p => String(p._id || p.id) === String(id));
        if (idx === -1) return res.status(404).json({ message: 'Project not found' });
        data.splice(idx, 1);
        try { fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8'); } catch (w) { console.warn('Could not persist delete to projects.json:', w.message || w); }
        return res.json({ message: 'Removed successfully from fallback archive' });
    } catch (err) {
        console.error('JSON fallback delete error:', err);
        return res.status(500).json({ error: 'Failed to delete item' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Database Server running on port ${PORT}`));