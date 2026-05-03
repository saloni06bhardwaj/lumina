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
    AlertCircle,
    Calendar
} from 'lucide-react';

const MemberDashboard = () => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser || loggedInUser.role !== 'MEMBER') {
            navigate('/');
        } else {
            setUser(loggedInUser);
            fetchMyTasks();
        }
    }, [navigate]);

    const fetchMyTasks = async () => {
        try {
            const { data } = await API.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error("Can't fetch tasks:", error);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        if (loading) return;
        setLoading(true);
        try {
            await API.put(`/tasks/${taskId}`, { status: newStatus });
            fetchMyTasks();
        } catch (error) {
            alert("Failed to update task status!");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    if (!user) return null;

    const pendingTasks = tasks.filter(t => t.status === 'Pending');
    const inProgressTasks = tasks.filter(t => t.status === 'In Progress');
    const completedTasks = tasks.filter(t => t.status === 'Completed');

    const getStatusColor = (status) => {
        switch(status) {
            case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

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
                        onClick={() => navigate('/member-dashboard')}
                        className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium"
                    >
                        <LayoutGrid size={20} /> Dashboard
                    </button>
                    <button 
                        onClick={() => navigate('/projects')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition font-medium"
                    >
                        <Briefcase size={20} /> My Projects
                    </button>
                    <button 
                        onClick={() => navigate('/tasks')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition font-medium"
                    >
                        <CheckCircle2 size={20} /> My Tasks
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
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search tasks..." 
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100 text-sm"
                        />
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
                    
                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-3xl border border-amber-200/50 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <AlertCircle className="text-amber-600" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-amber-600 bg-white px-3 py-1 rounded-full">Pending</span>
                            </div>
                            <h3 className="text-3xl font-bold text-amber-900 mb-1">{pendingTasks.length}</h3>
                            <p className="text-sm text-amber-700 font-medium">Tasks Pending</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-3xl border border-blue-200/50 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <Clock className="text-blue-600" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-blue-600 bg-white px-3 py-1 rounded-full">Active</span>
                            </div>
                            <h3 className="text-3xl font-bold text-blue-900 mb-1">{inProgressTasks.length}</h3>
                            <p className="text-sm text-blue-700 font-medium">In Progress</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-3xl border border-green-200/50 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <CheckCircle2 className="text-green-600" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-green-600 bg-white px-3 py-1 rounded-full">Done</span>
                            </div>
                            <h3 className="text-3xl font-bold text-green-900 mb-1">{completedTasks.length}</h3>
                            <p className="text-sm text-green-700 font-medium">Completed</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-3xl font-semibold mb-1">My Tasks</h2>
                        <p className="text-gray-500">Manage your assigned tasks and update their status.</p>
                    </div>

                    {/* Tasks List */}
                    <div className="space-y-4">
                        {tasks.length > 0 ? tasks.map((task) => (
                            <div key={task._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold">{task.title}</h3>
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(task.status)}`}>
                                                {task.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-3">{task.description}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={16} />
                                                <span>{task.projectId?.name || 'No Project'}</span>
                                            </div>
                                            {task.dueDate && (
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={16} />
                                                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-2 pt-4 border-t border-gray-100">
                                    <button 
                                        onClick={() => handleStatusChange(task._id, 'Pending')}
                                        disabled={task.status === 'Pending'}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                            task.status === 'Pending' 
                                                ? 'bg-amber-100 text-amber-700 cursor-not-allowed' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
                                        }`}
                                    >
                                        Pending
                                    </button>
                                    <button 
                                        onClick={() => handleStatusChange(task._id, 'In Progress')}
                                        disabled={task.status === 'In Progress'}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                            task.status === 'In Progress' 
                                                ? 'bg-blue-100 text-blue-700 cursor-not-allowed' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                                        }`}
                                    >
                                        In Progress
                                    </button>
                                    <button 
                                        onClick={() => handleStatusChange(task._id, 'Completed')}
                                        disabled={task.status === 'Completed'}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                            task.status === 'Completed' 
                                                ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                                        }`}
                                    >
                                        Completed
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-400 text-lg font-medium">No tasks assigned yet</p>
                                <p className="text-gray-400 text-sm">Your assigned tasks will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MemberDashboard;
