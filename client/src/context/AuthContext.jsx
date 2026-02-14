import React, { createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();


export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        fetch('/api/auth', {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if (data.message == "unauthenticated")
            {
                setUser(null)
            }
            else
            {
                setUser(data.user_id);
            }
            setLoading(false);
        }).catch((e) => {
            console.error(e);
    
        });
    }, []);
    
    
    const login = async (email, password) => {
        const response = await fetch("/api/login", {
            method: "POST",
    
            headers: {
                'Content-Type': 'application/json',
            },
    
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
    
        if (!response.ok)
        {
            throw new Error('Incorrect login');
        }
        const data = await response.json();
        setUser(data.user_id);
        navigate('/home');
    };
    
    const logout = async () => {
        const response = await fetch("/api/logout", {
            method: "POST"
        })

        if (!response.ok)
        {
            throw new Error('Failed logout')
        }
        setUser(null);
        navigate('/');
    }
    
    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}



