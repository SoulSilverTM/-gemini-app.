import { createContext, useState, useContext, useEffect } from 'react';

const ProcessContext = createContext();

const initialTasks = [
    { id: 1, title: 'Define Project Scope', status: 'Completed', assignee: 'John Doe', date: '2024-12-01' },
    { id: 2, title: 'Database Schema Design', status: 'In Execution', assignee: 'Jane Smith', date: '2024-12-05' },
    { id: 3, title: 'API Endpoint Implementation', status: 'Pending', assignee: 'Mike Johnson', date: '2024-12-10' },
    { id: 4, title: 'Frontend Integration', status: 'Pending', assignee: 'Sarah Wilson', date: '2024-12-15' },
    { id: 5, title: 'User Acceptance Testing', status: 'In Testing', assignee: 'Tom Brown', date: '2024-12-20' },
];

export const ProcessProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('erp_process_tasks');
        return storedTasks ? JSON.parse(storedTasks) : initialTasks;
    });

    useEffect(() => {
        localStorage.setItem('erp_process_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now() }]);
    };

    const updateTaskStatus = (id, newStatus) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <ProcessContext.Provider value={{ tasks, addTask, updateTaskStatus, deleteTask }}>
            {children}
        </ProcessContext.Provider>
    );
};

export const useProcess = () => useContext(ProcessContext);
