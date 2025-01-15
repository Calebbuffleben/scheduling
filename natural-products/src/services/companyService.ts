import api from '../api';

export const registerCompany = async (data: any) =>{
    const response = await api.post('/companies', data);

    return response;
}