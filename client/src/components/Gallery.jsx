import { useEffect, useState } from 'react'

function Gallery() { // 1. Renamed to Gallery
    const [projects, setProjects] = useState([])
    const [status, setStatus] = useState("Connecting...")

    useEffect(() => {
        fetch('http://localhost:5000/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data)
                setStatus("Connected")
            })
            .catch(() => setStatus("Offline ❌"))
    }, [])

    return (
        <div className="bg-[#FDFDFD] text-[#1A1A1A] p-8 font-sans">
            {/* Note: Header removed because it's now in App.jsx nav */}

            <main className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {projects.map((project) => (
                        <div key={project._id} className="group cursor-pointer">
                            <div className="aspect-[4/5] bg-gray-100 overflow-hidden mb-4 relative">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                                    {project.location}
                                </div>
                            </div>

                            <h3 className="text-xl font-serif mb-1">{project.title}</h3>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">{project.category}</p>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">{project.description}</p>

                            <div className="inline-block border border-black px-4 py-2 text-[11px] uppercase tracking-tighter hover:bg-black hover:text-white transition-colors">
                                Reinvesting {project.impactReinvestment}% to Education
                            </div>
                        </div>
                    ))}
                </div>

                {projects.length === 0 && (
                    <p className="text-center text-gray-400 italic mt-10">No projects found in the gallery.</p>
                )}
            </main>

            <footer className="mt-20 text-center opacity-30">
                <span className="text-[10px] tracking-widest uppercase">System Status: {status}</span>
            </footer>
        </div>
    )
}

export default Gallery // 2. Export Gallery