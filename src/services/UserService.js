import axios from 'axios';

export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/singin`, data);
        return res.data;
    } catch (error) {
        console.error('Error occurred while logging in:', error);
        throw error;
    }
};

export const singupUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/singup`, data);
        return res.data;
    } catch (error) {
        console.error('Error ', error);
        throw error;
    }
};
