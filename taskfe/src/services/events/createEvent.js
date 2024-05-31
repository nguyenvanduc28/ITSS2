import axios from 'axios';
import { createAuthHeader } from '../../utils/createAuthHeader';
const request = axios.create({
    baseURL: 'http://localhost:8080',
});

export const createEvent = async (data, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.post('/event', data,
            {
                headers
            })
        return res.data

    } catch (error) {
        console.log('createEvent ' + error)
    }
}

export const updateEvent = async (data, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.post('/event', data,
            {
                headers
            })
        return res.data

    } catch (error) {
        console.log('createEvent ' + error)
    }
}