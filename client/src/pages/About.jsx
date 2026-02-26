import { motion } from 'framer-motion';

function About() {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white p-6 md:p-24"
        >
            <div className="max-w-5xl mx-auto">
                <h1 className="text-[12vw] font-serif italic leading-none tracking-tighter uppercase mb-20">
                    Impact <br/> Over <br/> Ego.
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                    <div className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                        {/* Tell Myrna to upload a high-end black and white portrait here */}
                        <img src="/myrna-portrait.jpg" alt="MYR" className="w-full h-full object-cover grayscale" />
                    </div>

                    <div className="space-y-12">
                        <p className="text-2xl font-light leading-relaxed font-serif italic">
                            "MYR is a curatorial vessel designed to bridge the gap between aesthetic excellence and social reinvestment."
                        </p>
                        
                        <div className="text-[11px] uppercase tracking-[0.3em] space-y-8 opacity-70 leading-loose">
                            <p>
                                Based in Kenya, Myrna works at the intersection of Art Direction and Strategic Curation. 
                                Every project archived here represents a commitment to visual storytelling that 
                                funds local creative ecosystems.
                            </p>
                            <p>
                                Through a model of 50% impact reinvestment, the work goes beyond the canvas—
                                it enters the infrastructure of the community.
                            </p>
                        </div>

                        <div className="pt-12 border-t border-black/10 dark:border-white/10">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4">Core Principles</h4>
                            <ul className="text-[10px] uppercase tracking-widest space-y-2">
                                <li>01. Radical Transparency</li>
                                <li>02. Aesthetic Sovereignty</li>
                                <li>03. Community Reinvestment</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default About;