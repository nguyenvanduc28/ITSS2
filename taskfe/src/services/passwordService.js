import axios from 'axios';
import { createAuthHeader } from '../utils/createAuthHeader';
const request = axios.create({
    baseURL: 'http://localhost:8080',
});

export const sendEmail = async (data) => {
    try {
        const res = await request.post('/password/send-email', data)
        return res.data
    } catch (error) {
        console.log('sendEmail ' + error)
    }
}

export const sendOtp = async (data) => {
    try {
        const res = await request.post('/password/send-otp', data)
        return res.data
    } catch (error) {
        console.log('sendOtp ' + error)
    }
}
export const changePass = async (data) => {
    try {
        const res = await request.post('/password/change', data)
        return res.data
    } catch (error) {
        console.log('changePass ' + error)
    }
}