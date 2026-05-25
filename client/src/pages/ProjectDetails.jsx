import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API_BASE_URL from '../api.js';

function ProjectDetails({ isAdmin: propIsAdmin }) {
    // 🚀 Dynamic storage verification fallback check
    const isAdmin = propIsAdmin || localStorage.getItem('token') || localStorage.getItem('isAdmin') === 'true';
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [status, setStatus] = useState('Loading project...');

    useEffect(() => {
        setStatus('Loading project...');
        fetch(`${API_BASE_URL}/api/projects/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Project not found');
                return res.json();
            })
            .then(data => {
                setProject(data);
                setStatus('');
            })
            .catch(err => {
                console.error(err);
                setStatus('Unable to load project. Try again later.');
            });
    }, [id]);

    const deleteProject = async () => {
        if (!window.confirm("Delete this project?")) return;
        
        try {
            const res = await fetch(`${API_BASE_URL}/api/projects/${id}`, { method: 'DELETE' });
            if (res.ok) {
                alert("Project deleted successfully.");
                window.location.href = '/';
            } else {
                alert("Failed to delete project from the server.");
            }
        } catch (err) {
            console.error("Error deleting project:", err);
            alert("Error deleting project.");
        }
    };

    if (!project) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center text-sm text-neutral-500">
                {status}
            </div>
        );
    }

    const imageSource = project.imageUrl || project.image_url;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-white text-black p-6 md:p-20"
        >
            <div className="flex justify-between items-center mb-20">
                <Link to="/" className="text-[10px] uppercase tracking-[0.5em] hover:text-myr-orange transition-colors">
                    ← Back to Archive
                </Link>
                {isAdmin && (
                    <div className="flex gap-4">
                        <Link
                            to={`/edit-project/${id}`}
                            className="text-[10px] uppercase tracking-[0.5em] text-myr-orange hover:opacity-70 transition-opacity"
                        >
                            [ Edit ]
                        </Link>
                        <button
                            onClick={deleteProject}
                            className="text-[10px] uppercase tracking-[0.5em] text-red-500 hover:text-red-700 transition-colors"
                        >
                            [ Delete ]
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {/* Large Image */}
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="aspect-[4/3] md:aspect-[5/3] overflow-hidden bg-neutral-100 border border-black/5 shadow-lg"
                >
                    <img
                        src={imageSource}
                        className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                        alt={project.title}
                    />
                </motion.div>

                {/* Narrative Text */}
                <div className="flex flex-col justify-center max-w-lg">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-myr-orange mb-3 font-bold">
                        Impact Story
                    </p>
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