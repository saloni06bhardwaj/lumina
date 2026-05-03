import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { 
    LayoutGrid, 
    CheckCircle2, 
    Clock, 
    Search, 
    Bell, 
    LogOut,
    Briefcase,
    ArrowLeft,
    Users
} from 'lucide-react';

const Projects = () => {
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser) {
            navigate('/');
        } else {
            setUser(loggedInUser);
        }
    }, [navigate]);

    useEffect(() => {
        if (user) {
            fetchProjects();
            fetchTasks();
        }
    }, [user]);

    const fetchProjects = async () => {
        try {
            const { data } = await API.get('/projects');
            if (user?.role === 'MEMBER') {
                const { data: userTasks } = await API.get('/tasks');
                const memberProjectIds = [...new Set(userTasks.map(task => task.projectId?._id || task.projectId).filter(Boolean))];
                const memberProjects = data.filter(project => memberProjectIds.includes(project._id));
                setProjects(memberProjects);
            } else {
                setProjects(data);
            }
        } catch (error) {
            console.error("Can't fetch projects:", error);
        }
    };

    const fetchTasks = async () => {
        try {
            const { data } = await API.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error("Can't fetch tasks:", error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex text-[#1A1A1A] antialiased">
            
            {/* SIDEBAR */}
            <aside className="w-70 bg-white border-r border-gray-100 flex flex-col p-6 fixed h-full">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
                    <span className="text-xl font-semibold tracking-tight">Lumina</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <button 
                        onClick={() => navigate(user?.role === 'ADMIN' ? '/admin-dashboard' : '/member-dashboard')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition font-medium"
                    >
                        <LayoutGrid size={20} /> Dashboard
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium">
                        <Briefcase size={20} /> {user?.role === 'ADMIN' ? 'Projects' : 'My Projects'}
                    </button>
                    <button 
                        onClick={() => navigate('/tasks')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition font-medium"
                    >
                        <CheckCircle2 size={20} /> {user?.role === 'ADMIN' ? 'Tasks' : 'My Tasks'}
                    </button>
                </nav>

                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition font-medium mt-auto"
                >
                    <LogOut size={20} /> Sign Out
                </button>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 ml-70">
                
                {/* TOPBAR */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate(user?.role === 'ADMIN' ? '/admin-dashboard' : '/member-dashboard')}
                            className="text-gray-400 hover:text-gray-600 transition"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div className="relative w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search projects..." 
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="text-gray-400 hover:text-gray-600 relative">
                            <Bell size={22} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 border-l pl-6 border-gray-100">
                            <div className="text-right">
                                <p className="text-sm font-semibold">{user.name}</p>
                                <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                            </div>
                            <img src={`https://ui-avatars.com/api/?name=${user.name}&bg=2563EB&color=fff`} className="w-10 h-10 rounded-full" alt="profile" />
                        </div>
                    </div>
                </header>

                {/* CONTENT AREA */}
                <div className="p-10 max-w-7xl mx-auto">
                    <div className="mb-10">
                        <h2 className="text-3xl font-semibold mb-1">{user?.role === 'ADMIN' ? 'All Projects' : 'My Projects'}</h2>
                        <p className="text-gray-500">{user?.role === 'ADMIN' ? 'View and manage all workspace projects.' : 'Projects you are assigned to.'}</p>
                    </div>

                    {/* Projects List */}
                    <div className="space-y-6">
                        {projects.length > 0 ? projects.map((project) => {
                            const projectTasks = tasks.filter(task => task.projectId?._id === project._id || task.projectId === project._id);
                            const assignedMembers = [...new Set(projectTasks.map(task => task.assignedTo?.name).filter(Boolean))];
                            const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
                            const inProgressTasks = projectTasks.filter(t => t.status === 'In Progress').length;
                            const pendingTasks = projectTasks.filter(t => t.status === 'Pending').length;

                            return (
                                <div key={project._id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl">
                                                {project.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
                                                <p className="text-gray-600 mb-3">{project.description || "No description provided."}</p>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span>Created by {project.createdBy?.name || 'Unknown'}</span>
                                                    <span>•</span>
                                                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Task Statistics */}
                                    <div className="grid grid-cols-4 gap-4 mb-6">
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Briefcase size={16} className="text-gray-600" />
                                                <span className="text-xs font-semibold text-gray-600 uppercase">Total Tasks</span>
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900">{projectTasks.length}</p>
                                        </div>
                                        <div className="bg-amber-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock size={16} className="text-amber-600" />
                                                <span className="text-xs font-semibold text-amber-600 uppercase">Pending</span>
                                            </div>
                                            <p className="text-2xl font-bold text-amber-900">{pendingTasks}</p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock size={16} className="text-blue-600" />
                                                <span className="text-xs font-semibold text-blue-600 uppercase">In Progress</span>
                                            </div>
                                            <p className="text-2xl font-bold text-blue-900">{inProgressTasks}</p>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle2 size={16} className="text-green-600" />
                                                <span className="text-xs font-semibold text-green-600 uppercase">Completed</span>
                                            </div>
                                            <p className="text-2xl font-bold text-green-900">{completedTasks}</p>
                                        </div>
                                    </div>

                                    {/* Team Members */}
                                    {assignedMembers.length > 0 && (
                                        <div className="pt-6 border-t border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Users size={16} />
                                                    <span className="font-medium">Team Members:</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {assignedMembers.slice(0, 5).map((member, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg">
                                                            <img 
                                                                src={`https://ui-avatars.com/api/?name=${member}&bg=2563EB&color=fff`} 
                                                                className="w-6 h-6 rounded-full" 
                                                                alt={member}
                                                            />
                                                            <span className="text-sm font-medium text-gray-700">{member}</span>
                                                        </div>
                                                    ))}
                                                    {assignedMembers.length > 5 && (
                                                        <span className="text-sm text-gray-500">+{assignedMembers.length - 5} more</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        }) : (
                            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-400 text-lg font-medium">{user?.role === 'ADMIN' ? 'No projects available' : 'No projects assigned to you'}</p>
                                <p className="text-gray-400 text-sm">{user?.role === 'ADMIN' ? 'Projects will appear here once created' : 'You will see projects here once tasks are assigned to you'}</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Projects;
