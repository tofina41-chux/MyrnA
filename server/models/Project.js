const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: {
        type: String,
        enum: ['Curation', 'Strategic Art Direction', 'Visual Art'],
        required: true
    },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    location: { type: String, default: 'Kenya' },
    impactReinvestment: { type: Number, default: 50 }, // The 50% reinvestment rule
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);