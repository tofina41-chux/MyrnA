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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Project added to MYR Gallery! ✨");
                window.location.href = "/"; // Go back to gallery
            }
        } catch (err) {
            console.error("Error saving project:", err);
        }
    };

    return (
        <div className="min-h-screen bg-white p-12">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-serif mb-8 border-b pb-4">New Project Entry</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Project Title</label>
                        <input
                            type="text"
                            className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Category</label>
                            <select
                                className="w-full border-b border-gray-200 py-2 bg-transparent outline-none"
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Curation">Curation</option>
                                <option value="Strategic Art Direction">Strategic Art Direction</option>
                                <option value="Visual Art">Visual Art</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Location</label>
                            <input
                                type="text"
                                className="w-full border-b border-gray-200 py-2 focus:border-black outline-none"
                                placeholder="e.g. Mombasa, Kenya"
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Image URL</label>
                        <input
                            type="text"
                            className="w-full border-b border-gray-200 py-2 focus:border-black outline-none"
                            placeholder="https://..."
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Narrative / Description</label>
                        <textarea
                            className="w-full border border-gray-100 p-4 h-32 outline-none focus:border-black"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors">
                        Publish to Portfolio
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProject;