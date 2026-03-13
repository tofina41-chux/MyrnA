import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddService() {
  const [formData, setFormData] = useState({ title: '', description: '', price: '', category: 'Consultation' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://myrna-ms9b.onrender.com/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Service Added Successfully!");
        navigate('/services'); // Redirect to your services list
      }
    } catch (err) {
      alert("Error adding service.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-12 text-black max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold uppercase tracking-widest mb-12">New Service Offering</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <input 
          className="w-full border-b border-black/10 py-4 outline-none focus:border-myr-orange transition-colors"
          placeholder="Service Title (e.g., Creative Consulting)"
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <textarea 
          className="w-full border border-black/10 p-4 outline-none focus:border-myr-orange transition-colors h-32"
          placeholder="Description of the service..."
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input 
            className="w-full border-b border-black/10 py-4 outline-none focus:border-myr-orange"
            placeholder="Price/Rate"
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
          <select 
            className="w-full border-b border-black/10 py-4 outline-none"
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="Consultation">Consultation</option>
            <option value="Art Direction">Art Direction</option>
            <option value="Curation">Curation</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-black text-white py-6 uppercase tracking-[0.4em] text-[10px] hover:bg-myr-orange transition-colors">
          Publish Service
        </button>
      </form>
    </div>
  );
}

export default AddService;