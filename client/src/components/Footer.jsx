import { motion } from 'framer-motion';

function Footer() {
    return (
        <footer className="fixed bottom-0 w-full z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-t border-black/5 dark:border-white/5 py-4 transition-colors duration-700">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">

                {/* 🌍 Location & Status */}
                <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-medium opacity-60 dark:text-white">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Based in Kenya — 12:00 PM EAT
                </div>

                {/* 🎡 Infinite Marquee (Impact Message) */}
                <div className="flex-1 overflow-hidden mx-8 hidden lg:block">
                    <motion.div
                        animate={{ x: [0, -400] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="whitespace-nowrap text-[9px] uppercase tracking-[0.5em] font-bold dark:text-white opacity-40"
                    >
                        50% Proceeds Reinvested into Education — Curation with Purpose — Strategic Art Direction — 50% Proceeds Reinvested into Education —
                    </motion.div>
                </div>

                {/* 📧 Quick Contact */}
                <div className="text-[9px] uppercase tracking-[0.3em] font-bold dark:text-white">
                    <a href="mailto:hello@myr-art.com" className="hover:italic transition-all">
                        Inquiries: hello@myr-art.com
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;