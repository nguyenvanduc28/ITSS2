import axios from 'axios';
import { createAuthHeader } from '../../utils/createAuthHeader';

const request = axios.create({
    baseURL: 'http://localhost:8080',
});

export const getListEvents = async (data, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.post('/event/list', data,
            {
                headers
            })
            console.log(res.data);
        return res.data

    } catch (error) {
        console.log('getListEvent ' + error)
    }
}