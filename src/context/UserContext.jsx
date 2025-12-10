import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Manager', status: 'Inactive' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', role: 'User', status: 'Inactive' },
];

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState(() => {
        const storedUsers = localStorage.getItem('erp_users');
        return storedUsers ? JSON.parse(storedUsers) : initialUsers;
    });

    useEffect(() => {
        localStorage.setItem('erp_users', JSON.stringify(users));
    }, [users]);

    const addUser = (user) => {
        setUsers([...users, { ...user, id: Date.now() }]);
    };

    const updateUser = (updatedUser) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => useContext(UserContext);
