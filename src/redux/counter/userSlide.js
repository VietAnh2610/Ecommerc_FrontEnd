import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  nickname: '',
  email: '',
  phone:'',
  address:'',
  avatar:'',
  access_token: '',
  id:''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name ='',nickname = '',  email ='', access_token ='', phone ='', address ='', avatar ='', _id='' } = action.payload;
      state.name = name ;
      state.nickname = nickname ;

      state.email = email;
      state.phone = phone;
      state.address = address;
      state.id = _id;
      state.avatar = avatar;

      state.access_token = access_token;
    },
    resetUser: (state) => {
      state.name = '';
      state.nickname = '' ;

      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.id = '';

      state.access_token = '';
      
    }
  }
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
