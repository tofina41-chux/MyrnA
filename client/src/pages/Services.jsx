import { motion } from 'framer-motion';

function Services() {
    const services = [
        {
            title: "Art Direction & Consultancy",
            desc: "Strategic concept development and ESG-aligned creative strategies for corporates, hospitality groups, and real estate developers.",
            details: ["Placemaking", "Cultural Programming", "Brand Asset Advisory"]
        },
        {
            title: "Curation & Exhibitions",
            desc: "Translating artistic vision into coherent spatial experiences with attention to narrative, materiality, and audience engagement.",
            details: ["Private Exhibitions", "Public Installations", "Narrative Curation"]
        },
        {
            title: "Talent Development",
            desc: "Scouting and creative mentorship in informal settlements, fostering independent thinking and sustainable income streams.",
            details: ["Mentorship", "Skill Building", "Agency Empowerment"]
        }
    ];

    return (
        <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0a0a0a] text-black dark:text-white p-6 md:p-24">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-[10px] uppercase tracking-[0.5em] mb-20 border-b border-black/10 dark:border-white/10 pb-4">Bespoke Services</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {services.map((s, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-10 border border-black/5 dark:border-white/5 bg-white dark:bg-black/20"
                        >
                            <span className="text-[9px] opacity-30 mb-8 block">0{i+1}</span>
                            <h3 className="text-2xl font-serif italic mb-6">{s.title}</h3>
                            <p className="text-[11px] uppercase tracking-widest leading-loose opacity-60 mb-8">
                                {s.desc}
                            </p>
                            <ul className="space-y-2">
                                {s.details.map((d, index) => (
                                    <li key={index} className="text-[9px] uppercase tracking-[0.3em] opacity-40">• {d}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* 50% Impact Reinvestment Banner */}
                <div className="mt-32 p-16 bg-black dark:bg-white text-white dark:text-black text-center">
                    <h4 className="text-[10px] uppercase tracking-[0.6em] mb-4">The MYR Commitment</h4>
                    <p className="text-3xl font-serif italic">More than 50% of exhibition proceeds are reinvested in education for underprivileged children in Kenya.</p>
                </div>
            </div>
        </div>
    );
}

export default Services;