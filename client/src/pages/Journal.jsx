import { useState, useEffect } from 'react';

function Journal({ isAdmin }) {
    const [entries, setEntries] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL || 'https://myrna-ms9b.onrender.com';

    useEffect(() => {
        fetch(`${API_URL}/api/journal`)
            .then(res => res.json())
            .then(data => setEntries(data))
            .catch(err => console.error(err));
    }, []);

    const deleteEntry = async (id) => {
        if (!window.confirm("Delete this reflection?")) return;
        await fetch(`${API_URL}/api/journal/${id}`, { method: 'DELETE' });
        setEntries(entries.filter(e => e._id !== id));
    };

    return (
        <div className="bg-white min-h-screen p-6 md:p-24">
            <header className="mb-20">
                <h1 className="text-5xl font-serif italic tracking-tighter mb-4">Field Notes</h1>
                <p className="text-[10px] uppercase tracking-[0.5em] text-black/40">Observations on Art & Direction</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                {entries.map(entry => (
                    <article key={entry._id} className="group relative">
                        <div className="aspect-[4/5] overflow-hidden bg-neutral-100 mb-8">
                            <img src={entry.imageUrl || entry.image_url} alt={entry.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[9px] uppercase tracking-widest text-myr-orange font-bold">{entry.date}</span>
                            {isAdmin && (
                                <button onClick={() => deleteEntry(entry._id)} className="text-[9px] text-red-500 uppercase tracking-widest">[ Remove ]</button>
                            )}
                        </div>
                        <h2 className="text-2xl font-serif italic mb-4">{entry.title}</h2>
                        <p className="text-sm leading-relaxed text-black/70 mb-6 line-clamp-3">{entry.content}</p>
                        {entry.externalLink && (
                            <a href={entry.externalLink} target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-[0.3em] border-b border-black pb-1 hover:text-myr-orange hover:border-myr-orange transition-all">
                                View Context →
                            </a>
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Journal;