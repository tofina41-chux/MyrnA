import { motion } from 'framer-motion';

function Journal() {
    const posts = [
        {
            date: "Oct 2025",
            title: "The Architecture of Curation",
            excerpt: "Exploring how spatial awareness defines the narrative of African contemporary art...",
            category: "Theory"
        },
        {
            date: "Sept 2025",
            title: "Impact Report: Mombasa Education Initiative",
            excerpt: "How the proceeds from the 'Sovereignty' exhibition are being utilized this semester...",
            category: "Impact"
        }
    ];

    return (
        /* Change #2: Forced White Background */
        <div className="min-h-screen bg-white text-black p-6 md:p-24 pb-48">
            <div className="max-w-4xl mx-auto">
                {/* Change #1: Letter spacing on header */}
                <h2 className="project-title text-[10px] mb-20 border-b border-black/10 pb-4">
                    Journal & Field Notes
                </h2>

                <div className="space-y-32">
                    {posts.map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="flex justify-between items-end mb-8">
                                <span className="text-[9px] uppercase tracking-widest opacity-40 font-medium">
                                    {post.date}
                                </span>
                                {/* Change #4: Category Tag with Orange border on hover */}
                                <span className="text-[9px] uppercase tracking-widest px-3 py-1 border border-black/10 italic group-hover:border-myr-orange group-hover:text-myr-orange transition-colors">
                                    {post.category}
                                </span>
                            </div>

                            {/* Change #1: Spacing and Typography */}
                            <h3 className="text-4xl md:text-6xl font-serif italic mb-6 leading-tight group-hover:text-myr-orange transition-colors duration-500">
                                {post.title}
                            </h3>

                            <p className="text-lg font-light leading-relaxed opacity-60 max-w-2xl border-l border-black/5 pl-8">
                                {post.excerpt}
                            </p>

                            {/* Change #4: Read Entry with Orange indicator */}
                            <div className="mt-8 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center gap-4 group-hover:gap-8 transition-all duration-500">
                                <span className="text-black">Read Entry</span>
                                <span className="h-[1px] w-8 bg-myr-orange"></span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Journal;