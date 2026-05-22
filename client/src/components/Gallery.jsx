import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import API_BASE_URL from '../api.js'; // Centralized API URL for easy maintenance

function Gallery({ isAdmin }) {
    const [projects, setProjects] = useState([])
    const [status, setStatus] = useState("Connecting...")
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        setStatus("Waking up server...");
        fetch(`${API_BASE_URL}/api/projects`)
            .then(res => {
                if (!res.ok) throw new Error("Server response was not ok");
                return res.json();
            })
            .then(data => {
                setProjects(data);
                setStatus("Connected");
            })
            .catch((err) => {
                console.error(err);
                setStatus("Offline ❌ - Try refreshing in 30 seconds");
            });
    }, []);

    // Working Delete Function aligned to SQL ID structures
    const deleteProject = async (id) => {
        if (!window.confirm("Permanently remove this artwork from the live archive?")) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, { 
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                // ✅ Changed from p._id to p.id
                setProjects(projects.filter(p => p.id !== id));
            } else {
                alert("Failed to delete. Server might be sleeping.");
            }
        } catch (err) {
            console.error("Delete Error:", err);
            alert("Network error. Try again.");
        }
    };

    const filteredProjects = projects.filter(p => {
        const matchesCategory = activeFilter === "All" || p.category === activeFilter;
        const matchesSearch = p.title?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-white text-black min-h-screen p-6 md:p-12">
            <main className="max-w-7xl mx-auto">

                {/* HEADER & SEARCH TOGGLE */}
                <div className="flex justify-between items-center mb-12">
                    <div className="flex flex-wrap gap-8 border-b border-black/5 pb-4 overflow-x-auto whitespace-nowrap scrollbar-hide flex-1">
                        {["All", "Curation", "Strategic Art Direction", "Visual Art"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`text-[10px] uppercase tracking-[0.4em] transition-all font-medium ${activeFilter === cat
                                    ? "text-myr-orange border-b border-myr-orange pb-1"
                                    : "opacity-30 hover:opacity-100 hover:text-myr-orange"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center ml-8">
                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.input
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "200px", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    className="border-b border-myr-orange bg-transparent text-[10px] uppercase tracking-widest outline-none px-2 py-1 transition-all"
                                    placeholder="Search Name..."
                                    autoFocus
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            )}
                        </AnimatePresence>
                        <button
                            onClick={() => {
                                setIsSearchOpen(!isSearchOpen);
                                if (isSearchOpen) setSearchTerm('');
                            }}
                            className="ml-4 text-[10px] uppercase tracking-[0.4em] text-myr-orange font-bold hover:italic"
                        >
                            {isSearchOpen ? '[ Close ]' : '[ Search ]'}
                        </button>
                    </div>
                </div>

                {/* ADMIN ACTIONS */}
                {isAdmin && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                        <Link to="/add" className="border border-dashed border-myr-orange/40 p-6 text-center text-[9px] tracking-widest uppercase font-bold text-myr-orange hover:bg-myr-orange/5 transition-all">
                            + New Project
                        </Link>
                        <Link to="/add-journal" className="border border-dashed border-black/20 p-6 text-center text-[9px] tracking-widest uppercase font-bold text-black hover:bg-black/5 transition-all">
                            + New Journal
                        </Link>
                        <Link to="/add-service" className="border border-dashed border-black/20 p-6 text-center text-[9px] tracking-widest uppercase font-bold text-black hover:bg-black/5 transition-all">
                            + New Service
                        </Link>
                    </div>
                )}

                {/* THE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-16">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <motion.div
                                key={project.id || project._id} // ✅ Fallback key handler
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="group relative flex flex-col"
                            >
                                {/* ✅ Aligned to handle standard PostgreSQL ID */}
                                <Link to={`/project/${project.id || project._id}`}>
                                    <div className="aspect-[3/4] bg-neutral-100 overflow-hidden mb-8 relative border border-black/5">
                                        <img
                                            // ✅ Fallback support for snake_case and camelCase field layouts
                                            src={project.image_url || project.imageUrl}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute top-6 left-6 bg-myr-orange text-white text-[8px] px-3 py-1 tracking-[0.3em] uppercase font-bold">
                                            {project.location}
                                        </div>
                                    </div>
                                </Link>

                                <div className="space-y-4">
                                    <h3 className="project-title text-xl md:text-2xl leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-[9px] text-neutral-400 uppercase tracking-[0.4em] font-medium group-hover:text-myr-orange transition-colors">
                                        {project.category}
                                    </p>

                                    {isAdmin && (
                                        <button
                                            onClick={() => deleteProject(project.id || project._id)}
                                            className="mt-4 text-[9px] text-red-500 uppercase tracking-widest hover:bg-red-500 hover:text-white border border-red-500/20 px-3 py-1 transition-all"
                                        >
                                            [ Remove from Archive ]
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center opacity-30 text-[10px] uppercase tracking-widest">
                            {status === "Connected" ? "No matching masterpieces found." : status}
                        </div>
                    )}
                </div>
            </main>

            <div className="mt-40 border-t border-black/10 pt-10 overflow-hidden">
                {["Art Direction", "Curatorial Impact"].map((text) => (
                    <h2 key={text}
                        className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none text-transparent"
                        style={{ WebkitTextStroke: '1px #FF5F1F', opacity: 0.15 }}>
                        {text}
                    </h2>
                ))}
            </div>
        </div>
    )
}

export default Gallery