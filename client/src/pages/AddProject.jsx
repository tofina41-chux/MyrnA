import { useState } from 'react';

function AddProject() {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Curation',
        description: '',
        imageUrl: '',
        location: 'Kenya',
        impactReinvestment: 50
    });

    const handleUpload = () => {
        if (!window.cloudinary) {
            alert("Cloudinary script not found. Check index.html!");
            return;
        }

        const myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'djmjge5xu',
                uploadPreset: 'myr_unsigned',
                sources: ['local', 'url', 'camera'],
                cropping: true,
                multiple: false,
                styles: {
                    palette: {
                        window: "#FFFFFF",
                        sourceBg: "#FFFFFF",
                        windowBorder: "#FF5F1F", 
                        tabIcon: "#FF5F1F",
                        inactiveTabIcon: "#000000",
                        menuIcons: "#FF5F1F",
                        link: "#FF5F1F",
                        action: "#FF5F1F",
                        inProgress: "#FF5F1F",
                        complete: "#20B832",
                        error: "#c43a31",
                        textDark: "#000000",
                        textLight: "#FFFFFF"
                    },
                    fonts: { default: null, "'Syncopate', sans-serif": "https://fonts.googleapis.com/css2?family=Syncopate" }
                }
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    // FIX #1: Use functional update state so it never drops other inputs
                    setFormData(prev => ({ ...prev, imageUrl: result.info.secure_url }));
                }
            }
        );
        myWidget.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.imageUrl) return alert("Please upload a visual first.");

        try {
            // Send the raw JSON state payload matching your database-free setup
            const response = await fetch('https://myrna-ms9b.onrender.com/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert("Masterpiece Archived. ✨");
                window.location.href = "/";
            } else {
                const errData = await response.json();
                alert(`Server Error: ${errData.error || "Failed to save"}`);
            }
        } catch (err) {
            console.error("Save Error:", err);
            alert("Network error. Make sure your server has finished building on Render!");
        }
    };

    // FIX #2: Clean universal tracking handler for inputs
    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="min-h-screen bg-white p-12 pb-40">
            <div className="max-w-2xl mx-auto">
                <h2 className="project-title text-2xl mb-12 border-b border-black/5 pb-6 text-black italic">
                    Add to Archive
                </h2>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* 📸 Visual Upload Area */}
                    <div className="mb-8">
                        <label className="block text-[10px] uppercase tracking-[0.4em] text-myr-orange mb-4 font-bold">
                            Project Visual
                        </label>
                        <div className="border border-dashed border-black/10 p-2 text-center bg-neutral-50 hover:bg-white hover:border-myr-orange transition-all duration-500">
                            {formData.imageUrl ? (
                                <div className="relative p-4">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Preview"
                                        className="max-h-80 mx-auto object-contain shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleChange('imageUrl', '')}
                                        className="mt-6 text-[9px] text-red-500 uppercase tracking-widest border-b border-red-500/20 hover:border-red-500 transition-all"
                                    >
                                        [ Remove & Replace ]
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    className="py-24 w-full text-[10px] uppercase tracking-[0.5em] text-neutral-400 hover:text-myr-orange transition-all group"
                                >
                                    <span className="block text-3xl mb-4 group-hover:scale-125 transition-transform">+</span>
                                    Initiate Upload
                                </button>
                            )
                        }
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Title Input */}
                        <input
                            type="text"
                            placeholder="PROJECT TITLE"
                            value={formData.title}
                            className="w-full border-b border-black/10 bg-transparent py-4 focus:border-myr-orange outline-none text-black text-2xl font-serif italic tracking-tighter transition-all placeholder:opacity-20"
                            onChange={(e) => handleChange('title', e.target.value)}
                            required
                        />

                        <div className="grid grid-cols-2 gap-12">
                            <div className="flex flex-col">
                                <label className="text-[9px] uppercase tracking-widest text-myr-orange mb-2 font-bold">Category</label>
                                <select
                                    value={formData.category}
                                    className="border-b border-black/10 bg-transparent py-2 outline-none text-black text-[10px] uppercase tracking-widest cursor-pointer focus:border-myr-orange transition-colors"
                                    onChange={(e) => handleChange('category', e.target.value)}
                                >
                                    <option value="Curation">Curation</option>
                                    <option value="Strategic Art Direction">Strategic Art Direction</option>
                                    <option value="Visual Art">Visual Art</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[9px] uppercase tracking-widest text-myr-orange mb-2 font-bold">Location</label>
                                <input
                                    type="text"
                                    placeholder="E.G. MOMBASA"
                                    value={formData.location}
                                    className="border-b border-black/10 bg-transparent py-2 outline-none text-black text-[10px] uppercase tracking-widest focus:border-myr-orange transition-colors placeholder:opacity-30"
                                    onChange={(e) => handleChange('location', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[9px] uppercase tracking-widest text-myr-orange mb-4 font-bold">Narrative</label>
                            <textarea
                                placeholder="THE STORY BEHIND THE IMPACT..."
                                value={formData.description}
                                className="w-full border border-black/5 bg-neutral-50/30 p-8 h-48 outline-none focus:border-myr-orange text-black font-light leading-relaxed text-sm placeholder:opacity-30"
                                onChange={(e) => handleChange('description', e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-myr-orange text-white py-8 text-[11px] uppercase tracking-[0.6em] font-bold hover:bg-black transition-all duration-500 mt-12 shadow-lg shadow-myr-orange/10"
                    >
                        Commit to Archive
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProject;