import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
    // Force the Render URL here too
    fetch(`https://myrna-ms9b.onrender.com/api/projects/${id}`)
        .then(res => res.json())
        .then(data => setProject(data))
        .catch(err => console.error(err));
}, [id]);

    if (!project) return <div className="min-h-screen bg-white" />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            /* Change #2: Forced White Background */
            className="min-h-screen bg-white text-black p-6 md:p-20"
        >
            <Link to="/" className="text-[10px] uppercase tracking-[0.5em] mb-20 block hover:text-myr-orange transition-colors">
                ← Back to Archive
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {/* Large Image */}
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="aspect-[3/4] overflow-hidden bg-neutral-100 border border-black/5"
                >
                    {/* Change #3: Grayscale removed */}
                    <img
                        src={project.imageUrl}
                        className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                        alt={project.title}
                    />
                </motion.div>

                {/* Narrative Text */}
                <div className="flex flex-col justify-center max-w-lg">
                    {/* Change #4: Category in Orange hint */}
                    <p className="text-[10px] uppercase tracking-[0.4em] text-myr-orange mb-4 font-bold">
                        {project.category} — {project.location}
                    </p>

                    {/* Change #1: Letter spacing and brand font */}
                    <h1 className="project-title text-5xl md:text-7xl mb-8 leading-tight">
                        {project.title}
                    </h1>

                    <div className="space-y-6 text-lg font-light leading-relaxed opacity-70 border-l-2 border-myr-orange/20 pl-8 italic">
                        {project.description}
                    </div>

                    <div className="mt-12 pt-12 border-t border-black/5">
                        <p className="text-[9px] uppercase tracking-widest font-bold opacity-40">Impact Reinvestment</p>
                        {/* Change #4: Impact percentage in Orange */}
                        <p className="text-6xl font-tenor text-myr-orange">
                            {project.impactReinvestment || 50}%
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProjectDetails;