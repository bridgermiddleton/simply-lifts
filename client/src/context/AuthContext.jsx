import React, { createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext()


export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        fetch('/api/auth')
        .then(response => response.json())
        .then(data => {
            setUser(data.user_id);
            setLoading(false);
        }).catch((e) => {
            navigate('/');
    
        });
    }, []);
    
    
    const login = async (email, password) => {
        event.preventDefault();
        const response = await fetch("/api/login", {
            method: "POST",
    
            headers: {
                'Content-Type': 'application/json',
            },
    
            body: JSON.stringify({ email, password })
        });
    
        if (!response.ok)
        {
            throw new Error('Incorrect login');
        }
        const data = await response.json();
        setUser(data.user_id);
        console.log("hi");
        navigate('/home');
    };
    
    const logout = () => {
        setUser(null);
    }
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}



