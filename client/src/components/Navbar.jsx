import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAdmin, setIsAdmin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAdmin(false);
    navigate('/'); // Redirect to public gallery
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/5 py-6 px-6 md:px-12 transition-all duration-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* 🏷️ Brand Identity */}
        <Link to="/" className="group">
          <h1 className="text-xl font-serif italic tracking-tighter group-hover:text-myr-orange transition-colors">
            MYR<span className="text-[10px] ml-2 not-italic opacity-30 font-sans uppercase tracking-[0.3em]">Studio</span>
          </h1>
        </Link>

        {/* 🔗 Navigation Links */}
        <div className="flex items-center gap-8 text-[9px] uppercase tracking-[0.3em] font-bold">
          <Link to="/" className="hover:text-myr-orange transition-colors">Archive</Link>
          <Link to="/services" className="hover:text-myr-orange transition-colors">Services</Link>
          <Link to="/about" className="hover:text-myr-orange transition-colors">About</Link>
          <Link to="/journal" className="hover:text-myr-orange transition-colors">Journal</Link>

          {/* 🔐 Admin-Only Actions */}
          {isAdmin && (
            <div className="flex items-center gap-6 pl-6 border-l border-black/10">
              <Link to="/add" className="text-myr-orange hover:italic transition-all">
                [ + New ]
              </Link>
              <button
                onClick={handleLogout}
                className="opacity-40 hover:opacity-100 hover:text-red-500 transition-all uppercase"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* 🛰️ Live Status (Mombasa Time) */}
        <div className="hidden md:flex items-center gap-3 opacity-40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-myr-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-myr-orange"></span>
          </span>
          <span className="text-[8px] uppercase tracking-[0.4em] font-medium">
            Mombasa Live — {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} EAT
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;