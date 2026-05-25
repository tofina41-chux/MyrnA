import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddService() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', description: '', price: '', category: 'Consultation' });
  const [isLoading, setIsLoading] = useState(!!id);

  const API_URL = 'https://myrna-ms9b.onrender.com/api/services';

  useEffect(() => {
    if (id) {
      // Load existing service for editing
      fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            title: data.title || '',
            description: data.description || '',
            price: data.price || '',
            category: data.category || data.type || 'Consultation'
          });
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Error loading service:", err);
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `${API_URL}/${id}` : API_URL;
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert(id ? "Service Updated Successfully!" : "Service Added Successfully!");
        navigate('/services');
      } else {
        alert("Error saving service.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error saving service.");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-white p-12 text-black flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white p-12 text-black max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold uppercase tracking-widest mb-12">{id ? 'Edit Service' : 'New Service Offering'}</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <input 
          className="w-full border-b border-black/10 py-4 outline-none focus:border-myr-orange transition-colors"
          placeholder="Service Title (e.g., Creative Consulting)"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <textarea 
          className="w-full border border-black/10 p-4 outline-none focus:border-myr-orange transition-colors h-32"
          placeholder="Description of the service..."
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input 
            className="w-full border-b border-black/10 py-4 outline-none focus:border-myr-orange"
            placeholder="Price/Rate"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
          <select 
            className="w-full border-b border-black/10 py-4 outline-none"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="Consultation">Consultation</option>
            <option value="Art Direction">Art Direction</option>
            <option value="Curation">Curation</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-black text-white py-6 uppercase tracking-[0.4em] text-[10px] hover:bg-myr-orange transition-colors">
          {id ? 'Update Service' : 'Publish Service'}
        </button>
      </form>
    </div>
  );
}

export default AddService;