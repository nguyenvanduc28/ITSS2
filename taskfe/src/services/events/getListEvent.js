import axios from 'axios';

const request = axios.create({
    baseURL: 'https://itss2-be-5617.onrender.com',
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

export const getListEventPriority = async () => {
    try {
        const res = await request.get('/event/priority')
        console.log('priority',res.data);
        return res.data

    } catch (error) {
        console.log('getListEventPriority ' + error)
    }
}

export const getListEventNoti = async () => {
    try {
        const res = await request.get('/event/noti')
        console.log('noti',res.data);
        return res.data

    } catch (error) {
        console.log('getListEventNoti ' + error)
    }
}