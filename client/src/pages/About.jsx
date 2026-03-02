import { motion } from 'framer-motion';

function About() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            /* Change #2: Forced White Background */
            className="min-h-screen bg-white text-black p-6 md:p-24 pb-40"
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-24"
                >
                    {/* Change #4: Highlight label in Orange */}
                    <p className="text-[10px] uppercase tracking-[0.5em] mb-4 text-myr-orange font-bold">The Visionary</p>

                    {/* Change #1: Applied project-title for letter spacing and font */}
                    <h1 className="project-title text-[7vw] leading-none text-black">
                        Myrna van der Veen
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                    {/* Image Container */}
                    <div className="aspect-[3/4] bg-neutral-100 overflow-hidden relative border border-black/5">
                        <img
                            src="https://res.cloudinary.com/djmjge5xu/image/upload/v1772148411/udaagcdwqekamcae3er3.jpg"
                            alt="Myrna van der Veen"
                            /* Change #3: Grayscale removed - full color portrait */
                            className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110"
                        />
                    </div>

                    {/* Bio Text */}
                    <div className="space-y-12">
                        {/* Change #4: Subtle orange accent on the quote border */}
                        <p className="text-2xl md:text-3xl font-light leading-snug font-serif italic border-b-2 border-myr-orange/20 pb-12">
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

                        <div className="pt-8 border-t border-black/5">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6 text-myr-orange">Strategic Positioning</h4>
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