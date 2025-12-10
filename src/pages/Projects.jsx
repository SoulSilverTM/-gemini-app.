import React, { useState } from 'react';
import { Plus, MoreVertical, Calendar, MessageSquare, Paperclip, ChevronRight, ChevronLeft, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { useProjects } from '../context/ProjectContext';

const Projects = () => {
    const { columns, addTask, moveTask, deleteTask } = useProjects();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('Medium');

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        addTask('todo', {
            title: newTaskTitle,
            priority: newTaskPriority,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            comments: 0,
            attachments: 0
        });

        setNewTaskTitle('');
        setIsModalOpen(false);
    };

    const getNextColumn = (currentId) => {
        const ids = columns.map(c => c.id);
        const index = ids.indexOf(currentId);
        return index < ids.length - 1 ? ids[index + 1] : null;
    };

    const getPrevColumn = (currentId) => {
        const ids = columns.map(c => c.id);
        const index = ids.indexOf(currentId);
        return index > 0 ? ids[index - 1] : null;
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
                    <p className="text-white/60">Manage your ongoing projects and tasks</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                >
                    <Plus size={20} />
                    <span>New Project</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
                {columns.map((column) => (
                    <div key={column.id} className="min-w-[300px] flex flex-col space-y-4">
                        <div className="flex items-center justify-between p-1">
                            <div className="flex items-center space-x-3">
                                <div className={clsx("w-3 h-3 rounded-full", column.color)} />
                                <h3 className="font-semibold text-white">{column.title}</h3>
                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-white/60">
                                    {column.tasks.length}
                                </span>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {column.tasks.map((task) => (
                                <div key={task.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group relative">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={clsx(
                                            "px-2 py-1 rounded-lg text-xs font-medium",
                                            task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                                                task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-blue-500/20 text-blue-400'
                                        )}>
                                            {task.priority}
                                        </span>
                                        <button
                                            onClick={() => deleteTask(task.id, column.id)}
                                            className="text-white/40 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <h4 className="text-white font-medium mb-3">{task.title}</h4>

                                    <div className="flex items-center justify-between text-white/40 text-sm mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-1">
                                                <MessageSquare size={14} />
                                                <span>{task.comments}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Paperclip size={14} />
                                                <span>{task.attachments}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Calendar size={14} />
                                            <span>{task.date}</span>
                                        </div>
                                    </div>

                                    {/* Move Controls */}
                                    <div className="flex justify-between pt-2 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            disabled={!getPrevColumn(column.id)}
                                            onClick={() => moveTask(task.id, column.id, getPrevColumn(column.id))}
                                            className="p-1 hover:bg-white/10 rounded-lg text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <button
                                            disabled={!getNextColumn(column.id)}
                                            onClick={() => moveTask(task.id, column.id, getNextColumn(column.id))}
                                            className="p-1 hover:bg-white/10 rounded-lg text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Task Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#1a1f2e] p-6 rounded-2xl border border-white/10 w-full max-w-md m-4">
                        <h2 className="text-xl font-bold text-white mb-4">Add New Project</h2>
                        <form onSubmit={handleAddTask} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Project Title</label>
                                <input
                                    type="text"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                    placeholder="Enter project title"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/60 mb-2">Priority</label>
                                <select
                                    value={newTaskPriority}
                                    onChange={(e) => setNewTaskPriority(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
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
                                    Add Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
