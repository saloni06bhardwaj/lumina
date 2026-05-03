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

                {/* Admin Credentials Info Box */}
                <div className="mb-8 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-bold text-white mb-3">Admin Demo Credentials</h3>
                            <div className="space-y-2.5">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-400 min-w-[80px]">Email:</span>
                                    <code className="text-sm font-mono bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-blue-300 backdrop-blur-sm">salonibhardwaj@gmail.com</code>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-400 min-w-[80px]">Password:</span>
                                    <code className="text-sm font-mono bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-blue-300 backdrop-blur-sm">admin123</code>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-3 italic flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                For demo purposes only
                            </p>
                        </div>
                    </div>
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