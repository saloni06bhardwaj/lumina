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

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 uppercase tracking-wide">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Apple</span>
                            </button>
                        </div>

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