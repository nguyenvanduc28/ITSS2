import axios from 'axios';

const request = axios.create({
    baseURL: 'https://itss2-be-5617.onrender.com',
});

export const get = async (path, option = {}) => {
    const response = await request.get(path, option);
    return response.data;
};

export const post = async (path, option = {}) => {
    const response = await request.post(path, option);
    return response.data;
};

export default request;
