import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const data = [
    { name: 'Jan', users: 4000, active: 2400 },
    { name: 'Feb', users: 3000, active: 1398 },
    { name: 'Mar', users: 2000, active: 9800 },
    { name: 'Apr', users: 2780, active: 3908 },
    { name: 'May', users: 1890, active: 4800 },
    { name: 'Jun', users: 2390, active: 3800 },
    { name: 'Jul', users: 3490, active: 4300 },
];

const Dashboard = () => {
    const { theme } = useTheme();
    const textColor = theme === 'dark' ? '#fff' : '#333';

    return (
        <div className="space-y-10" data-aos="fade-up">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-bold mb-2 text-white tracking-tight drop-shadow-lg">Dashboard</h1>
                    <p className="text-white/70 text-lg font-light tracking-wide">Overview of system performance.</p>
                </div>
                <div className="hyper-glass px-6 py-3 rounded-full text-sm font-medium text-white/90 shadow-lg backdrop-blur-3xl">
                    Live Data • Updated Now
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: 'Total Users', value: '12,345', change: '+12%', color: 'from-cyan-400 to-blue-500' },
                    { title: 'Active Sessions', value: '1,234', change: '+5%', color: 'from-purple-400 to-pink-500' },
                    { title: 'New Signups', value: '89', change: '+18%', color: 'from-amber-400 to-orange-500' }
                ].map((stat, index) => (
                    <div key={index} className="hyper-glass p-8 rounded-[2rem] relative overflow-hidden group glass-card-hover">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-30 rounded-bl-[3rem] -mr-6 -mt-6 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40 blur-xl`} />
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-2">{stat.title}</h3>
                        <p className="text-5xl font-bold text-white tracking-tight drop-shadow-md">{stat.value}</p>
                        <div className="mt-6 flex items-center text-sm font-medium">
                            <span className="bg-white/10 text-white px-3 py-1 rounded-full backdrop-blur-md border border-white/10">{stat.change}</span>
                            <span className="ml-3 text-white/50">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="hyper-glass p-8 rounded-[2.5rem] glass-card-hover">
                    <h3 className="text-2xl font-bold mb-8 text-white tracking-tight">User Growth</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="rgba(255,255,255,0.5)" axisLine={false} tickLine={false} dx={-10} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(20, 20, 30, 0.6)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '16px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                                <Area type="monotone" dataKey="active" stroke="#82ca9d" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="hyper-glass p-8 rounded-[2.5rem] glass-card-hover">
                    <h3 className="text-2xl font-bold mb-8 text-white tracking-tight">Activity Overview</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} barSize={20}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="rgba(255,255,255,0.5)" axisLine={false} tickLine={false} dx={-10} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{
                                        backgroundColor: 'rgba(20, 20, 30, 0.6)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '16px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="users" fill="#8884d8" radius={[10, 10, 10, 10]} />
                                <Bar dataKey="active" fill="#82ca9d" radius={[10, 10, 10, 10]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
