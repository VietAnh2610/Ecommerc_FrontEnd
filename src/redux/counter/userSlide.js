import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  nickname: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  access_token: "",
  gender: "",
  dob: "", // Thêm trường ngày tháng năm sinh
  id: "",
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        name = "",
        nickname = "",
        email = "",
        access_token = "",
        phone = "",
        address = "",
        avatar = "",
        gender = "",
        dob = "", // Thêm trường ngày tháng năm sinh
        _id = "",
        isAdmin,
      } = action.payload;
      state.name = name;
      state.nickname = nickname;
      state.email = email;
      state.phone = phone;
      state.gender = gender;
      state.address = address;
      state.id = _id;
      state.avatar = avatar;
      state.dob = dob; // Cập nhật giá trị ngày tháng năm sinh
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      state.name = "";
      state.nickname = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.gender = "";
      state.avatar = "";
      state.dob = ""; // Đặt lại giá trị ngày tháng năm sinh
      state.id = "";
      state.access_token = "";
      state.isAdmin = false;
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
