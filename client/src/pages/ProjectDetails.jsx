import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/projects`) // In a real app, you'd have a /api/projects/:id route
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p._id === id);
                setProject(found);
            });
    }, [id]);

    if (!project) return <div className="min-h-screen bg-white dark:bg-black" />;

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#F9F9F9] dark:bg-[#0a0a0a] text-black dark:text-white p-6 md:p-20"
        >
            <Link to="/" className="text-[10px] uppercase tracking-[0.5em] mb-20 block hover:italic">
                ← Back to Archive
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {/* Large Image */}
                <motion.div 
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-900"
                >
                    <img src={project.imageUrl} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                </motion.div>

                {/* Narrative Text */}
                <div className="flex flex-col justify-center max-w-lg">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 mb-4">
                        {project.category} — {project.location}
                    </p>
                    <h1 className="text-6xl md:text-8xl font-serif italic mb-8 tracking-tighter uppercase leading-none">
                        {project.title}
                    </h1>
                    <div className="space-y-6 text-lg font-light leading-relaxed opacity-80">
                        {project.description}
                    </div>
                    
                    <div className="mt-12 pt-12 border-t border-black/10 dark:border-white/10">
                        <p className="text-[9px] uppercase tracking-widest font-bold">Impact Reinvestment</p>
                        <p className="text-4xl font-serif italic">%{project.impactReinvestment || 50}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProjectDetails;