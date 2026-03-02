import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import AddProject from './components/AddProject';
import ProjectDetails from './pages/ProjectDetails';
import About from './pages/About'; // We will build this next
import Services from './pages/Services';
import Journal from './pages/Journal';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <Router>
      {/* 🖱️ Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border border-black dark:border-white rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
        transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
      />

      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-700 font-sans">

        {/* 🧭 Replaced the old nav with the new component */}
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

        {/* 🎞️ Routes */}
        <div className="py-10">
          <Routes>
            <Route path="/" element={<Gallery darkMode={darkMode} isAdmin={false} />} />
            <Route path="/admin" element={<Gallery darkMode={darkMode} isAdmin={true} />} />
            <Route path="/about" element={<About />} />
            <Route path="/add" element={<AddProject />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/journal" element={<Journal />} />
          </Routes>
        </div>

        {/* 🎡 Infinite Marquee (Bottom) */}
        <div className="fixed bottom-0 w-full bg-black dark:bg-white text-white dark:text-black py-4 overflow-hidden flex whitespace-nowrap border-y border-black dark:border-white z-40">
          <motion.div
            className="flex space-x-12 items-center"
            animate={{ x: [0, -1500] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-[10px] uppercase tracking-[0.5em] font-bold">
                50% Proceeds Reinvested into Education — Curation with Purpose — Strategic Art Direction —
              </span>
            ))}
          </motion.div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;