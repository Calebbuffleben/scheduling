import api from '../api';

export const login = async (email: string, password: string) => {
    try {
        console.log("Chega aqui")
        const response = await api.post('/login', { email, password });

        localStorage.setItem("accessToken", response.data.access_token);
        
        return response;
    } catch (error) {
        console.error('Login failed:', error);
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
};
