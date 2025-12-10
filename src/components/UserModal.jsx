import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const UserModal = ({ isOpen, onClose, onSave, user }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User',
        status: 'Active'
    });
    const { theme } = useTheme();

    useEffect(() => {
        if (user) {
            setFormData(user);
        } else {
            setFormData({ name: '', email: '', role: 'User', status: 'Active' });
        }
    }, [user]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-500">
            <div className="hyper-glass p-10 rounded-[3rem] w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-all scale-100 border border-white/20" data-aos="zoom-in">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">{user ? 'Edit User' : 'Add New User'}</h2>
                        <p className="text-white/50 text-sm mt-1">Enter user details below.</p>
                    </div>
                    <button onClick={onClose} className="p-3 rounded-full hover:bg-white/10 transition text-white/70 hover:text-white border border-transparent hover:border-white/10">
                        <X size={28} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3 ml-1 group-focus-within:text-blue-400 transition-colors">Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-6 py-4 rounded-[1.5rem] bg-black/20 border border-white/10 text-white placeholder-white/20 outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-black/40 transition-all text-lg"
                                placeholder="e.g. John Doe"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3 ml-1 group-focus-within:text-blue-400 transition-colors">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-6 py-4 rounded-[1.5rem] bg-black/20 border border-white/10 text-white placeholder-white/20 outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-black/40 transition-all text-lg"
                                placeholder="e.g. john@example.com"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3 ml-1 group-focus-within:text-blue-400 transition-colors">Role</label>
                                <div className="relative">
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-6 py-4 rounded-[1.5rem] bg-black/20 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-black/40 transition-all appearance-none text-lg cursor-pointer hover:bg-black/30"
                                    >
                                        <option value="User" className="bg-gray-900">User</option>
                                        <option value="Admin" className="bg-gray-900">Admin</option>
                                        <option value="Manager" className="bg-gray-900">Manager</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/50">
                                        ▼
                                    </div>
                                </div>
                            </div>
                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3 ml-1 group-focus-within:text-blue-400 transition-colors">Status</label>
                                <div className="relative">
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-6 py-4 rounded-[1.5rem] bg-black/20 border border-white/10 text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-black/40 transition-all appearance-none text-lg cursor-pointer hover:bg-black/30"
                                    >
                                        <option value="Active" className="bg-gray-900">Active</option>
                                        <option value="Inactive" className="bg-gray-900">Inactive</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/50">
                                        ▼
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-10 pt-8 border-t border-white/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-8 py-4 rounded-[1.5rem] font-bold transition-colors bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-10 py-4 rounded-[1.5rem] bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-1 hover:scale-105"
                        >
                            Save User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;
