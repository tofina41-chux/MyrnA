import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Gallery({ isAdmin }) {
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
        if (window.confirm("Delete this artwork from the archive?")) {
            try {
                await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' });
                setProjects(projects.filter(p => p._id !== id));
            } catch (err) {
                alert("Failed to delete project");
            }
        }
    };

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        /* Change #2: Forced White Background */
        <div className="bg-white text-black min-h-screen p-6 md:p-12 transition-colors duration-700">
            <main className="max-w-7xl mx-auto">

                {/* 1. FILTER BAR - Updated with Orange Accents */}
                <div className="flex flex-wrap gap-8 mb-16 border-b border-black/5 pb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
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

                {/* 2. SECRET ADMIN BOX */}
                {isAdmin && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-16 border-2 border-dashed border-myr-orange/20 p-12 text-center group hover:border-myr-orange transition-all cursor-pointer"
                    >
                        <Link to="/add" className="text-[10px] tracking-[0.5em] uppercase font-bold block w-full h-full text-myr-orange">
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
                            <Link to={`/project/${project._id}`}>
                                <div className="aspect-[3/4] bg-neutral-100 overflow-hidden mb-8 relative cursor-pointer border border-black/5">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        /* Change #3: Grayscale removed, replaced with subtle zoom only */
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    {/* Change #4: Orange Accent for Location */}
                                    <div className="absolute top-6 left-6 bg-myr-orange text-white text-[8px] px-3 py-1 tracking-[0.3em] uppercase font-bold">
                                        {project.location}
                                    </div>
                                </div>
                            </Link>

                            {/* Info */}
                            <div className="space-y-4">
                                {/* Change #1: Letter spacing class from index.css */}
                                <h3 className="project-title text-xl md:text-2xl leading-tight">
                                    {project.title}
                                </h3>
                                <p className="text-[9px] text-neutral-400 uppercase tracking-[0.4em] font-medium group-hover:text-myr-orange transition-colors">
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

            {/* Scrolling Footer - Updated for White Background */}
            <div className="mt-40 border-t border-black/10 pt-10">
                {["Art Direction", "Curatorial Impact"].map((text) => (
                    <h2 key={text}
                        className="text-7xl md:text-9xl font-bold uppercase tracking-tighter leading-none text-transparent transition-all duration-1000"
                        style={{ WebkitTextStroke: '1px #1a1a1a', opacity: 0.1 }}>
                        {text}
                    </h2>
                ))}
            </div>
        </div>
    )
}

export default Gallery