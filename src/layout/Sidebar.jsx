import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, FolderKanban, Sliders, Workflow, FileText, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

const Sidebar = ({ isOpen }) => {
    const { logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'Users', path: '/users' },
        { icon: FolderKanban, label: 'Projects', path: '/projects' },
        { icon: Workflow, label: 'Project Process', path: '/process' },
        { icon: FileText, label: 'Documents', path: '/documents' },
        { icon: BarChart3, label: 'Reports', path: '/reports' },
        { icon: Sliders, label: 'Configuration', path: '/configuration' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className={clsx(
            "hyper-glass m-4 rounded-[2.5rem] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50",
            isOpen ? "w-72" : "w-24"
        )}>
            <div className="h-24 flex items-center justify-center border-b border-white/10">
                <div className={clsx("flex items-center space-x-3", !isOpen && "justify-center")}>
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg ring-2 ring-white/20">
                        <span className="text-white font-bold text-xl">E</span>
                    </div>
                    {isOpen && <h1 className="font-bold text-2xl text-white tracking-tight text-gradient-ios">ERP 26</h1>}
                </div>
            </div>

            <nav className="flex-1 py-8 px-4 space-y-3">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={clsx(
                            "flex items-center px-5 py-4 rounded-[1.5rem] transition-all duration-300 group relative overflow-hidden",
                            location.pathname === item.path
                                ? "bg-white/20 text-white shadow-lg backdrop-blur-xl border border-white/20"
                                : "text-white/60 hover:text-white hover:bg-white/10"
                        )}
                    >
                        <item.icon size={24} className={clsx("transition-transform duration-300", location.pathname === item.path && "scale-110")} />
                        <span className={clsx("ml-4 font-medium text-lg transition-opacity duration-300", !isOpen && "opacity-0 hidden")}>{item.label}</span>
                        {location.pathname === item.path && (
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50 pointer-events-none" />
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-6 border-t border-white/10">
                <button
                    onClick={logout}
                    className="flex items-center w-full px-5 py-4 text-white/60 hover:bg-red-500/20 hover:text-red-400 rounded-[1.5rem] transition-all duration-300 group"
                >
                    <LogOut size={24} className="group-hover:-translate-x-1 transition-transform" />
                    <span className={clsx("ml-4 font-medium text-lg", !isOpen && "hidden")}>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
