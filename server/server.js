require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json()); 

const DATA_FILE = path.join(__dirname, 'projects.json');

// Helper functions to safely read/write from local JSON file
const readData = () => {
    try {
        // Safe Check: If the file doesn't exist or is completely empty, initialize it instantly
        if (!fs.existsSync(DATA_FILE) || fs.readFileSync(DATA_FILE, 'utf8').trim() === '') {
            fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf8');
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Data recovery fail-safe triggered:", err);
        return []; // Always returns a clean array so the app never hits a 500 crash
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error("Failed to write data:", err);
    }
};

// --- ROUTES ---

// 1. GET Root Status
app.get('/', (req, res) => res.send('MYR File-Based API is Live.'));

// 2. GET All Projects
app.get('/api/projects', (req, res) => {
    const projects = readData();
    res.json([...projects].reverse());
});

// 3. GET Single Project Detail
app.get('/api/projects/:id', (req, res) => {
    const projects = readData();
    const project = projects.find(p => p._id === req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
});

// 4. POST New Project
app.post('/api/projects', (req, res) => {
    try {
        const { title, category, location, description, imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ error: "Please provide an image URL from Cloudinary" });
        }

        const projects = readData();
        const newProject = {
            _id: Date.now().toString(), 
            title: title || "Untitled Masterpiece",
            category: category || "Curation",
            location: location || "Kenya",
            description: description || "",
            imageUrl: imageUrl, 
            createdAt: new Date()
        };

        projects.push(newProject);
        writeData(projects);

        res.status(201).json(newProject);
    } catch (err) {
        console.error("Server Write Error:", err);
        res.status(500).json({ error: "Failed to save project to local archive" });
    }
});

// 5. DELETE Project
app.delete('/api/projects/:id', (req, res) => {
    let projects = readData();
    const projectExists = projects.some(p => p._id === req.params.id);
    
    if (!projectExists) return res.status(404).json({ message: "Project not found" });

    projects = projects.filter(p => p._id !== req.params.id);
    writeData(projects);
    res.json({ message: "Removed successfully from archive" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 File-Based Server running on port ${PORT}`));