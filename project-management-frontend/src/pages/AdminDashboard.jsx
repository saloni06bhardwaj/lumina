import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { 
    LayoutGrid, 
    CheckCircle2, 
    Clock, 
    Plus, 
    Search, 
    Bell, 
    MoreVertical,
    LogOut,
    Briefcase,
    Users,
    TrendingUp
} from 'lucide-react';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [newTask, setNewTask] = useState({ 
        title: '', 
        description: '', 
        projectId: '', 
        assignedTo: '', 
        dueDate: '' 
    });

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser || loggedInUser.role !== 'ADMIN') {
            navigate('/');
        } else {
            setUser(loggedInUser);
            fetchProjects();
            fetchTasks();
            fetchUsers();
        }
    }, [navigate]);

    const fetchProjects = async () => {
        try {
            const { data } = await API.get('/projects');
            setProjects(data);
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

    const fetchUsers = async () => {
        try {
            const { data } = await API.get('/auth/users');
            const members = data.filter(u => u.role === 'MEMBER');
            setUsers(members);
        } catch (error) {
            console.error("Can't fetch users:", error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            await API.post('/projects', newProject);
            setIsModalOpen(false);
            setNewProject({ name: '', description: '' });
            fetchProjects();
        } catch (error) {
            alert("Failed to create project!");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            await API.post('/tasks', newTask);
            setIsTaskModalOpen(false);
            setNewTask({ title: '', description: '', projectId: '', assignedTo: '', dueDate: '' });
            alert('Task assigned successfully!');
            fetchTasks();
        } catch (error) {
            alert("Failed to assign task!");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProject = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await API.delete(`/projects/${projectToDelete._id}`);
            setIsDeleteModalOpen(false);
            setProjectToDelete(null);
            fetchProjects();
        } catch (error) {
            alert("Failed to delete project!");
        } finally {
            setLoading(false);
        }
    };

    const openDeleteModal = (project) => {
        setProjectToDelete(project);
        setIsDeleteModalOpen(true);
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex text-[#1A1A1A] antialiased">
            
            <aside className="w-70 bg-white border-r border-gray-100 flex flex-col p-6 fixed h-full">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
                    <span className="text-xl font-semibold tracking-tight">Lumina</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium">
                        <LayoutGrid size={20} /> Dashboard
                    </button>
                    <button 
                        onClick={() => navigate('/projects')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition font-medium"
                    >
                        <Briefcase size={20} /> Projects
                    </button>
                    <button 
                        onClick={() => navigate('/tasks')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition font-medium"
                    >
                        <CheckCircle2 size={20} /> Tasks
                    </button>
                </nav>

                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition font-medium mt-auto"
                >
                    <LogOut size={20} /> Sign Out
                </button>
            </aside>

            <main className="flex-1 ml-70">
                
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search projects or tasks..." 
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
                                <p className="text-xs text-gray-400">Admin</p>
                            </div>
                            <img src={`https://ui-avatars.com/api/?name=${user.name}&bg=2563EB&color=fff`} className="w-10 h-10 rounded-full" alt="profile" />
                        </div>
                    </div>
                </header>

                <div className="p-10 max-w-7xl mx-auto">
                    
                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-3xl border border-blue-200/50 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <Briefcase className="text-blue-600" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-blue-600 bg-white px-3 py-1 rounded-full">Total</span>
                            </div>
                            <h3 className="text-3xl font-bold text-blue-900 mb-1">{projects.length}</h3>
                            <p className="text-sm text-blue-700 font-medium">Active Projects</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-3xl border border-purple-200/50 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <CheckCircle2 className="text-purple-600" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-purple-600 bg-white px-3 py-1 rounded-full">Tasks</span>
                            </div>
                            <h3 className="text-3xl font-bold text-purple-900 mb-1">{tasks.length}</h3>
                            <p className="text-sm text-purple-700 font-medium">Total Assignments</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-3xl border border-green-200/50 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <Users className="text-green-600" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-green-600 bg-white px-3 py-1 rounded-full">Team</span>
                            </div>
                            <h3 className="text-3xl font-bold text-green-900 mb-1">{users.length}</h3>
                            <p className="text-sm text-green-700 font-medium">Team Members</p>
                        </div>

                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-3xl border border-amber-200/50 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    <TrendingUp className="text-amber-600" size={24} />
                                </div>
                                <span className="text-xs font-semibold text-amber-600 bg-white px-3 py-1 rounded-full">Done</span>
                            </div>
                            <h3 className="text-3xl font-bold text-amber-900 mb-1">{tasks.filter(t => t.status === 'Completed').length}</h3>
                            <p className="text-sm text-amber-700 font-medium">Completed Tasks</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-semibold mb-1">Projects</h2>
                            <p className="text-gray-500">Manage and track your active workspaces.</p>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setIsTaskModalOpen(true)}
                                className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition border border-gray-200"
                            >
                                <CheckCircle2 size={20} /> Assign Task
                            </button>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                            >
                                <Plus size={20} /> Create Project
                            </button>
                        </div>
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.length > 0 ? projects.map((project) => {
                            const projectTasks = tasks.filter(task => task.projectId?._id === project._id || task.projectId === project._id);
                            const hasAssignedTasks = projectTasks.length > 0;
                            const assignedMembers = [...new Set(projectTasks.map(task => task.assignedTo?.name).filter(Boolean))];
                            
                            return (
                            <div 
                                key={project._id} 
                                className={`bg-white p-6 rounded-3xl border-2 ${
                                    hasAssignedTasks 
                                        ? 'border-green-200 shadow-[0_8px_30px_rgba(34,197,94,0.08)]' 
                                        : 'border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]'
                                } hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all group`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-12 h-12 ${
                                        hasAssignedTasks ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                                    } rounded-2xl flex items-center justify-center font-bold text-xl`}>
                                        {project.name[0]}
                                    </div>
                                    <button 
                                        onClick={() => openDeleteModal(project)}
                                        className="text-gray-300 hover:text-red-500 transition"
                                    >
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">{project.name}</h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {project.description || "No description provided for this premium workspace project."}
                                </p>
                                
                                {hasAssignedTasks && (
                                    <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle2 size={14} className="text-green-600" />
                                            <span className="text-xs font-semibold text-green-700">Tasks Assigned</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {assignedMembers.slice(0, 3).map((member, idx) => (
                                                <span key={idx} className="text-xs bg-white text-green-700 px-2 py-1 rounded-lg font-medium">
                                                    {member}
                                                </span>
                                            ))}
                                            {assignedMembers.length > 3 && (
                                                <span className="text-xs bg-white text-green-700 px-2 py-1 rounded-lg font-medium">
                                                    +{assignedMembers.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                                        <Clock size={16} /> {projectTasks.length} {projectTasks.length === 1 ? 'Task' : 'Tasks'}
                                    </div>
                                    <div className="flex -space-x-2">
                                        {assignedMembers.slice(0, 2).map((member, idx) => (
                                            <img 
                                                key={idx}
                                                src={`https://ui-avatars.com/api/?name=${member}&bg=22c55e&color=fff`} 
                                                className="w-8 h-8 rounded-full border-2 border-white" 
                                                alt={member}
                                                title={member}
                                            />
                                        ))}
                                        {assignedMembers.length > 2 && (
                                            <div className="w-8 h-8 rounded-full bg-green-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-green-600">
                                                +{assignedMembers.length - 2}
                                            </div>
                                        )}
                                        {assignedMembers.length === 0 && (
                                            <div className="text-xs text-gray-400 italic">No assignments</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}) : (
                            <div className="col-span-full py-20 text-center bg-white rounded-4xl border border-dashed border-gray-200">
                                <p className="text-gray-400 italic">No projects available.</p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Create Project Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                        <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-gray-100">
                            <h3 className="text-3xl font-bold mb-2 text-gray-900">Create New Project</h3>
                            <p className="text-gray-500 mb-8">Start a new workspace for your team</p>
                            
                            <form onSubmit={handleCreateProject} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newProject.name}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        placeholder="e.g. Lumina Revamp"
                                        onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                    <textarea 
                                        value={newProject.description}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition h-32 resize-none"
                                        placeholder="Describe your project goals and objectives..."
                                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                                    ></textarea>
                                </div>
                                
                                <div className="flex gap-3 pt-4">
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setNewProject({ name: '', description: '' });
                                        }}
                                        className="flex-1 py-3 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                                    >
                                        <Plus size={18} /> Create Project
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Assign Task Modal */}
                {isTaskModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                        <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-gray-100">
                            <h3 className="text-3xl font-bold mb-2 text-gray-900">Assign New Task</h3>
                            <p className="text-gray-500 mb-8">Assign a task to a team member</p>
                            
                            <form onSubmit={handleCreateTask} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Task Title</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newTask.title}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        placeholder="e.g. Design homepage mockup"
                                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                    <textarea 
                                        value={newTask.description}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition h-24 resize-none"
                                        placeholder="Describe the task details..."
                                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project</label>
                                    <select 
                                        required
                                        value={newTask.projectId}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        onChange={(e) => setNewTask({...newTask, projectId: e.target.value})}
                                    >
                                        <option value="">Select a project</option>
                                        {projects.map(project => (
                                            <option key={project._id} value={project._id}>{project.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Assign To</label>
                                    <select 
                                        required
                                        value={newTask.assignedTo}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                                    >
                                        <option value="">Select a team member</option>
                                        {users.map(member => (
                                            <option key={member._id} value={member._id}>
                                                {member.name} ({member.email})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
                                    <input 
                                        type="date" 
                                        required
                                        value={newTask.dueDate}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                                    />
                                </div>
                                
                                <div className="flex gap-3 pt-4">
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setIsTaskModalOpen(false);
                                            setNewTask({ title: '', description: '', projectId: '', assignedTo: '', dueDate: '' });
                                        }}
                                        className="flex-1 py-3 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 size={18} /> Assign Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && projectToDelete && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                        <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl border border-gray-100">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-gray-900">Delete Project?</h3>
                                <p className="text-gray-500 mb-2">Are you sure you want to delete</p>
                                <p className="text-gray-900 font-semibold mb-6">"{projectToDelete.name}"?</p>
                                <p className="text-sm text-gray-500 mb-8">This action cannot be undone.</p>
                                
                                <div className="flex gap-3 w-full">
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setIsDeleteModalOpen(false);
                                            setProjectToDelete(null);
                                        }}
                                        className="flex-1 py-3 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleDeleteProject}
                                        className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
