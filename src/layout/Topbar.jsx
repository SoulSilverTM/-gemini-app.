import { Menu, Bell, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Topbar = ({ toggleSidebar }) => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-24 px-8 flex items-center justify-between z-40">
            <div className="hyper-glass px-4 py-3 rounded-[1.5rem] flex items-center hover:scale-105 transition-transform duration-300">
                <button
                    onClick={toggleSidebar}
                    className="text-white/80 hover:text-white transition-colors p-1"
                >
                    <Menu size={26} />
                </button>
            </div>

            <div className="hyper-glass px-8 py-3 rounded-[2rem] flex items-center space-x-8">
                <button
                    onClick={toggleTheme}
                    className="text-white/80 hover:text-yellow-400 transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                    {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                </button>

                <button className="text-white/80 hover:text-white transition-colors relative p-2 hover:bg-white/10 rounded-full">
                    <Bell size={22} />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white/20 animate-pulse"></span>
                </button>

                <div className="flex items-center space-x-4 pl-6 border-l border-white/10">
                    <div className="text-right hidden md:block">
                        <p className="text-base font-semibold text-white tracking-wide">{user?.username}</p>
                        <p className="text-xs text-white/50 font-medium uppercase tracking-wider">Admin</p>
                    </div>
                    <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-white/20 hover:ring-white/40 transition-all cursor-pointer">
                        <User size={24} className="text-white" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
