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
        window.cloudinary.openUploadWidget(
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
                    setFormData(prev => ({ ...prev, imageUrl: result.info.secure_url }));
                }
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.imageUrl) return alert("Please upload a visual first.");

        try {
            const response = await fetch('http://localhost:5000/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Masterpiece Archived. ✨");
                window.location.href = "/admin"; // Redirect back to admin view
            }
        } catch (err) {
            console.error("Save Error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] p-12 transition-colors duration-700">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-serif mb-8 border-b border-gray-100 dark:border-white/10 pb-4 dark:text-white uppercase italic">Add to Archive</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-8">
                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-bold">Project Visual</label>
                        <div className="border-2 border-dashed border-gray-200 dark:border-white/10 p-4 text-center bg-gray-50/50 dark:bg-white/5">
                            {formData.imageUrl ? (
                                <div className="relative group">
                                    <img src={formData.imageUrl} alt="Preview" className="max-h-64 mx-auto grayscale" />
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, imageUrl: ''})}
                                        className="mt-4 text-[9px] text-red-500 uppercase tracking-widest border border-red-500/20 px-2 py-1"
                                    >
                                        [ Replace Visual ]
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    type="button" 
                                    onClick={handleUpload}
                                    className="py-16 w-full text-[10px] uppercase tracking-[0.4em] text-gray-400 hover:text-black dark:hover:text-white transition-all"
                                >
                                    + Upload Media
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full border-b border-gray-200 dark:border-white/10 bg-transparent py-4 focus:border-black dark:focus:border-white outline-none dark:text-white text-xl font-serif italic"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        
                        <div className="grid grid-cols-2 gap-8 pt-4">
                            <select
                                className="border-b border-gray-200 dark:border-white/10 bg-transparent py-2 outline-none dark:text-white text-[10px] uppercase tracking-widest"
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Curation">Curation</option>
                                <option value="Strategic Art Direction">Strategic Art Direction</option>
                                <option value="Visual Art">Visual Art</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Location (e.g. Mombasa)"
                                className="border-b border-gray-200 dark:border-white/10 bg-transparent py-2 outline-none dark:text-white text-[10px] uppercase tracking-widest"
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>

                        <textarea
                            placeholder="Narrative..."
                            className="w-full border border-gray-100 dark:border-white/10 bg-transparent p-6 h-40 outline-none focus:border-black dark:focus:border-white dark:text-white font-light leading-relaxed"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black py-6 text-[10px] uppercase tracking-[0.5em] font-bold hover:tracking-[0.6em] transition-all">
                        Commit to Archive
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProject;