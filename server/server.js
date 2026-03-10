require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Project = require('./models/Project');

const app = express();
app.use(cors(origin: "https://myr-art-direction.vercel.app"));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Local MongoDB Connected"))
    .catch(err => console.log("❌ Local DB Error:", err));

// --- ROUTES ---

// 1. GET all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }); // Newest first
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. POST a new project
app.post('/api/projects', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. DELETE a project (FIXED)
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const result = await Project.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete" });
    }
});

// --- JOURNAL MODEL ---
const journalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    externalLink: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Journal = mongoose.model('Journal', journalSchema);

// --- JOURNAL ROUTES ---

// 1. Get all journal entries (Public)
app.get('/api/journal', async (req, res) => {
    try {
        const entries = await Journal.find().sort({ createdAt: -1 }); // Newest first
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch the archive." });
    }
});

// 2. Post a new entry (Admin)
app.post('/api/journal', async (req, res) => {
    try {
        const newEntry = new Journal(req.body);
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(400).json({ error: "Validation failed. Narrative required." });
    }
});

// 3. Delete an entry (Admin)
app.delete('/api/journal/:id', async (req, res) => {
    try {
        await Journal.findByIdAndDelete(req.params.id);
        res.json({ message: "Entry removed from history." });
    } catch (err) {
        res.status(500).json({ error: "Delete failed." });
    }
});

// --- SITE CONTENT MODEL (About/Services) ---
const contentSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true }, // e.g., 'about' or 'services'
    text: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
});

const Content = mongoose.model('Content', contentSchema);

// --- CONTENT ROUTES ---

// 1. Get specific content (Public)
app.get('/api/content/:slug', async (req, res) => {
    try {
        const content = await Content.findOne({ slug: req.params.slug });
        res.json(content || { text: "Content under curation..." });
    } catch (err) {
        res.status(500).json({ error: "Fetch failed." });
    }
});

// 2. Update content (Admin)
app.put('/api/content/:slug', async (req, res) => {
    try {
        const updated = await Content.findOneAndUpdate(
            { slug: req.params.slug },
            { text: req.body.text, lastUpdated: Date.now() },
            { upsert: true, new: true } // Creates it if it doesn't exist
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Update failed." });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));