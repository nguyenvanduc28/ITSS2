import axios from 'axios';
import { createAuthHeader } from '../../utils/createAuthHeader';
import moment from 'moment';

const request = axios.create({
    baseURL: 'http://localhost:8080',
});

const startToday = moment().startOf('day').valueOf();
const endToday = moment().endOf('day').valueOf();
const data = {
    startDate: startToday,
    endDate: endToday
}
export const getEventsToday = async (token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.post('/event/list', data,
            {
                headers
            })
        return res.data

    } catch (error) {
        console.log('getListEvent ' + error)
    }
}

export const countEventsToday = async (token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.post('/event/count', data,
            {
                headers
            })
        return res.data

    } catch (error) {
        console.log('countListEvent ' + error)
    }
}