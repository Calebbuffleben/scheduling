import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginComponent from "../../components/Login/LoginComponent";

import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleFields = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        
        await auth.handleLogin(email, password);

        if(auth.isAuthenticated) {
            navigate('/dashboard');
        }
    }

    return (
        <LoginComponent 
            onChangeValues={handleFields} 
            handleLogin={handleLogin} 
            email={email} 
            password={password} 
        />
    );
}

export default Login;