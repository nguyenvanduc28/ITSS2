import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080',
});

export const getListEvents = async (data) => {
    try {
        const res = await request.post('/event/list', data)
            console.log(res.data);
        return res.data

    } catch (error) {
        console.log('getListEvent ' + error)
    }
}