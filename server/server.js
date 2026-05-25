require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

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

        // 1. Initialize projects table
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

        // 2. Initialize journals table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS journals (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                entry_date DATE NOT NULL,
                content TEXT NOT NULL,
                image_url TEXT NOT NULL,
                external_link TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        useDb = true;
        console.log('✅ Database available — Postgres tables configured.');
    } catch (err) {
        console.error('❌ Database initialization failed — falling back to JSON:', err.message || err);
        useDb = false;
        pool = null;
    }
}

initDB();

// --- ROUTES ---

app.get('/', (req, res) => res.send('MYR API is Live.'));

// ==========================================
// 🎨 PROJECTS ROUTE ENDPOINTS
// ==========================================

app.get('/api/projects', async (req, res) => {
    if (useDb && pool) {
        try {
            const result = await pool.query('SELECT id AS "_id", id, title, category, location, description, image_url AS "image_url", image_url AS "imageUrl", created_at AS "createdAt" FROM projects ORDER BY id DESC');
            return res.json(result.rows);
        } catch (err) {
            console.error('DB read error:', err);
        }
    }

    try {
        const file = path.join(__dirname, 'projects.json');
        if (!fs.existsSync(file)) fs.writeFileSync(file, '[]', 'utf8');
        const rawData = JSON.parse(fs.readFileSync(file, 'utf8')) || [];
        
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

app.delete('/api/projects/:id', async (req, res) => {
    const id = req.params.id;
    if (useDb && pool) {
        try {
            const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ message: 'Project not found' });
            return res.json({ message: 'Removed successfully from permanent archive' });
        } catch (err) {
            console.error('DB delete error:', err);
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


// ==========================================
// 📝 JOURNAL ROUTE ENDPOINTS (NEW)
// ==========================================

// Fetch all field notes (Newest entries first)
app.get('/api/journal', async (req, res) => {
    if (useDb && pool) {
        try {
            const result = await pool.query(`
                SELECT id AS "_id", id, title, entry_date AS "date", content, 
                       image_url AS "image_url", image_url AS "imageUrl", 
                       external_link AS "externalLink", created_at AS "createdAt" 
                FROM journals ORDER BY entry_date DESC, id DESC
            `);
            return res.json(result.rows);
        } catch (err) {
            console.error('DB journal read error:', err);
        }
    }

    try {
        const file = path.join(__dirname, 'journals.json');
        if (!fs.existsSync(file)) fs.writeFileSync(file, '[]', 'utf8');
        const rawData = JSON.parse(fs.readFileSync(file, 'utf8')) || [];
        
        const normalizedData = rawData.map(j => ({
            _id: j._id || j.id,
            id: j.id || j._id,
            title: j.title,
            date: j.date || j.entry_date,
            content: j.content,
            image_url: j.image_url || j.imageUrl,
            imageUrl: j.imageUrl || j.image_url,
            externalLink: j.externalLink || j.external_link,
            createdAt: j.createdAt || j.created_at
        }));

        // Sort items by date descending for uniform behavior
        return res.json(normalizedData.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
        console.error('JSON fallback journal read error:', err);
        return res.status(500).json({ error: 'Failed to fetch journal notes' });
    }
});

// Commit a new field note entry
app.post('/api/journal', async (req, res) => {
    const { title, date, content, imageUrl, externalLink } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: 'Every entry needs a visual anchor image.' });
    }

    const cleanDate = date || new Date().toISOString().split('T')[0];

    if (useDb && pool) {
        try {
            const queryText = `
                INSERT INTO journals (title, entry_date, content, image_url, external_link)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id AS "_id", id, title, entry_date AS "date", content, 
                          image_url AS "image_url", image_url AS "imageUrl", 
                          external_link AS "externalLink", created_at AS "createdAt"
            `;
            const values = [title || 'Untitled Reflection', cleanDate, content || '', imageUrl, externalLink || ''];
            const result = await pool.query(queryText, values);
            return res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('DB journal write error:', err);
        }
    }

    try {
        const file = path.join(__dirname, 'journals.json');
        if (!fs.existsSync(file)) fs.writeFileSync(file, '[]', 'utf8');
        const data = JSON.parse(fs.readFileSync(file, 'utf8')) || [];
        const maxId = data.reduce((m, j) => Math.max(m, Number(j._id || j.id || 0)), 0);
        
        const newItem = {
            _id: maxId + 1,
            id: maxId + 1,
            title: title || 'Untitled Reflection',
            date: cleanDate,
            content: content || '',
            image_url: imageUrl,
            imageUrl: imageUrl,
            externalLink: externalLink || '',
            createdAt: new Date().toISOString()
        };
        
        data.push(newItem);
        fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
        return res.status(201).json(newItem);
    } catch (err) {
        console.error('JSON fallback journal write error:', err);
        return res.status(500).json({ error: 'Failed to save field note' });
    }
});

// Delete a field note entry
app.delete('/api/journal/:id', async (req, res) => {
    const id = req.params.id;
    if (useDb && pool) {
        try {
            const result = await pool.query('DELETE FROM journals WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ message: 'Field note not found' });
            return res.json({ message: 'Removed successfully from permanent journal archive' });
        } catch (err) {
            console.error('DB journal delete error:', err);
        }
    }

    try {
        const file = path.join(__dirname, 'journals.json');
        const data = JSON.parse(fs.readFileSync(file, 'utf8')) || [];
        const idx = data.findIndex(j => String(j._id || j.id) === String(id));
        if (idx === -1) return res.status(404).json({ message: 'Field note not found' });
        data.splice(idx, 1);
        fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
        return res.json({ message: 'Removed successfully from fallback journal archive' });
    } catch (err) {
        console.error('JSON fallback journal delete error:', err);
        return res.status(500).json({ error: 'Failed to delete journal item' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Database Server running on port ${PORT}`));