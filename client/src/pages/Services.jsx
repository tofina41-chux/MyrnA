import { useState, useEffect } from 'react';

function Services({ isAdmin }) {
    const [content, setContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetch(`${API_URL}/api/content/services`)
            .then(res => res.json())
            .then(data => setContent(data.text));
    }, []);

    const handleSave = async () => {
        await fetch(`${API_URL}/api/content/services`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: content })
        });
        setIsEditing(false);
    };

    return (
        <div className="p-12 md:p-24 bg-white min-h-screen">
            <h1 className="text-4xl font-serif italic mb-12">Services</h1>

            {isAdmin && (
                <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="mb-8 text-[9px] uppercase tracking-widest text-myr-orange border border-myr-orange px-3 py-1 hover:bg-myr-orange hover:text-white transition-all"
                >
                    {isEditing ? '[ Commit Changes ]' : '[ Edit Services ]'}
                </button>
            )}

            {isEditing ? (
                <textarea
                    className="w-full h-96 border border-black/10 p-6 font-light text-lg leading-relaxed outline-none focus:border-myr-orange"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            ) : (
                <div className="max-w-3xl whitespace-pre-wrap text-lg leading-relaxed font-light">
                    {content}
                </div>
            )}
        </div>
    );
}
export default Services;
