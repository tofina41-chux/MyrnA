require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Project = require('./models/Project');

const app = express();

// FIX: Corrected CORS syntax and opened it for mobile testing
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✨ Global Cloud Database Connected"))
    .catch(err => console.log("❌ DB Error:", err));

// --- SERVICE MODEL & ROUTES ---
const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  category: String,
});

const Service = mongoose.model('Service', serviceSchema);

app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PROJECT ROUTES ---
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// NEW: Single Project Detail Route (Fixes the "Blank Page" issue)
app.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/projects', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        const result = await Project.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: "Project not found" });
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete" });
    }
});

// --- JOURNAL MODEL & ROUTES ---
const journalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    externalLink: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Journal = mongoose.model('Journal', journalSchema);

app.get('/api/journal', async (req, res) => {
    try {
        const entries = await Journal.find().sort({ createdAt: -1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch the archive." });
    }
});

app.post('/api/journal', async (req, res) => {
    try {
        const newEntry = new Journal(req.body);
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(400).json({ error: "Validation failed." });
    }
});

app.delete('/api/journal/:id', async (req, res) => {
    try {
        await Journal.findByIdAndDelete(req.params.id);
        res.json({ message: "Entry removed." });
    } catch (err) {
        res.status(500).json({ error: "Delete failed." });
    }
});

// Root route to check if server is alive
app.get('/', (req, res) => res.send('MYR API is Live and Running.'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));