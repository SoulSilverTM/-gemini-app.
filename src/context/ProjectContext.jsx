import { createContext, useState, useContext, useEffect } from 'react';

const ProjectContext = createContext();

const initialColumns = [
    {
        id: 'todo',
        title: 'To Do',
        color: 'bg-blue-500',
        tasks: [
            { id: 1, title: 'Design System', priority: 'High', date: 'Dec 24', comments: 3, attachments: 2 },
            { id: 2, title: 'User Research', priority: 'Medium', date: 'Dec 26', comments: 1, attachments: 0 },
        ]
    },
    {
        id: 'in-progress',
        title: 'In Progress',
        color: 'bg-yellow-500',
        tasks: [
            { id: 3, title: 'Dashboard Layout', priority: 'High', date: 'Dec 22', comments: 5, attachments: 4 },
        ]
    },
    {
        id: 'review',
        title: 'Review',
        color: 'bg-purple-500',
        tasks: [
            { id: 4, title: 'Authentication Flow', priority: 'High', date: 'Dec 20', comments: 8, attachments: 1 },
        ]
    },
    {
        id: 'done',
        title: 'Done',
        color: 'bg-green-500',
        tasks: [
            { id: 5, title: 'Project Setup', priority: 'Low', date: 'Dec 18', comments: 0, attachments: 0 },
        ]
    }
];

export const ProjectProvider = ({ children }) => {
    const [columns, setColumns] = useState(() => {
        const storedColumns = localStorage.getItem('erp_projects');
        return storedColumns ? JSON.parse(storedColumns) : initialColumns;
    });

    useEffect(() => {
        localStorage.setItem('erp_projects', JSON.stringify(columns));
    }, [columns]);

    const addTask = (columnId, task) => {
        setColumns(columns.map(col => {
            if (col.id === columnId) {
                return { ...col, tasks: [...col.tasks, { ...task, id: Date.now() }] };
            }
            return col;
        }));
    };

    const moveTask = (taskId, sourceColId, targetColId) => {
        const sourceCol = columns.find(col => col.id === sourceColId);
        const task = sourceCol.tasks.find(t => t.id === taskId);

        setColumns(columns.map(col => {
            if (col.id === sourceColId) {
                return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
            }
            if (col.id === targetColId) {
                return { ...col, tasks: [...col.tasks, task] };
            }
            return col;
        }));
    };

    const deleteTask = (taskId, columnId) => {
        setColumns(columns.map(col => {
            if (col.id === columnId) {
                return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
            }
            return col;
        }));
    };

    return (
        <ProjectContext.Provider value={{ columns, addTask, moveTask, deleteTask }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => useContext(ProjectContext);
