import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token); 
            localStorage.setItem('user', JSON.stringify(data.user)); 
            
            if (data.user.role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else {
                navigate('/member-dashboard');
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Section - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-white p-12 flex-col justify-center">
                <div className="max-w-lg">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-semibold text-gray-900">Lumina</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Orchestrate your vision with precision.
                    </h1>

                    {/* Subtext */}
                    <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                        The premium workspace designed for teams that value clarity and high-performance collaboration.
                    </p>

                    {/* Avatars */}
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            <img src="https://i.pravatar.cc/150?u=1" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                            <img src="https://i.pravatar.cc/150?u=2" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                            <img src="https://i.pravatar.cc/150?u=3" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">
                            Joined by 10,000+ industry leaders
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="flex lg:hidden items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-semibold text-gray-900">Lumina</span>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-600">Please enter your details to sign in.</p>
                        </div>

                        {/* Admin Credentials Info Box */}
                        <div className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Admin Demo Credentials</h3>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-gray-600">Email:</span>
                                            <code className="text-xs font-mono bg-white px-2 py-1 rounded border border-blue-200 text-blue-700">salonibhardwaj@gmail.com</code>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-gray-600">Password:</span>
                                            <code className="text-xs font-mono bg-white px-2 py-1 rounded border border-blue-200 text-blue-700">admin123</code>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 italic">For demo purposes only</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                        Forgot?
                                    </Link>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    required
                                />
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                    Remember for 30 days
                                </label>
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Footer */}
                        <p className="text-center text-sm text-gray-600 mt-6">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">
                                Create for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;