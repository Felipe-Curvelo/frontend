import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, createSession } from '../services/api';
import { useToast } from '@chakra-ui/react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const toast = useToast();
    const navigate = useNavigate();
    const [ authenticated, setAuthenticated ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ user, setUser ] = useState("");
    const [ loading, setLoading ] = useState(true);

    
    useEffect(() => {
        const checkUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (checkUser){
            api.defaults.headers.Authorization = `Bearer ${token}` 
            setAuthenticated(true);  
        }

        setLoading(false)
    }, []);

    if (loading){
        return <h1>Carregando...</h1>
    }
    
    const handleLogin = async (e) => {
        try{
        e.preventDefault();
        const response = await createSession(email, password)

        localStorage.setItem('token', response.data.token)

        setUser(response.data) 
        localStorage.setItem('user', JSON.stringify(response.data))
        
        api.defaults.headers.Authorization = `Bearer ${response.data.token}` 
        
        setAuthenticated(true);

        navigate('/')

        }catch(error){
            console.log(error.status)
            toast({
            title: 'Email ou senha não conferem',
            description: 'Certifique que esteja digitando as credenciais corretas ou se preferir, peça um reset de senha',
            status: 'error',
            duration: 9000,
            isClosable: true,
            });
        }
        
      }
    
    const logout = () => {
        setAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        api.defaults.headers.Autorization = undefined;
        setUser(null);

        navigate('/login');
    }

    return (
        <AuthContext.Provider
        value = {{
            authenticated,
            handleLogin,
            setPassword,
            setEmail,
            user,
            logout,
            loading,
        }}
        >
            {children}
        </AuthContext.Provider>

    );
};
