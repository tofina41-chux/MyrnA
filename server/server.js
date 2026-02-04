const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Read artworks
app.get("/api/artworks", (req, res) => {
    const data = fs.readFileSync("./server/data/artworks.json");
    res.json(JSON.parse(data));
});

// Add new artwork (future admin use)
app.post("/api/artworks", (req, res) => {
    const newArt = req.body;

    const data = JSON.parse(
        fs.readFileSync("./server/data/artworks.json")
    );

    data.push(newArt);

    fs.writeFileSync(
        "./server/data/artworks.json",
        JSON.stringify(data, null, 2)
    );

    res.json({ message: "Artwork added!" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
