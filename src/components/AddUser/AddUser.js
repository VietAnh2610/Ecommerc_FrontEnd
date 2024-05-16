import React, { useState } from "react";
import "./AddUser.scss";
import { getBase64 } from "../../utils";
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { toast } from "react-toastify";
import * as UserService from '../../services/UserService'

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userState, setUserState] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",
    confirmPassword:""
  });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedAvatar(file);
    } else {
      console.error(`File '${file?.name}' không phải là hình ảnh hợp lệ.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form fields
    const formErrors = {};
    if (!userState.email) formErrors.email = "Vui lòng nhập email.";
    if (!userState.password) formErrors.password = "Vui lòng nhập mật khẩu.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    let avatarBase64 = "";
    if (selectedAvatar) {
      avatarBase64 = await getBase64(selectedAvatar);
    }

    const updatedUserState = {
      ...userState,
      avatar: avatarBase64
    };

    try {
      const newUser = await UserService.singupUser(updatedUserState);
      
      // Thêm người dùng mới vào đầu danh sách
      setUserState({
        name: "",
        nickname: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: ""
      });
      setSelectedAvatar(null);
      setErrors({});
      toast.success('Thêm người dùng thành công');
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.message || 'Something went wrong'}`);
      } else {
        toast.error('Error: Unable to create user');
      }
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    setUserState({
      name: "",
      nickname: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      avatar: "",
      confirmPassword:""
    });
    setSelectedAvatar(null);
    setErrors({});
  };

  return (
    <div className="Add_user">
      <div className="Admin_user-title d-flex justify-content-between">
        <h5>Danh sách người dùng / Thêm người dùng</h5>
      </div>
      <div className="Admin_user_main py-2">
        <div
          style={{ borderBottom: "2px solid var(--text-color)" }}
          className="Admin_user_main-button-list d-flex px-1 pt-3"
        >
          <div className="align-items-center text-center py-1 px-2">
            <h5 style={{ fontWeight: 600 }}>Tạo mới người dùng</h5>
          </div>
        </div>

        <form className="row px-4 py-5" onSubmit={handleSubmit}>
          <div className="form-group col-md-6">
            <label className="control-label">Tên người dùng</label>
            <input
              className="form-control"
              type="text"
              value={userState.name}
              onChange={handleOnChange}
              name="name"
            />
            {errors.name && <p className="error-messages">{errors.name}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="control-label">Nickname</label>
            <input
              className="form-control"
              type="text"
              value={userState.nickname}
              onChange={handleOnChange}
              name="nickname"
            />
            {errors.nickname && <p className="error-messages">{errors.nickname}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="control-label">Email</label>
            <input
              className="form-control"
              type="email"
              value={userState.email}
              onChange={handleOnChange}
              name="email"
            />
            {errors.email && <p className="error-messages">{errors.email}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="control-label">Mật khẩu</label>
            <input
              className="form-control"
              type="password"
              value={userState.password}
              onChange={handleOnChange}
              name="password"
            />
            {errors.password && <p className="error-messages">{errors.password}</p>}
          </div>
          
       
          <div className="form-group col-md-6">
            <label className="control-label">Số điện thoại</label>
            <input
              className="form-control"
              type="text"
              value={userState.phone}
              onChange={handleOnChange}
              name="phone"
            />
            {errors.phone && <p className="error-messages">{errors.phone}</p>}
          </div>
          <div className="form-group col-md-6">
            <label className="control-label">Nhập lại Mật khẩu</label>
            <input
              className="form-control"
              type="password"
              value={userState.confirmPassword}
              onChange={handleOnChange}
              name="confirmPassword"
            />
            {errors.password && <p className="error-messages">{errors.password}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="control-label">Địa chỉ</label>
            <input
              className="form-control"
              type="text"
              value={userState.address}
              onChange={handleOnChange}
              name="address"
            />
            {errors.address && <p className="error-messages">{errors.address}</p>}
          </div>

          <div className="form-group col-md-12">
            <label className="control-label">Ảnh đại diện</label>
            <label htmlFor="avatarInput" className="file-label1">
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <p>Tải lên ảnh</p>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden-input"
                name="avatar"
              />
            </label>
            {selectedAvatar && (
              <div style={{ position: "relative", marginTop: 10 }}>
                <img
                  src={URL.createObjectURL(selectedAvatar)}
                  alt="Avatar"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setSelectedAvatar(null)}
                  style={{
                    position: "absolute",
                    top: -15,
                    right: 0,
                    background: "transparent",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    fontSize: 25,
                    padding: 3
                  }}
                >
                  &times;
                </button>
              </div>
            )}
          </div>

          <div className="form-group col-md-12">
            <button type="submit" className="button-submit">
              Lưu lại
            </button>
            <button
              style={{
                marginLeft: 10,
                backgroundColor: "rgb(255, 196, 196)",
                color: "rgb(191, 40, 40)"
              }}
              type="button"
              className="button-submit"
              onClick={handleCancel}
            >
              Hủy bỏ
            </button>
          </div>
        </form>
      </div>

      {isLoading && <LoadingComponent />}
    </div>
  );
};

export default AddUser;
