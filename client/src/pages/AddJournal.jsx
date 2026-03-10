import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddJournal() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0], // Defaults to today
        content: '',
        imageUrl: '',
        externalLink: '' // For IG/FB bridge
    });

    const handleUpload = () => {
        const myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'djmjge5xu',
                uploadPreset: 'myr_unsigned',
                sources: ['local', 'url', 'camera'],
                styles: {
                    palette: { window: "#FFFFFF", sourceBg: "#FFFFFF", windowBorder: "#FF5F1F", tabIcon: "#FF5F1F", inactiveTabIcon: "#000000", menuIcons: "#FF5F1F", link: "#FF5F1F", action: "#FF5F1F", inProgress: "#FF5F1F", complete: "#20B832", textDark: "#000000", textLight: "#FFFFFF" }
                }
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    setFormData(prev => ({ ...prev, imageUrl: result.info.secure_url }));
                }
            }
        );
        myWidget.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.imageUrl) return alert("Every entry needs a visual anchor.");

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/journal`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Field Note Archived. ✨");
                navigate('/journal');
            }
        } catch (err) {
            console.error("Journal Error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-white p-6 md:p-12 pb-40">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl mb-12 border-b border-black/5 pb-6 text-black italic font-serif">
                    New Field Note — Journal Entry
                </h2>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Visual Upload */}
                    <div
                        onClick={handleUpload}
                        className="cursor-pointer border border-dashed border-black/10 aspect-video flex flex-col items-center justify-center bg-neutral-50 hover:bg-white hover:border-myr-orange transition-all overflow-hidden"
                    >
                        {formData.imageUrl ? (
                            <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Journal Visual" />
                        ) : (
                            <div className="text-center">
                                <span className="text-3xl block mb-2 text-neutral-300">+</span>
                                <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400">Upload Header Visual</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Title */}
                        <div className="flex flex-col">
                            <label className="text-[9px] uppercase tracking-widest text-myr-orange mb-2 font-bold">Entry Title</label>
                            <input
                                type="text"
                                className="border-b border-black/10 py-2 outline-none focus:border-myr-orange text-xl font-serif italic"
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        {/* Date */}
                        <div className="flex flex-col">
                            <label className="text-[9px] uppercase tracking-widest text-myr-orange mb-2 font-bold">Date of Reflection</label>
                            <input
                                type="date"
                                value={formData.date}
                                className="border-b border-black/10 py-2 outline-none focus:border-myr-orange uppercase text-[10px]"
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                        <label className="text-[9px] uppercase tracking-widest text-myr-orange mb-2 font-bold">Narrative</label>
                        <textarea
                            className="w-full border border-black/5 bg-neutral-50/30 p-8 h-64 outline-none focus:border-myr-orange text-sm leading-relaxed"
                            placeholder="Pen your thoughts on the creative process..."
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    {/* Social Link */}
                    <div className="flex flex-col">
                        <label className="text-[9px] uppercase tracking-widest text-myr-orange mb-2 font-bold">Instagram/External Link (Optional)</label>
                        <input
                            type="url"
                            placeholder="https://www.instagram.com/p/..."
                            className="border-b border-black/10 py-2 outline-none focus:border-myr-orange text-[10px]"
                            onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-6 text-[11px] uppercase tracking-[0.6em] font-bold hover:bg-myr-orange transition-all duration-500"
                    >
                        Publish to Journal
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddJournal;
