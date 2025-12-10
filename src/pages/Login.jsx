import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();

    useEffect(() => {
        login();
    }, [login]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-white text-xl animate-pulse">
                Redirecting to secure login...
            </div>
        </div>
    );
};

export default Login;
