import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (token && user.role) {
            navigate(user.role === 'ADMIN' ? '/admin-dashboard' : '/member-dashboard');
        }
    }, [navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log('Signing up with:', { name, email, role: 'MEMBER' });
        try {
            const response = await API.post('/auth/signup', { name, email, password, role: 'MEMBER' });
            console.log('Signup response:', response.data);
            alert("Signup successful! Please login.");
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error.response?.data);
            alert(error.response?.data?.message || "Signup failed!");
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-6 antialiased text-[#1A1A1A]">
            <div className="w-full max-w-275 flex gap-12 bg-transparent">
                
                {/* Left Side: Branding and Hero Text */}
                <div className="w-1/2 flex flex-col justify-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-3xl font-extrabold pb-0.5">L</div>
                        <span className="text-xl font-semibold">Lumina</span>
                    </div>

                    <h1 className="text-[52px] leading-[1.2] font-semibold text-[#1A1A1A]">
                        Orchestrate your vision with precision.
                    </h1>

                    <p className="text-lg text-gray-500 max-w-112.5">
                        The premium workspace designed for teams that value clarity and high-performance collaboration.
                    </p>

                    <div className="flex flex-col gap-3 mt-6">
                        <div className="flex -space-x-3">
                            <img src="https://i.pravatar.cc/150?u=1" alt="user" className="w-11 h-11 rounded-full border-4 border-[#F0F2F5]" />
                            <img src="https://i.pravatar.cc/150?u=2" alt="user" className="w-11 h-11 rounded-full border-4 border-[#F0F2F5]" />
                            <img src="https://i.pravatar.cc/150?u=3" alt="user" className="w-11 h-11 rounded-full border-4 border-[#F0F2F5]" />
                        </div>
                        <span className="text-[#1A1A1A] font-medium text-lg">Joined by 10,000+ industry leaders</span>
                    </div>
                </div>

                {/* Right Side: Signup Form Card */}
                <div className="w-1/2 flex items-center justify-center">
                    <div className="w-full max-w-115 bg-white p-12 rounded-[30px] shadow-[0_10px_60px_rgb(0,0,0,0.05)] border border-gray-100">
                        <h2 className="text-[34px] font-semibold mb-2">Create an Account</h2>
                        <p className="text-lg text-gray-500 mb-10">Start your free 30-day trial.</p>

                        <form onSubmit={handleSignup} className="flex flex-col gap-6">
                            
                            <div className="flex flex-col gap-2.5">
                                <label className="text-sm font-medium text-[#1A1A1A] uppercase tracking-wide">Full Name</label>
                                <input 
                                    type="text" placeholder="Your full name" required
                                    className="w-full px-5 py-4 border border-[#E0E5EA] rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-[#FAFBFD]"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label className="text-sm font-medium text-[#1A1A1A] uppercase tracking-wide">Email Address</label>
                                <input 
                                    type="email" placeholder="name@company.com" required
                                    className="w-full px-5 py-4 border border-[#E0E5EA] rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-[#FAFBFD]"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label className="text-sm font-medium text-[#1A1A1A] uppercase tracking-wide">Password</label>
                                <input 
                                    type="password" placeholder="••••••••" required
                                    className="w-full px-5 py-4 border border-[#E0E5EA] rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-[#FAFBFD]"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button className="w-full bg-blue-600 text-white text-base font-semibold py-4 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition duration-200 mt-2">
                                Create for free
                            </button>
                        </form>

                        <p className="text-center text-lg text-gray-500 mt-8">
                            Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:underline">Sign In</Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Signup;