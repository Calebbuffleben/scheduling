import api from '../api';

export default {
    async get() {
        const { data } = await api.get('/users');

        return data;
    }
}