import axios from 'axios';
const request = axios.create({
    baseURL: 'http://localhost:8080',
});

export const createEvent = async (data) => {
    try {
        const res = await request.post('/event', data)
        return res.data

    } catch (error) {
        console.log('createEvent ' + error)
    }
}

export const updateEvent = async (data) => {
    try {
        const res = await request.post('/event', data)
        return res.data

    } catch (error) {
        console.log('createEvent ' + error)
    }
}