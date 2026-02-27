import { motion } from 'framer-motion';

function About() {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white p-6 md:p-24 pb-40"
        >
            <div className="max-w-6xl mx-auto">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-24"
                >
                    <p className="text-[10px] uppercase tracking-[0.5em] mb-4 opacity-50">The Visionary</p>
                    <h1 className="text-[8vw] font-serif italic leading-none tracking-tighter uppercase">
                        Myrna van der Veen
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                    {/* Image Container */}
                    <div className="aspect-[3/4] bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative">
                        <img 
                            src="https://res.cloudinary.com/djmjge5xu/image/upload/v1772148411/udaagcdwqekamcae3er3.jpg" 
                            alt="Myrna van der Veen" 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                        />
                    </div>

                    {/* Bio Text */}
                    <div className="space-y-12">
                        <p className="text-2xl md:text-3xl font-light leading-snug font-serif italic border-b border-black/5 pb-12 dark:border-white/5">
                            "Shaped by experiences in Indonesia, the Netherlands, and Kenya, my work bridges cultural contexts while maintaining a strong sense of authorship, integrity, and depth."
                        </p>
                        
                        <div className="text-[11px] uppercase tracking-[0.3em] space-y-8 opacity-70 leading-loose text-justify">
                            <p>
                                Alongside my own artistic practice, I founded MYR Art Direction© to develop and curate art-led projects with long-term value. My role moves fluidly between concept creation, curatorial direction, and strategic advising.
                            </p>
                            <p>
                                I am particularly committed to working with talent in informal settlements, where creativity becomes a foundation for independent thinking rather than dependency. This is not charity—it is a philosophy of agency, dignity, and opportunity.
                            </p>
                        </div>

                        <div className="pt-8">
                             <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6">Strategic Positioning</h4>
                             <p className="text-[10px] uppercase tracking-[0.2em] leading-relaxed opacity-50 italic">
                                All curatorial concepts developed under MYR Art Direction© are created and owned by MYR Art Direction©. Creative authorship remains at the core of every engagement.
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default About;