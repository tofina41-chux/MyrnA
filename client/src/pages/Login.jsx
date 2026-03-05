import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAdmin }) {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Passcode: MYR2026
        if (password === 'MYR2026') {
            localStorage.setItem('isAuthenticated', 'true');
            setIsAdmin(true); // Update global state
            navigate('/admin');
        } else {
            alert('Unauthorized access.');
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 pb-40">
            <form onSubmit={handleLogin} className="w-full max-w-sm text-center">
                <span className="text-myr-orange text-[10px] tracking-[0.6em] uppercase font-bold mb-4 block">Security Check</span>
                <h2 className="project-title text-3xl mb-12 italic">Studio Access</h2>

                <input
                    type="password"
                    placeholder="ENTER PASSCODE"
                    className="w-full border-b border-black/10 py-6 text-center outline-none focus:border-myr-orange text-[10px] tracking-[0.5em] transition-all"
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                />

                <button className="mt-16 w-full bg-black text-white py-6 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-myr-orange transition-all duration-500 shadow-xl shadow-black/5">
                    Authorize Entry
                </button>

                <p className="mt-8 text-[8px] uppercase tracking-widest opacity-30">
                    Private Archive Access Only
                </p>
            </form>
        </div>
    );
}

export default Login;