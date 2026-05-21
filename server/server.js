require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect to Supabase using the connection string from your .env file
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Automatically create the projects table if it doesn't exist in Supabase yet
const initDB = async () => {
    try {
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
        console.log("✅ Supabase permanent table is ready.");
    } catch (err) {
        console.error("❌ Database initialization failed:", err);
    }
};
initDB();

// --- ROUTES ---

// 1. GET Root Status
app.get('/', (req, res) => res.send('MYR Supabase-Backed API is Live.'));

// 2. GET All Projects (Newest first)
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT id AS "_id", title, category, location, description, image_url AS "imageUrl", created_at AS "createdAt" FROM projects ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch archive items" });
    }
});

// 3. GET Single Project Detail
app.get('/api/projects/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id AS "_id", title, category, location, description, image_url AS "imageUrl", created_at AS "createdAt" FROM projects WHERE id = $1',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: "Project not found" });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading project" });
    }
});

// 4. POST New Project (Inserts directly into your permanent cloud database)
app.post('/api/projects', async (req, res) => {
    try {
        const { title, category, location, description, imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ error: "Please provide an image URL from Cloudinary" });
        }

        const queryText = `
            INSERT INTO projects (title, category, location, description, image_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id AS "_id", title, category, location, description, image_url AS "imageUrl", created_at AS "createdAt"
        `;
        const values = [
            title || "Untitled Masterpiece",
            category || "Curation",
            location || "Kenya",
            description || "",
            imageUrl
        ];

        const result = await pool.query(queryText, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Database Write Error:", err);
        res.status(500).json({ error: "Failed to save project permanently to Supabase" });
    }
});

// 5. DELETE Project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Project not found" });
        res.json({ message: "Removed successfully from permanent archive" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete item" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Database Server running on port ${PORT}`));