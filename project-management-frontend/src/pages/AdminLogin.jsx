import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (token && user.role === 'ADMIN') {
            navigate('/admin-dashboard');
        }
    }, [navigate]);

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', { email, password });
            
        
            if (data.user.role !== 'ADMIN') {
                alert("Access Denied: Admins Only");
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/admin-dashboard');
        } catch (error) {
            alert("Invalid Admin Credentials");
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 antialiased">
            <div className="w-full max-w-112.5 bg-white/5 backdrop-blur-xl p-10 rounded-4xl border border-white/10 shadow-2xl">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/30">
                        <ShieldCheck size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
                    <p className="text-gray-400 mt-2 text-center">Secure management access for Lumina</p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Admin Email</label>
                        <input 
                            type="email" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="admin@lumina.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Master Password</label>
                        <input 
                            type="password" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg shadow-blue-600/20 active:scale-95 mt-4">
                        Authorize Access
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-8 italic">
                    Authorized Personnel Only. All login attempts are logged.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;