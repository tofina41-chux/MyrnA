import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Gallery from './components/Gallery';
import AddProject from './components/AddProject';

function App() {
  return (
    <Router>
      {/* Universal Navigation Bar */}
      <nav className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="font-serif tracking-tighter text-xl">MYR©</Link>
          <div className="space-x-8 text-[10px] uppercase tracking-[0.2em] text-gray-500">
            <Link to="/" className="hover:text-black transition-colors">Portfolio</Link>
            <Link to="/add" className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors">
              + New Project
            </Link>
          </div>
        </div>
      </nav>

      {/* The Switcher */}
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/add" element={<AddProject />} />
      </Routes>
    </Router>
  );
}

export default App;