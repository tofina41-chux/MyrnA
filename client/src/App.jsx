import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import AddProject from './components/AddProject';
import ProjectDetails from './pages/ProjectDetails';
import About from './pages/About';
import Services from './pages/Services';
import Journal from './pages/Journal';
import Footer from './components/Footer';

function App() {
  // Change #2: Forced White Theme (State remains for potential future use, but logic is fixed to Light)
  const [darkMode, setDarkMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Simplified toggle for the presentation - keeping it white as per request
  const toggleTheme = () => {
    console.log("Theme is locked to Light Mode per brand guidelines.");
  };

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <Router>
      {/* 🖱️ Change #4: Custom Cursor (Now Orange) */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-8 h-8 border-2 border-myr-orange rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
      />

      {/* Change #2: Container forced to White Background */}
      <div className="min-h-screen bg-white text-black transition-colors duration-700 font-sans pb-24">

        {/* Navbar: Passing false to darkMode to keep it in 'Light' styling */}
        <Navbar darkMode={false} toggleTheme={toggleTheme} />

        <main className="py-10">
          <Routes>
            <Route path="/" element={<Gallery isAdmin={false} />} />
            <Route path="/admin" element={<Gallery isAdmin={true} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/add" element={<AddProject />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/journal" element={<Journal />} />
          </Routes>
        </main>


        {/* Persistent Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;