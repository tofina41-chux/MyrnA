import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Journal({ isAdmin: propIsAdmin }) {
    // 🚀 Dynamic storage verification fallback check
    const isAdmin = propIsAdmin || localStorage.getItem('token') || localStorage.getItem('isAdmin') === 'true';
    const [entries, setEntries] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL || 'https://myrna-ms9b.onrender.com';

    useEffect(() => {
        fetch(`${API_URL}/api/journal`)
            .then(res => res.json())
            .then(data => setEntries(data))
            .catch(err => console.error(err));
    }, [API_URL]);

    const deleteEntry = async (id) => {
        if (!window.confirm("Delete this reflection?")) return;
        
        try {
            const res = await fetch(`${API_URL}/api/journal/${id}`, { method: 'DELETE' });
            if (res.ok) {
                // Defensive filter configuration to cleanly purge item from UI state
                setEntries(entries.filter(e => e.id !== id && e._id !== id));
            } else {
                alert("Failed to delete field note from the server data storage resource.");
            }
        } catch (err) {
            console.error("Error processing journal deletion request:", err);
        }
    };

    // Formats dynamic dates cleanly if they return raw timestamp values from Postgres
    const formatDate = (dateString) => {
        if (!dateString) return '';
        if (dateString.includes('T')) return dateString.split('T')[0];
        return dateString;
    };

    return (
        <div className="bg-white min-h-screen p-6 md:p-24">
            <header className="mb-20">
                <h1 className="text-5xl font-serif italic tracking-tighter mb-4">Field Notes</h1>
                <p className="text-[10px] uppercase tracking-[0.5em] text-black/40">Observations on Art & Direction</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                {entries.map((entry, index) => {
                    const targetId = entry.id || entry._id;
                    return (
                        <article key={targetId || index} className="group relative">
                            <div className="aspect-[4/5] overflow-hidden bg-neutral-100 mb-8">
                                <img 
                                    src={entry.imageUrl || entry.image_url} 
                                    alt={entry.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" 
                                />
                            </div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[9px] uppercase tracking-widest text-myr-orange font-bold">
                                    {formatDate(entry.date || entry.entry_date)}
                                </span>
                                {isAdmin && targetId && (
                                    <div className="flex gap-4">
                                        <Link 
                                            to={`/edit-journal/${targetId}`}
                                            className="text-[9px] text-myr-orange uppercase tracking-widest hover:opacity-70 transition-opacity"
                                        >
                                            [ Edit ]
                                        </Link>
                                        <button 
                                            onClick={() => deleteEntry(targetId)} 
                                            className="text-[9px] text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors"
                                        >
                                            [ Remove ]
                                        </button>
                                    </div>
                                )}
                            </div>
                            <h2 className="text-2xl font-serif italic mb-4">{entry.title}</h2>
                            <p className="text-sm leading-relaxed text-black/70 mb-6 line-clamp-3 whitespace-pre-wrap">{entry.content}</p>
                            {entry.externalLink || entry.external_link ? (
                                <a 
                                    href={entry.externalLink || entry.external_link} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-[9px] uppercase tracking-[0.3em] border-b border-black pb-1 hover:text-myr-orange hover:border-myr-orange transition-all"
                                >
                                    View Context →
                                </a>
                            ) : null}
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default Journal;