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
    Calendar,
    User,
    AlertCircle
} from 'lucide-react';

const Tasks = () => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser) {
            navigate('/');
        } else {
            setUser(loggedInUser);
            fetchTasks();
        }
    }, [navigate]);

    const fetchTasks = async () => {
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
            fetchTasks();
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

    const filteredTasks = filter === 'All' ? tasks : tasks.filter(t => t.status === filter);

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
                        onClick={() => navigate(user?.role === 'ADMIN' ? '/admin-dashboard' : '/member-dashboard')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition font-medium"
                    >
                        <LayoutGrid size={20} /> Dashboard
                    </button>
                    <button 
                        onClick={() => navigate('/projects')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition font-medium"
                    >
                        <Briefcase size={20} /> {user?.role === 'ADMIN' ? 'Projects' : 'My Projects'}
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium">
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
                                placeholder="Search tasks..." 
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
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-semibold mb-1">{user?.role === 'ADMIN' ? 'All Tasks' : 'My Tasks'}</h2>
                            <p className="text-gray-500">{user?.role === 'ADMIN' ? 'View and manage all task assignments.' : 'Tasks assigned to you.'}</p>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setFilter('All')}
                                className={`px-4 py-2 rounded-xl font-medium transition ${
                                    filter === 'All' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                All
                            </button>
                            <button 
                                onClick={() => setFilter('Pending')}
                                className={`px-4 py-2 rounded-xl font-medium transition ${
                                    filter === 'Pending' 
                                        ? 'bg-amber-600 text-white' 
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                Pending
                            </button>
                            <button 
                                onClick={() => setFilter('In Progress')}
                                className={`px-4 py-2 rounded-xl font-medium transition ${
                                    filter === 'In Progress' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                In Progress
                            </button>
                            <button 
                                onClick={() => setFilter('Completed')}
                                className={`px-4 py-2 rounded-xl font-medium transition ${
                                    filter === 'Completed' 
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>

                    {/* Tasks List */}
                    <div className="space-y-4">
                        {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                            <div key={task._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-xl font-semibold">{task.title}</h3>
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(task.status)}`}>
                                                {task.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4">{task.description}</p>
                                        
                                        <div className="flex items-center gap-6 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Briefcase size={16} />
                                                <span className="font-medium">{task.projectId?.name || 'No Project'}</span>
                                            </div>
                                            {task.assignedTo && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <User size={16} />
                                                    <span className="font-medium">{task.assignedTo?.name || 'Unassigned'}</span>
                                                </div>
                                            )}
                                            {task.dueDate && (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar size={16} />
                                                    <span className="font-medium">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Status Update Buttons - Only for assigned user or admin */}
                                {(user.role === 'ADMIN' || task.assignedTo?._id === user.id) && (
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
                                )}
                            </div>
                        )) : (
                            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-400 text-lg font-medium">No tasks found</p>
                                <p className="text-gray-400 text-sm">{user?.role === 'ADMIN' ? 'Tasks will appear here once assigned' : 'You have no tasks assigned yet'}</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Tasks;
