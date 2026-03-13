import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Services({ isAdmin }) {
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
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        setServices(services.filter(s => s._id !== id));
    };

    return (
        <div className="p-12 md:p-24 bg-white min-h-screen">
            <header className="max-w-7xl mx-auto mb-20">
                <h1 className="text-5xl md:text-7xl font-serif italic mb-4">Services</h1>
                <p className="text-[10px] uppercase tracking-[0.5em] text-neutral-400">Collaborative Offerings & Expertise</p>
            </header>

            <div className="max-w-5xl mx-auto space-y-24">
                {services.length > 0 ? (
                    services.map((service, index) => (
                        <motion.div 
                            key={service._id}
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
                                    {service.category}
                                </div>
                                <div className="text-sm font-light italic text-neutral-400">
                                    {service.price || "Price Upon Request"}
                                </div>
                                
                                {isAdmin && (
                                    <button
                                        onClick={() => deleteService(service._id)}
                                        className="text-[9px] uppercase tracking-widest text-red-500 block md:ml-auto pt-4"
                                    >
                                        [ Remove Service ]
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))
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
