import  axios  from 'axios';
import { axiosJWT } from './UserService';
export const createOrder = async (data, access_token) => {
    console.log('access_token',{data, access_token})
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_KEY}/order/create`, data, { 
        headers: {
            token: `Bearer ${access_token}`,
        }
    },)
    return res.data

};

export const getDetailsOrder = async (id,access_token) => {
    try {
            const res = await axiosJWT.get(`${process.env.REACT_APP_API_KEY}/order/user/${id}`, {
                headers: {
                    token: `Bearer ${access_token}`,
                }
            },)
        return res.data;
    } catch (error) {
        console.error('Error ', error);
        throw error;
    }
};