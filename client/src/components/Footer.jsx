import { motion } from 'framer-motion';

function Footer() {
    return (
        /* Change #2: Forced White Glassmorphism */
        <footer className="fixed bottom-0 w-full z-50 bg-white/90 backdrop-blur-md border-t border-black/5 py-4">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-black">

                {/* 🌍 Location & Status - Change #4: Updated to MYR Orange */}
                <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-medium opacity-60">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-myr-orange animate-pulse"></span>
                    Based in Kenya — 12:00 PM EAT
                </div>

                {/* 🎡 Infinite Marquee (Impact Message) - Change #1: Letter Spacing */}
                <div className="flex-1 overflow-hidden mx-8 hidden lg:block">
                    <motion.div
                        animate={{ x: [0, -400] }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        className="whitespace-nowrap text-[9px] uppercase tracking-[0.5em] font-bold opacity-30"
                    >
                        50% Proceeds Reinvested into Education — Curation with Purpose — Strategic Art Direction — 50% Proceeds Reinvested into Education —
                    </motion.div>
                </div>

                {/* 📧 Quick Contact - Change #4: Hover Orange */}
                <div className="text-[9px] uppercase tracking-[0.3em] font-bold">
                    <a href="mailto:hello@myr-art.com" className="hover:text-myr-orange hover:italic transition-all duration-500">
                        Inquiries: hello@myr-art.com
                    </a>
                </div>
                <div className="flex gap-6 mt-8">
                    <a href="#" className="text-[9px] uppercase tracking-widest hover:text-myr-orange transition-all italic">Instagram ↗</a>
                    <a href="#" className="text-[9px] uppercase tracking-widest hover:text-myr-orange transition-all italic">LinkedIn ↗</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;