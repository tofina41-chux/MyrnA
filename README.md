# MYR Art Direction© — Digital Flagship

> "Never decorative. Always intentional."
## FOLDER STRUCTURE
/myr-art-direction
│
├── /backend (The "Model" & "Controller")
│   ├── /config             # Database & Environment settings
│   ├── /models             # [M] DATA SCHEMAS (Artworks, Impact Stats, Projects)
│   │   ├── Artwork.js
│   │   ├── ImpactReport.js
│   │   └── Project.js
│   ├── /controllers        # [C] LOGIC (Processing reinvestment %, gallery filters)
│   │   ├── galleryController.js
│   │   └── impactController.js
│   ├── /routes             # API Endpoints for the frontend
│   └── server.js
│
├── /frontend (The "View")
│   ├── /public             # Static assets (Images/Videos of Myrna's art)
│   ├── /src
│   │   ├── /components     # UI Reusables (The "Gallery Wall")
│   │   ├── /views          # [V] PAGE LAYOUTS (Home, About, Impact)
│   │   │   ├── HomeView.jsx
│   │   │   ├── PortfolioView.jsx
│   │   │   └── ImpactView.jsx
│   │   ├── /services       # API calls to fetch data from the Backend
│   │   └── App.js
│
└── /shared                 # Shared constants (Color palettes, Brand rules)
##  Project Vision
MYR Art Direction© is the digital home for Myrna van der Veen’s multidisciplinary practice. The platform sits at the intersection of **High-End Art Curation**, **Corporate Strategy**, and **Social Impact**. 

The goal of this website is to reflect a "Curated Excellence" that bridges the worlds of international institutions and grassroots creative empowerment in Kenya.

##  Brand Pillars
* **Strategic Art Direction:** Art as a long-term asset, enhancing ESG alignment and brand value.
* **Curatorial Excellence:** High-end private and public exhibitions with a focus on narrative and spatial awareness.
* **Purpose & Impact:** A core philosophy of agency and dignity. 50% of exhibition proceeds are reinvested into education for underprivileged children in Kenya.

##  Design Principles (The "MYR" Aesthetic)
1. **Gallery Minimalism:** Use white space as a structural element. The art and the strategy must breathe.
2. **The Human Element:** Photos of Myrna "in action" and artists in mentorship should feel cinematic and dignified, never like "charity" tropes.
3. **Typography of Authority:** A sophisticated Serif for headers (Wisdom/Curation) paired with a clean Sans-Serif for body text (Strategy/Modernity).
4. **Intentional Motion:** Smooth, subtle transitions. The user experience should feel like walking through a quiet, well-lit gallery.

##  Key File Structure Highlights
* `/src/data/projects.json`: Centralized source of truth for all curated exhibitions and artworks.
* `/public/assets/images/impact`: High-resolution imagery focusing on the mentorship programs and educational reinvestment.
* `/public/assets/images/portfolio`: Professional captures of Myrna’s personal art and curated spatial designs.

##  Credits & Rights
All curatorial concepts and creative authorship developed under **MYR Art Direction©** are owned by Myrna van der Veen. This digital implementation must respect the "bespoke and discreet" nature of her consultancy work.

---
*Empowering Creativity. Transforming Lives.*