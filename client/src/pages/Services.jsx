import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Services({ isAdmin: propIsAdmin }) {
    // 🚀 Check the prop FIRST. If it's missing, look at your storage for the logout token flag
    const isAdmin = propIsAdmin || localStorage.getItem('token') || localStorage.getItem('isAdmin') === 'true';
    const [services, setServices] = useState([]);
    const [status, setStatus] = useState("Loading...");

    // Hardcoded for stability on mobile
    const API_URL = 'https://myrna-ms9b.onrender.com/api/services';

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setServices(data);
                setStatus("Connected");
            })
            .catch(() => setStatus("Offline"));
    }, []);

    const deleteService = async (id) => {
        if (!window.confirm("Remove this service offering?")) return;
        
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                // Defensive key filtering logic to support both JSON and Postgres IDs
                setServices(services.filter(s => s.id !== id && s._id !== id));
            } else {
                alert("Failed to delete service from the server resource.");
            }
        } catch (err) {
            console.error("Error processing service removal deletion request:", err);
        }
    };

    return (
        <div className="p-12 md:p-24 bg-white min-h-screen">
            <header className="max-w-7xl mx-auto mb-20">
                <h1 className="text-5xl md:text-7xl font-serif italic mb-4">Services</h1>
                <p className="text-[10px] uppercase tracking-[0.5em] text-neutral-400">Collaborative Offerings & Expertise</p>
            </header>

            <div className="max-w-5xl mx-auto space-y-24">
                {services.length > 0 ? (
                    services.map((service, index) => {
                        const targetId = service.id || service._id;
                        return (
                            <motion.div 
                                key={targetId || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-black/5 pb-16"
                            >
                                <div className="md:col-span-1 text-myr-orange font-mono text-xs opacity-50">
                                    0{index + 1}
                                </div>
                                
                                <div className="md:col-span-7">
                                    <h2 className="text-2xl md:text-3xl mb-4 group-hover:italic transition-all">
                                        {service.title}
                                    </h2>
                                    <p className="text-neutral-500 font-light leading-relaxed text-lg whitespace-pre-wrap">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="md:col-span-4 md:text-right space-y-4">
                                    <div className="text-[10px] uppercase tracking-widest font-bold">
                                        {service.type || service.category || 'Consultation'}
                                    </div>
                                    <div className="text-sm font-light italic text-neutral-400">
                                        {service.price || "Price Upon Request"}
                                    </div>
                                    
                                    {isAdmin && targetId && (
                                        <div className="pt-4 space-y-2">
                                            <div className="flex gap-4 md:justify-end">
                                                <Link
                                                    to={`/edit-service/${targetId}`}
                                                    className="text-[9px] uppercase tracking-widest text-myr-orange hover:opacity-70 transition-opacity"
                                                >
                                                    [ Edit ]
                                                </Link>
                                                <button
                                                    onClick={() => deleteService(targetId)}
                                                    className="text-[9px] uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    [ Remove ]
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <div className="text-center py-20 opacity-30 text-[10px] uppercase tracking-[0.5em]">
                        {status === "Connected" ? "No services currently listed." : "Establishing Connection..."}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Services;