const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allows your React app to talk to this server
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected for MYR Project"))
    .catch(err => console.log("❌ DB Connection Error:", err));

// [C] The Controller/Route Logic
app.get('/api/status', (req, res) => {
    res.json({
        message: "Connection Successful",
        project: "MYR Art Direction",
        status: "Operational"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));