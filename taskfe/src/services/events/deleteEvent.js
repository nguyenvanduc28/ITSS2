import axios from 'axios';
const request = axios.create({
    baseURL: 'https://itss2-be-5617.onrender.com',
});

export const deleteEvent = async (event) => {
    try {
        const res = await request.delete(`/event/${event.id}`)
        return res.data

    } catch (error) {
        console.log('deleteEvent ' + error)
    }
}