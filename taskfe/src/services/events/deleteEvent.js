import axios from 'axios';
import { createAuthHeader } from '../../utils/createAuthHeader';
const request = axios.create({
    baseURL: 'http://localhost:8080',
});

export const deleteEvent = async (event, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.delete(`/event/${event.id}`,
            {
                headers: headers
            })
        return res.data

    } catch (error) {
        console.log('deleteEvent ' + error)
    }
}