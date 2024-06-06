import  axios  from 'axios';
import { axiosJWT } from './UserService';

// router.post('/create', PostController.createPost)
// router.put('/update/:id', PostController.updatePost)
// router.delete('/delete/:id',  PostController.deletePost)
// router.get('/getAll', PostController.getAllPosts)
// router.get('/get-details/:id', PostController.getPostById)

export const getAllPosts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/post/getAll`) 
    return res.data;
};

export const createPost = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/post/create`, data) 
    return res.data;
};

export const getPostById = async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_KEY}/post/get-details/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Error fetching post details for id ${id}:`, error);
      throw error; 
    }
  };



export const updatePost = async (id, data, access_token) => {
    const res = await axios.put(`${process.env.REACT_APP_API_KEY}/post/update/${id}`, data, { 
    
        headers: {
            token: `Bearer ${access_token}`,
        }
    },)

};


export const deletePost = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_KEY}/post/delete/${id}`, { 
    
        headers: {
            token: `Bearer ${access_token}`,
        }
    },)

};


