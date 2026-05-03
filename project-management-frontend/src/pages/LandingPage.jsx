import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowRight, 
    CheckCircle2, 
    Users, 
    Briefcase, 
    Zap,
    Shield,
    BarChart3,
    Clock,
    Star
} from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 antialiased">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base">L</div>
                        <span className="text-xl sm:text-2xl font-semibold">Lumina</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button 
                            onClick={() => navigate('/login')}
                            className="px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base text-gray-700 font-medium hover:text-blue-600 transition"
                        >
                            Sign In
                        </button>
                        <button 
                            onClick={() => navigate('/signup')}
                            className="px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base bg-blue-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Side - Content */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8">
                                <Zap size={14} className="sm:w-4 sm:h-4" />
                                <span>Premium Project Management Platform</span>
                            </div>
                            
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                                Orchestrate your vision with precision
                            </h1>
                            
                            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                                The premium workspace designed for teams that value clarity and high-performance collaboration. 
                                Manage projects, assign tasks, and track progress seamlessly.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                                <button 
                                    onClick={() => navigate('/signup')}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 text-sm sm:text-base"
                                >
                                    Start Free Trial <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                                </button>
                                <button 
                                    onClick={() => navigate('/admin-login')}
                                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition border border-gray-200 text-sm sm:text-base"
                                >
                                    Admin Access
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-green-600 sm:w-4 sm:h-4" />
                                    <span>No credit card required</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-green-600 sm:w-4 sm:h-4" />
                                    <span>30-day free trial</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-green-600 sm:w-4 sm:h-4" />
                                    <span>Cancel anytime</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Visual Elements */}
                        <div className="relative mt-8 lg:mt-0">
                            {/* Main Card */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100">
                                <div className="flex items-center justify-between mb-4 sm:mb-6">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base">L</div>
                                        <div>
                                            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Project Dashboard</h3>
                                            <p className="text-xs sm:text-sm text-gray-500">Real-time overview</p>
                                        </div>
                                    </div>
                                    <div className="flex -space-x-2">
                                        <img src="https://i.pravatar.cc/150?u=a" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" alt="user" />
                                        <img src="https://i.pravatar.cc/150?u=b" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" alt="user" />
                                        <img src="https://i.pravatar.cc/150?u=c" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white" alt="user" />
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                            <Briefcase className="text-blue-600" size={16} />
                                            <span className="text-xs font-semibold text-blue-600">Projects</span>
                                        </div>
                                        <p className="text-xl sm:text-2xl font-bold text-blue-900">24</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                            <CheckCircle2 className="text-purple-600" size={16} />
                                            <span className="text-xs font-semibold text-purple-600">Tasks</span>
                                        </div>
                                        <p className="text-xl sm:text-2xl font-bold text-purple-900">156</p>
                                    </div>
                                </div>

                                {/* Task List */}
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">Design System Update</p>
                                            <p className="text-xs text-gray-500">Due in 2 days</p>
                                        </div>
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium whitespace-nowrap">On Track</span>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">API Integration</p>
                                            <p className="text-xs text-gray-500">Due in 5 days</p>
                                        </div>
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium whitespace-nowrap">In Progress</span>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl">
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">User Testing</p>
                                            <p className="text-xs text-gray-500">Due in 1 week</p>
                                        </div>
                                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium whitespace-nowrap">Pending</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Card 1 - Top Right - Hidden on mobile */}
                            <div className="hidden sm:block absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 border border-gray-100 w-36 sm:w-48">
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                    <Users className="text-green-600" size={16} />
                                    <span className="text-xs font-semibold text-gray-700">Team Members</span>
                                </div>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">12</p>
                                <p className="text-xs text-green-600 font-medium mt-1">↑ 3 new this week</p>
                            </div>

                            {/* Floating Card 2 - Bottom Left - Hidden on mobile */}
                            <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 w-36 sm:w-48">
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                    <BarChart3 className="text-white" size={16} />
                                    <span className="text-xs font-semibold text-white">Productivity</span>
                                </div>
                                <p className="text-2xl sm:text-3xl font-bold text-white">94%</p>
                                <p className="text-xs text-blue-100 font-medium mt-1">↑ 12% from last month</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Everything you need to succeed</h2>
                        <p className="text-lg sm:text-xl text-gray-600">Powerful features for modern teams</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Feature 1 */}
                        <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl sm:rounded-3xl border border-blue-200/50 hover:shadow-lg transition-all">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-sm">
                                <Briefcase className="text-blue-600" size={24} />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Project Management</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Create and organize projects with ease. Track progress, manage resources, and deliver on time.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl border border-purple-200/50 hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <CheckCircle2 className="text-purple-600" size={28} />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Task Assignment</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Assign tasks to team members, set deadlines, and monitor completion status in real-time.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl border border-green-200/50 hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <Users className="text-green-600" size={28} />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Work together seamlessly with role-based access control and real-time updates.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl border border-amber-200/50 hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <BarChart3 className="text-amber-600" size={28} />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Analytics Dashboard</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Get insights with beautiful analytics. Track team performance and project metrics.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl border border-pink-200/50 hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <Shield className="text-pink-600" size={28} />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Secure & Private</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Enterprise-grade security with JWT authentication and role-based permissions.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl border border-indigo-200/50 hover:shadow-lg transition-all">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <Clock className="text-indigo-600" size={28} />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Real-time Updates</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Stay in sync with instant notifications and live status updates across your team.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-4xl p-16 text-white text-center">
                        <h2 className="text-4xl font-bold mb-4">Trusted by industry leaders</h2>
                        <p className="text-xl text-blue-100 mb-12">Join thousands of teams already using Lumina</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <div className="text-5xl font-bold mb-2">10,000+</div>
                                <div className="text-blue-100">Active Users</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">50,000+</div>
                                <div className="text-blue-100">Projects Completed</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">99.9%</div>
                                <div className="text-blue-100">Uptime Guarantee</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">What our customers say</h2>
                        <p className="text-xl text-gray-600">Real feedback from real teams</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "Lumina transformed how our team collaborates. The interface is beautiful and intuitive. Best project management tool we've used!"
                            </p>
                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/150?u=1" className="w-12 h-12 rounded-full" alt="user" />
                                <div>
                                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                                    <div className="text-sm text-gray-500">Product Manager, TechCorp</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "The analytics dashboard gives us incredible insights. We've improved our delivery time by 40% since switching to Lumina."
                            </p>
                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/150?u=2" className="w-12 h-12 rounded-full" alt="user" />
                                <div>
                                    <div className="font-semibold text-gray-900">Michael Chen</div>
                                    <div className="text-sm text-gray-500">CTO, StartupXYZ</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "Simple, powerful, and elegant. Lumina helps us stay organized without the complexity of other tools. Highly recommend!"
                            </p>
                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/150?u=3" className="w-12 h-12 rounded-full" alt="user" />
                                <div>
                                    <div className="font-semibold text-gray-900">Emily Rodriguez</div>
                                    <div className="text-sm text-gray-500">Design Lead, CreativeHub</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Ready to transform your workflow?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10">
                        Join thousands of teams already using Lumina to deliver exceptional results.
                    </p>
                    <button 
                        onClick={() => navigate('/signup')}
                        className="inline-flex items-center gap-2 px-10 py-5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 text-lg"
                    >
                        Start Your Free Trial <ArrowRight size={24} />
                    </button>
                    <p className="text-sm text-gray-500 mt-6">No credit card required • 30-day free trial • Cancel anytime</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
                                <span className="text-xl font-semibold text-white">Lumina</span>
                            </div>
                            <p className="text-sm">Premium project management for modern teams.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition">Features</a></li>
                                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition">Security</a></li>
                                <li><a href="#" className="hover:text-white transition">Roadmap</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition">About</a></li>
                                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                                <li><a href="#" className="hover:text-white transition">Licenses</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>&copy; 2024 Lumina. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
