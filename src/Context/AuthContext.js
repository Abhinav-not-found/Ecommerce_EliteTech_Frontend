import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            fetchUserInfo(token);
        }
    }, []);

    const fetchUserInfo = async (token) => {
        try {
            const res = await axios.get('http://localhost:3001/api/auth/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data) {
                setUser(res.data); 
            } else {
                console.error('No user data received');
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (err) {
            console.error('Failed to fetch user info:', err);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
