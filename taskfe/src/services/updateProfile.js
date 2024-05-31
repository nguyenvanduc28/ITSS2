import axios from 'axios';
import { createAuthHeader } from '../utils/createAuthHeader';
const request = axios.create({
    baseURL: 'http://localhost:8080',
});

export const updateProfile = async (data, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.put('/auth/update', data,
            {
                headers
            })
        return res.data

    } catch (error) {
        console.log('updateProfile ' + error)
    }
}