import request from '../../utils/httpRequest';

export const signup = async ({ email, password }) => {
    try {
        const res = await request.post('auth/register', { email, password });

        return res.data;
    } catch (err) {
        // console.log(err);
        return err.response.data
    }
};
