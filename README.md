# MYR | Art Direction & Curatorial Archive

A high-end, minimalist digital archive built for **Myrna**, a Mombasa-based Art Director and Curator. This platform serves as a visual portfolio, a journal for field notes, and a catalog of professional services.



##  Tech Stack
- **Frontend:** React.js, Tailwind CSS, Framer Motion (Hosted on Vercel)
- **Backend:** Node.js, Express.js (Hosted on Render)
- **Database:** MongoDB Atlas (Cloud)
- **Image Hosting:** Cloudinary

##  Key Features
- **Project Archive:** Categorized art direction projects with deep-dive narratives.
- **Field Notes (Journal):** A curated blog for theoretical and impact-based writings.
- **Service Management:** Dynamic listing of professional consulting services.
- **Admin Suite:** Restricted access for adding and removing content directly from the live site.
- **Global Reach:** Fully responsive design optimized for mobile-first viewing in Kenya and abroad.

##  Project Structure

├── client/              # React frontend (Vite)
│   ├── src/components/  # Reusable UI elements
│   └── src/pages/       # Gallery, Journal, Services, Admin
├── server/              # Node.js backend
│   ├── models/          # MongoDB Schemas (Project, Journal, Service)
│   └── server.js        # API Routes & Middleware

## Environment Variables
To run this project locally, create a .env file in the /server folder:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string

## API Endpoints
GET /api/projects - Fetch all archive pieces

GET /api/journal - Fetch all field notes

GET /api/services - Fetch service offerings

POST /api/projects - Add new work (Admin only)

## Design Philosophy
The UI follows a "Visual Silence" approach—utilizing generous whitespace, bold typography (Serif for titles, Sans for data), and a signature "Myr Orange" (#FF5F1F) to emphasize calls to action and movement.
~Developed by Tofina41-Chux~
