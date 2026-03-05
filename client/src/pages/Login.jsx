// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // For now, a simple password lock. In production, use JWT/Auth.
        if (password === 'MYR2026') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/admin');
        } else {
            alert('Unauthorized access.');
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <form onSubmit={handleLogin} className="w-full max-w-sm text-center">
                <h2 className="project-title text-xl mb-8 italic">Studio Access</h2>
                <input
                    type="password"
                    placeholder="ENTER PASSCODE"
                    className="w-full border-b border-black/10 py-4 text-center outline-none focus:border-myr-orange text-[10px] tracking-[0.5em]"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="mt-12 w-full bg-black text-white py-4 text-[9px] uppercase tracking-[0.4em] hover:bg-myr-orange transition-all">
                    Authorize
                </button>
            </form>
        </div>
    );
}
export default Login;