import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Gallery({ darkMode, isAdmin }) {
    const [projects, setProjects] = useState([])
    const [status, setStatus] = useState("Connecting...")
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        fetch('http://localhost:5000/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data)
                setStatus("Connected")
            })
            .catch(() => setStatus("Offline ❌"))
    }, [])

    const deleteProject = async (id) => {
        if(window.confirm("Delete this artwork from the archive?")) {
            try {
                await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' });
                setProjects(projects.filter(p => p._id !== id));
            } catch (err) {
                alert("Failed to delete project");
            }
        }
    };

    // Filter Logic
    const filteredProjects = activeFilter === "All" 
        ? projects 
        : projects.filter(p => p.category === activeFilter);

    return (
        <div className="bg-[#F9F9F9] dark:bg-[#0a0a0a] text-[#1A1A1A] dark:text-white min-h-screen p-6 md:p-12 transition-colors duration-700">
            <main className="max-w-7xl mx-auto">
                
                {/* 1. FILTER BAR */}
                <div className="flex flex-wrap gap-8 mb-16 border-b border-black/5 dark:border-white/5 pb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {["All", "Curation", "Strategic Art Direction", "Visual Art"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`text-[10px] uppercase tracking-[0.4em] transition-all font-['Syncopate'] ${
                                activeFilter === cat 
                                ? "opacity-100 font-bold border-b border-black dark:border-white" 
                                : "opacity-30 hover:opacity-100"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* 2. SECRET ADMIN BOX */}
                {isAdmin && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="mb-16 border-2 border-dashed border-black/20 dark:border-white/20 p-12 text-center group hover:border-black dark:hover:border-white transition-all cursor-pointer"
                    >
                        <Link to="/add" className="font-['Syncopate'] text-[10px] tracking-[0.5em] uppercase font-bold block w-full h-full">
                            + Add New Project to Archive
                        </Link>
                    </motion.div>
                )}

                {/* 3. THE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-16">
                    {filteredProjects.map((project) => (
                        <motion.div 
                            key={project._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative flex flex-col"
                        >
                            {/* Image Container with Link */}
                            <Link to={`/project/${project._id}`}>
                                <div className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-800 overflow-hidden mb-8 relative cursor-pointer">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                    />
                                    <div className="absolute top-6 left-6 bg-white dark:bg-black text-black dark:text-white text-[8px] px-3 py-1 tracking-[0.3em] uppercase font-bold">
                                        {project.location}
                                    </div>
                                </div>
                            </Link>

                            {/* Info */}
                            <div className="space-y-4">
                                <h3 className="text-3xl font-['Cormorant_Garamond'] italic tracking-tighter uppercase dark:text-white leading-tight">
                                    {project.title}
                                </h3>
                                <p className="text-[9px] text-neutral-400 uppercase tracking-[0.4em] font-['Syncopate']">
                                    {project.category}
                                </p>
                                
                                {isAdmin && (
                                    <button 
                                        onClick={() => deleteProject(project._id)}
                                        className="mt-4 text-[9px] text-red-500 uppercase tracking-widest hover:bg-red-500 hover:text-white border border-red-500/20 px-3 py-1 transition-all"
                                    >
                                        [ Remove from Archive ]
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Scrolling Footer */}
            <div className="mt-40 border-t border-black dark:border-white/20 pt-10">
                {["Art Direction", "Curatorial Impact"].map((text) => (
                    <h2 key={text} 
                        className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none text-transparent transition-all duration-1000" 
                        style={{ WebkitTextStroke: darkMode ? '1px #ffffff' : '1px #1a1a1a' }}>
                        {text}
                    </h2>
                ))}
            </div>
        </div>
    )
}

export default Gallery