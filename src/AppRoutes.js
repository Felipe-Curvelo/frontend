import React, {useContext} from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Home from "./main_page/Home"
import LoginPage from './login_page/LoginPage';
import ForgotPasswordSend from "./login_page/ForgotPasswordSend";
import Subscribe from "./login_page/Subscribe";
import TransactionsTable from "./main_page/TransactionsTable";
import { AuthProvider, AuthContext } from './contexts/auth';


const AppRoutes = () => {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);
        
     
        if(loading){
            return <div className='loading'>Carregando...</div>
        }
    
        if (!authenticated){
            return <Navigate to="/login" />
        }
    
        return children
    }
    
    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path ="/login" element={<LoginPage />} />
                    <Route exact path ="/forgotpassword" element={<ForgotPasswordSend />} />
                    <Route exact path ="/signup" element={<Subscribe />} />
                    <Route exact path ="/" element={<Private><Home /></Private>} />
                    <Route exact path ="/transactions" element={<Private><TransactionsTable /></Private>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default AppRoutes