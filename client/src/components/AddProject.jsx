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
        // Ensure Cloudinary script is present
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
                        sourceBg: "#F4F4F5",
                        windowBorder: "#909090",
                        tabIcon: "#000000",
                        inactiveTabIcon: "#69778A",
                        menuIcons: "#000000",
                        link: "#000000",
                        action: "#000000",
                        inProgress: "#000000",
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
                    console.log("Image Uploaded! URL:", result.info.secure_url);
                    // Update the state so the image appears in the form
                    setFormData(prev => ({ ...prev, imageUrl: result.info.secure_url }));
                }
                if (error) {
                    console.error("Cloudinary Error:", error);
                }
            }
        );

        myWidget.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.imageUrl) return alert("Please upload a visual first.");

        try {
            const response = await fetch('http://localhost:5000/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Masterpiece Archived. ✨");
                window.location.href = "/admin"; 
            }
        } catch (err) {
            console.error("Save Error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] p-12 transition-colors duration-700">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-serif mb-8 border-b border-gray-100 dark:border-white/10 pb-4 dark:text-white uppercase italic tracking-tighter">Add to Archive</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 📸 Visual Upload Area */}
                    <div className="mb-8">
                        <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-4 font-bold">Project Visual</label>
                        <div className="border-2 border-dashed border-neutral-200 dark:border-white/10 p-4 text-center bg-neutral-50/50 dark:bg-white/5 transition-all">
                            {formData.imageUrl ? (
                                <div className="relative group">
                                    <img 
                                        src={formData.imageUrl} 
                                        alt="Preview" 
                                        className="max-h-80 mx-auto grayscale hover:grayscale-0 transition-all duration-700 object-contain" 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, imageUrl: ''})}
                                        className="mt-6 text-[9px] text-red-500 uppercase tracking-widest border border-red-500/20 px-3 py-1.5 hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        [ Remove & Replace ]
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    type="button" 
                                    onClick={handleUpload}
                                    className="py-24 w-full text-[10px] uppercase tracking-[0.4em] text-neutral-400 hover:text-black dark:hover:text-white transition-all group"
                                >
                                    <span className="block text-2xl mb-2 group-hover:scale-110 transition-transform">+</span>
                                    Upload Media
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <input
                            type="text"
                            placeholder="PROJECT TITLE"
                            className="w-full border-b border-neutral-200 dark:border-white/10 bg-transparent py-4 focus:border-black dark:focus:border-white outline-none dark:text-white text-2xl font-serif italic tracking-tighter transition-all"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        
                        <div className="grid grid-cols-2 gap-12">
                            <div className="flex flex-col">
                                <label className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">Category</label>
                                <select
                                    className="border-b border-neutral-200 dark:border-white/10 bg-transparent py-2 outline-none dark:text-white text-[10px] uppercase tracking-widest cursor-pointer"
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Curation">Curation</option>
                                    <option value="Strategic Art Direction">Strategic Art Direction</option>
                                    <option value="Visual Art">Visual Art</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">Location</label>
                                <input
                                    type="text"
                                    placeholder="E.G. MOMBASA"
                                    className="border-b border-neutral-200 dark:border-white/10 bg-transparent py-2 outline-none dark:text-white text-[10px] uppercase tracking-widest"
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[9px] uppercase tracking-widest text-neutral-400 mb-2">Narrative</label>
                            <textarea
                                placeholder="THE STORY BEHIND THE IMPACT..."
                                className="w-full border border-neutral-100 dark:border-white/10 bg-transparent p-6 h-48 outline-none focus:border-black dark:focus:border-white dark:text-white font-light leading-relaxed text-sm"
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-black dark:bg-white text-white dark:text-black py-8 text-[10px] uppercase tracking-[0.6em] font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all mt-12"
                    >
                        Commit to Archive
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProject;