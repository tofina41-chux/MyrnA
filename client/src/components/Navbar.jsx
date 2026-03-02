import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-black/5 p-6 sticky top-0 z-50 transition-colors duration-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Branding with Wide Spacing */}
        <Link to="/" className="project-title text-2xl text-black hover:text-myr-orange transition-colors italic">
          MYR©
        </Link>

        <div className="flex items-center space-x-10 text-[10px] uppercase tracking-[0.3em] font-bold">
          <Link to="/" className="text-black hover:text-myr-orange transition-all">Archive</Link>
          <Link to="/about" className="text-black hover:text-myr-orange transition-all">About</Link>
          <Link to="/services" className="text-black hover:text-myr-orange transition-all">Services</Link>
          <Link to="/journal" className="text-black hover:text-myr-orange transition-all">Journal</Link>

          {/* Subtle Orange Dot to show 'Live' status instead of a toggle */}
          <div className="flex items-center gap-2 pl-4 border-l border-black/10">
            <span className="w-2 h-2 bg-myr-orange rounded-full animate-pulse"></span>
            <span className="opacity-40">Mombasa</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;