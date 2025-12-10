import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useTheme } from '../context/ThemeContext';
import clsx from 'clsx';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { theme } = useTheme();

    return (
        <div className="flex h-screen overflow-hidden relative">
            {/* Mesh Gradient Background */}
            <div className="mesh-bg">
                <div className="mesh-blob bg-purple-500 w-[500px] h-[500px] top-[-100px] left-[-100px]" style={{ animationDelay: '0s' }}></div>
                <div className="mesh-blob bg-blue-500 w-[400px] h-[400px] bottom-[-50px] right-[-50px]" style={{ animationDelay: '-5s' }}></div>
                <div className="mesh-blob bg-pink-500 w-[300px] h-[300px] top-[40%] left-[30%]" style={{ animationDelay: '-10s' }}></div>
            </div>

            <Sidebar isOpen={isSidebarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 pt-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
