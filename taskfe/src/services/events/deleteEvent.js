import axios from 'axios';
const request = axios.create({
    baseURL: 'http://localhost:8080',
});

export const deleteEvent = async (event) => {
    try {
        const res = await request.delete(`/event/${event.id}`)
        return res.data

    } catch (error) {
        console.log('deleteEvent ' + error)
    }
}