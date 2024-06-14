import axios from 'axios';
const request = axios.create({
    baseURL: 'https://itss2-be-5617.onrender.com',
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