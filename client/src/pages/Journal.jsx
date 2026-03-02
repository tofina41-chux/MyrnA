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
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white p-6 md:p-24">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-[10px] uppercase tracking-[0.5em] mb-20 border-b border-black/10 dark:border-white/10 pb-4">Journal & Field Notes</h2>

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
                                <span className="text-[9px] uppercase tracking-widest opacity-40">{post.date}</span>
                                <span className="text-[9px] uppercase tracking-widest px-3 py-1 border border-black/10 dark:border-white/10 italic">{post.category}</span>
                            </div>
                            <h3 className="text-4xl md:text-6xl font-serif italic mb-6 group-hover:tracking-tight transition-all duration-700">
                                {post.title}
                            </h3>
                            <p className="text-lg font-light leading-relaxed opacity-60 max-w-2xl">
                                {post.excerpt}
                            </p>
                            <div className="mt-8 text-[10px] uppercase tracking-[0.4em] font-bold group-hover:ml-4 transition-all">
                                Read Entry +
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Journal;