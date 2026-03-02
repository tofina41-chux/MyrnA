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
        /* Change #2: Forced White Background */
        <div className="min-h-screen bg-white text-black p-6 md:p-24 pb-40">
            <div className="max-w-7xl mx-auto">
                {/* Change #1: Wide spacing font */}
                <h2 className="project-title text-[10px] mb-20 border-b border-black/10 pb-4">Bespoke Services</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-10 border border-black/5 bg-neutral-50/50 hover:border-myr-orange/30 transition-all duration-500"
                        >
                            {/* Change #4: Orange numbering */}
                            <span className="text-[9px] text-myr-orange font-bold mb-8 block">0{i + 1}</span>

                            {/* Change #1: Applied brand typography */}
                            <h3 className="text-2xl font-tenor uppercase tracking-wider mb-6">{s.title}</h3>

                            <p className="text-[11px] uppercase tracking-widest leading-loose opacity-60 mb-8">
                                {s.desc}
                            </p>

                            <ul className="space-y-3">
                                {s.details.map((d, index) => (
                                    <li key={index} className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] opacity-40">
                                        {/* Small orange bullet */}
                                        <span className="w-1 h-1 bg-myr-orange rounded-full"></span>
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* 50% Impact Reinvestment Banner - Change #4: Orange Accent */}
                <div className="mt-32 p-16 border-2 border-myr-orange text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="text-[10px] uppercase tracking-[0.6em] mb-6 text-myr-orange font-bold">The MYR Commitment</h4>
                        <p className="text-3xl md:text-5xl font-serif italic max-w-4xl mx-auto leading-tight">
                            More than <span className="text-myr-orange font-bold">50%</span> of exhibition proceeds are reinvested in education for underprivileged children in Kenya.
                        </p>
                    </div>
                    {/* Subtle background watermark */}
                    <div className="absolute -bottom-10 -right-10 text-[150px] font-bold text-myr-orange/5 pointer-events-none select-none">
                        50%
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;