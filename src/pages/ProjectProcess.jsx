import React, { useState } from 'react';
import { Workflow, Plus, CheckCircle2, Clock, PlayCircle, AlertCircle, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { useProcess } from '../context/ProcessContext';

const ProjectProcess = () => {
    const { tasks, addTask, updateTaskStatus, deleteTask } = useProcess();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskAssignee, setNewTaskAssignee] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState('Pending');

    const statusColors = {
        'Pending': 'text-gray-400 bg-gray-400/10 border-gray-400/20',
        'In Execution': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
        'In Testing': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
        'Completed': 'text-green-400 bg-green-400/10 border-green-400/20',
    };

    const statusIcons = {
        'Pending': Clock,
        'In Execution': PlayCircle,
        'In Testing': AlertCircle,
        'Completed': CheckCircle2,
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        addTask({
            title: newTaskTitle,
            assignee: newTaskAssignee || 'Unassigned',
            status: newTaskStatus,
            date: new Date().toISOString().split('T')[0]
        });

        setNewTaskTitle('');
        setNewTaskAssignee('');
        setNewTaskStatus('Pending');
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Project Process</h1>
                    <p className="text-white/60">Track task lifecycle and status</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                >
                    <Plus size={20} />
                    <span>New Task</span>
                </button>
            </div>

            <div className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/10 text-white/60 font-medium text-sm">
                    <div className="col-span-1"></div>
                    <div className="col-span-4">Task Name</div>
                    <div className="col-span-2">Assignee</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                <div className="divide-y divide-white/5">
                    {tasks.map((task) => {
                        const StatusIcon = statusIcons[task.status];
                        return (
                            <div key={task.id} className="grid grid-cols-12 gap-4 p-6 hover:bg-white/5 transition-colors items-center group">
                                <div className="col-span-1 flex justify-center">
                                    <div className={clsx("p-2 rounded-lg", statusColors[task.status])}>
                                        <StatusIcon size={20} />
                                    </div>
                                </div>
                                <div className="col-span-4 font-medium text-white">{task.title}</div>
                                <div className="col-span-2 text-white/60 text-sm">{task.assignee}</div>
                                <div className="col-span-2 text-white/60 text-sm">{task.date}</div>
                                <div className="col-span-2">
                                    <select
                                        value={task.status}
                                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                        className={clsx(
                                            "w-full px-3 py-1.5 rounded-lg text-sm font-medium border bg-transparent focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors cursor-pointer",
                                            statusColors[task.status]
                                        )}
                                    >
                                        <option value="Pending" className="bg-[#1a1f2e] text-gray-400">Pending</option>
                                        <option value="In Execution" className="bg-[#1a1f2e] text-blue-400">In Execution</option>
                                        <option value="In Testing" className="bg-[#1a1f2e] text-yellow-400">In Testing</option>
                                        <option value="Completed" className="bg-[#1a1f2e] text-green-400">Completed</option>
                                    </select>
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {tasks.length === 0 && (
                        <div className="p-8 text-center text-white/40">
                            No tasks found. Add a new task to get started.
                        </div>
                    )}
                </div>
            </div>

            {/* Add Task Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#1a1f2e] p-6 rounded-2xl border border-white/10 w-full max-w-md m-4">
                        <h2 className="text-xl font-bold text-white mb-4">Add New Process Task</h2>
                        <form onSubmit={handleAddTask} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Task Title</label>
                                <input
                                    type="text"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                    placeholder="Enter task title"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Assignee</label>
                                <input
                                    type="text"
                                    value={newTaskAssignee}
                                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                    placeholder="Enter assignee name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Initial Status</label>
                                <select
                                    value={newTaskStatus}
                                    onChange={(e) => setNewTaskStatus(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Execution">In Execution</option>
                                    <option value="In Testing">In Testing</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectProcess;
