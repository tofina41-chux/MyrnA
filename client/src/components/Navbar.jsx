import { Link } from 'react-router-dom';

function Navbar({ darkMode, toggleTheme }) {
  return (
    <nav className="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 p-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-serif tracking-tighter text-3xl dark:text-white uppercase italic">MYR©</Link>
        
        <div className="flex items-center space-x-10 text-[10px] uppercase tracking-[0.3em] font-medium">
          <Link to="/" className="text-black dark:text-white hover:italic transition-all">Archive</Link>
          <Link to="/about" className="text-black dark:text-white hover:italic transition-all">About</Link>
          <Link to="/journal" className="text-black dark:text-white hover:italic transition-all">Journal</Link>
          
          <button 
            onClick={toggleTheme}
            className="text-black dark:text-white border border-black/10 dark:border-white/20 px-3 py-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;