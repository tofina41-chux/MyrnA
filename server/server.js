require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Cloudinary Configuration (Keep this in your backend .env!)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ dest: 'uploads/' });
const DATA_FILE = path.join(__dirname, 'projects.json');

// Helper functions to read/write from local JSON file
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// --- ROUTES ---

// 1. GET Root Status
app.get('/', (req, res) => res.send('MYR File-Based API is Live.'));

// 2. GET All Projects
app.get('/api/projects', (req, res) => {
    const projects = readData();
    // Return newest projects first
    res.json([...projects].reverse());
});

// 3. GET Single Project Detail
app.get('/api/projects/:id', (req, res) => {
    const projects = readData();
    const project = projects.find(p => p._id === req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
});

// 4. POST New Project (Uploads image to Cloudinary, stores text in JSON)
app.post('/api/projects', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "Please provide an image" });

        // Upload physical file to Cloudinary permanent storage
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "myr_archive"
        });

        // Delete the temporary file from Render's disk space
        fs.unlinkSync(req.file.path);

        const projects = readData();
        const newProject = {
            _id: Date.now().toString(), // Generate a unique ID string
            title: req.body.title,
            category: req.body.category,
            location: req.body.location,
            description: req.body.description,
            imageUrl: result.secure_url, // Permanent Cloudinary Link
            createdAt: new Date()
        };

        projects.push(newProject);
        writeData(projects);

        res.status(201).json(newProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save project" });
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
app.listen(PORT, () => console.log(` File-Based Server running on port ${PORT}`));