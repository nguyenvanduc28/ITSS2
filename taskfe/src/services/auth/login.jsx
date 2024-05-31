import request from '../../utils/httpRequest';

export const login = async ({ email, password }) => {
    try {
        const res = await request.post('auth/login', { email, password });

        return res.data;
    } catch (err) {
        return err.response.data;
    }
};
