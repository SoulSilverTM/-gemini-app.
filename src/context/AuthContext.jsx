import { createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const {
        user,
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        logout: auth0Logout
    } = useAuth0();

    const login = () => {
        loginWithRedirect();
    };

    const logout = () => {
        auth0Logout({ logoutParams: { returnTo: window.location.origin } });
    };

    // Maintain compatibility: user object or null
    const exposedUser = isAuthenticated ? user : null;

    return (
        <AuthContext.Provider value={{ user: exposedUser, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

