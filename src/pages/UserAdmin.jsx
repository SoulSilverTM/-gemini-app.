import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import UserModal from '../components/UserModal';
import { useTheme } from '../context/ThemeContext';
import { useUsers } from '../context/UserContext';

const UserAdmin = () => {
    const { users, addUser, updateUser, deleteUser } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const { theme } = useTheme();

    const handleAddUser = () => {
        setCurrentUser(null);
        setIsModalOpen(true);
    };

    const handleEditUser = (user) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
        }
    };

    const handleSaveUser = (userData) => {
        if (currentUser) {
            updateUser({ ...userData, id: currentUser.id });
        } else {
            addUser(userData);
        }
    };

    return (
        <div className="space-y-8" data-aos="fade-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-5xl font-bold mb-2 text-white tracking-tight drop-shadow-lg">Users</h1>
                    <p className="text-white/70 text-lg font-light tracking-wide">Manage system access and roles.</p>
                </div>
                <button
                    onClick={handleAddUser}
                    className="flex items-center px-8 py-4 bg-white text-black hover:bg-white/90 rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] font-bold tracking-wide transform hover:-translate-y-1"
                >
                    <Plus size={22} className="mr-2" />
                    Add User
                </button>
            </div>

            <div className="hyper-glass rounded-[2.5rem] overflow-hidden">
                {/* Toolbar */}
                <div className="p-8 border-b border-white/10 flex flex-col sm:flex-row gap-6 justify-between items-center bg-white/5">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-5 top-4 text-white/50" size={20} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-14 pr-6 py-4 rounded-[1.5rem] border border-white/10 bg-black/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-black/30 transition-all backdrop-blur-md"
                        />
                    </div>
                    <button className="flex items-center px-6 py-4 rounded-[1.5rem] border border-white/10 text-white/80 hover:bg-white/10 transition-colors backdrop-blur-md">
                        <Filter size={20} className="mr-3" />
                        Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-white">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-8 font-semibold text-sm uppercase tracking-widest text-white/50">User</th>
                                <th className="p-8 font-semibold text-sm uppercase tracking-widest text-white/50">Role</th>
                                <th className="p-8 font-semibold text-sm uppercase tracking-widest text-white/50">Status</th>
                                <th className="p-8 font-semibold text-sm uppercase tracking-widest text-white/50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                    <td className="p-8">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-5 text-white font-bold text-lg shadow-lg ring-1 ring-white/20">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg tracking-wide">{user.name}</div>
                                                <div className="text-sm text-white/50 font-medium">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border ${user.role === 'Admin' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]' :
                                                user.role === 'Manager' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]' :
                                                    'bg-gray-500/20 text-gray-300 border-gray-500/30'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center">
                                            <span className={`w-3 h-3 rounded-full mr-3 ${user.status === 'Active' ? 'bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.6)] animate-pulse' : 'bg-red-400'}`}></span>
                                            <span className={`text-sm font-medium ${user.status === 'Active' ? 'text-green-300' : 'text-red-300'}`}>
                                                {user.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="p-3 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-transparent hover:border-white/10"
                                            >
                                                <Edit2 size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="p-3 rounded-xl hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors border border-transparent hover:border-red-500/20"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveUser}
                user={currentUser}
            />
        </div>
    );
};

export default UserAdmin;
