import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

const Reports = () => {
    const { columns } = useProjects();

    // Calculate real metrics from ProjectContext
    const totalTasks = columns.reduce((acc, col) => acc + col.tasks.length, 0);
    const completedTasks = columns.find(col => col.id === 'done')?.tasks.length || 0;
    const activeTasks = totalTasks - completedTasks;

    // Calculate distribution by priority
    const highPriority = columns.reduce((acc, col) => acc + col.tasks.filter(t => t.priority === 'High').length, 0);
    const mediumPriority = columns.reduce((acc, col) => acc + col.tasks.filter(t => t.priority === 'Medium').length, 0);
    const lowPriority = columns.reduce((acc, col) => acc + col.tasks.filter(t => t.priority === 'Low').length, 0);

    const projectData = [
        { name: 'Current', completed: completedTasks, active: activeTasks },
        // Simulated historical data for the chart
        { name: 'Last Week', completed: Math.max(0, completedTasks - 2), active: activeTasks + 2 },
        { name: '2 Weeks Ago', completed: Math.max(0, completedTasks - 5), active: activeTasks + 4 },
    ];

    const taskDistribution = [
        { name: 'High Priority', value: highPriority, color: '#EF4444' },
        { name: 'Medium Priority', value: mediumPriority, color: '#F59E0B' },
        { name: 'Low Priority', value: lowPriority, color: '#3B82F6' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
                    <p className="text-white/60">Track project performance and metrics</p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors border border-white/10">
                        <Filter size={20} />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors">
                        <Download size={20} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Project Velocity Chart */}
                <div className="bg-white/5 rounded-[2rem] border border-white/10 p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Task Status</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={projectData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" />
                                <YAxis stroke="rgba(255,255,255,0.4)" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="completed" name="Completed Tasks" fill="#10B981" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="active" name="Active Tasks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Task Distribution Chart */}
                <div className="bg-white/5 rounded-[2rem] border border-white/10 p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Priority Distribution</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={taskDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {taskDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center space-x-6 mt-4">
                        {taskDistribution.map((item) => (
                            <div key={item.name} className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-white/60 text-sm">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
