import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Gallery from './components/Gallery';
import AddProject from './components/AddProject';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // This targets the very top <html> tag for Tailwind dark: classes
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
        
        {/* 🧭 Public Navigation (Clean & Minimal) */}
        <nav className="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 p-6 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="font-serif tracking-tighter text-3xl dark:text-white uppercase italic">MYR©</Link>
            
            <div className="flex items-center space-x-10 text-[10px] uppercase tracking-[0.3em] font-medium">
              <Link to="/" className="text-black dark:text-white hover:italic transition-all">Archive</Link>
              <button 
                onClick={toggleTheme}
                className="text-black dark:text-white border border-black/10 dark:border-white/20 px-3 py-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                {darkMode ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
        </nav>

        {/* 🎞️ Routes */}
        <div className="py-10">
          <Routes>
            <Route path="/" element={<Gallery darkMode={darkMode} isAdmin={false} />} />
            {/* The "Secret" Admin Route */}
            <Route path="/admin" element={<Gallery darkMode={darkMode} isAdmin={true} />} />
            <Route path="/add" element={<AddProject />} />
          </Routes>
        </div>

        {/* 🎡 Infinite Marquee */}
        <div className="bg-black dark:bg-white text-white dark:text-black py-4 overflow-hidden flex whitespace-nowrap border-y border-black dark:border-white">
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
      </div>
    </Router>
  );
}

export default App;