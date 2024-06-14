import axios from 'axios';
import moment from 'moment';

const request = axios.create({
    baseURL: 'https://itss2-be-5617.onrender.com',
});

const startToday = moment().startOf('day').valueOf();
const endToday = moment().endOf('day').valueOf();
const data = {
    startDate: startToday,
    endDate: endToday
}
export const getEventsToday = async () => {
    try {
        const res = await request.post('/event/list', data)
        return res.data

    } catch (error) {
        console.log('getListEvent ' + error)
    }
}

export const countEventsToday = async () => {
    try {
        const res = await request.post('/event/count', data)
        return res.data

    } catch (error) {
        console.log('countListEvent ' + error)
    }
}