import api from '../api';

export const registerCompany = async (data: any) =>{
    await api.post('', data);
}