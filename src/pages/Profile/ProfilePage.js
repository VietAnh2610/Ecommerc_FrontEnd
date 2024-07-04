import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.scss";
import { useDispatch, useSelector } from "react-redux";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import * as UserService from "../../services/UserService";
import { UseMutationHooks } from "../../hooks/UseMutationHook";
import { updateUser } from "../../redux/counter/userSlide";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { getBase64 } from "../../utils";
import { toast } from "react-toastify";
const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const [nickname, setNickName] = useState(user?.nickname || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const dispatch = useDispatch();
  const mutation = UseMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    setIsLoading(true);
    UserService.updateUser(id, rests, access_token)
      .then(() => {
        handleGetDetailsUser(user?.id, user?.access_token);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi cập nhật người dùng:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy thông tin người dùng:", error);
    }
  };
  const handlOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlOnchangeName = (e) => {
    setName(e.target.value);
  };

  const handlOnchangeNickName = (e) => {
    setNickName(e.target.value);
  };

  const handlOnchangePhone = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  const handlOnchangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setSelectedAvatar(file);
  };
  console.log("phon", phone.length);
  const handleUpdate = async () => {
    // if (phone.length !== 10) {

    //   toast.error("Số điện thoại phải có đúng 10 chữ số.");
    //   return;
    // }
    setIsLoading(true);

    const avatarBase64 = selectedAvatar
      ? await getBase64(selectedAvatar)
      : null;

    const userData = {
      id: user?.id,
      email,
      name,
      nickname,
      phone,
      address,
      avatar: avatarBase64 || user?.avatar,
      access_token: user?.access_token,
    };

    try {
      await UserService.updateUser(
        userData.id,
        userData,
        userData.access_token
      );
      await handleGetDetailsUser(user?.id, user?.access_token);
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật người dùng:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <LoadingComponent />}

      <div className="menu-top d-flex align-items-center ">
        <div className="container px-5">
          <div class="banner_content d-md-flex justify-content-between align-items-center">
            <div class="mb-3 mb-md-0">
              <h2 style={{ fontSize: 27 }}>Thông tin tài khoản</h2>
              <p>Xem và cập nhật thông tin của bạn tại đây</p>
            </div>
            <div class="page_link">
              <Link className="link" to="/" style={{ textDecoration: "none" }}>
                Trang chủ
              </Link>
              <Link className="link" style={{ textDecoration: "none" }}>
                Xem hồ sơ
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-account">
        <div className="container px-5 py-3 ">
          <div className="row ">
            <div className="col-lg-3 profile-menu ">
              <div className="profile-menu-avata d-flex align-items-center">
                <img src="https://salt.tikicdn.com/desktop/img/avatar.png" />
                <div className="info d-flex flex-column">
                  Tài khoản của<strong>{name}</strong>
                </div>
              </div>
              <ul className="profile-menu-list">
                <li>
                  <i class="fa-regular fa-user"></i>Thông tin tài khoản
                </li>
                <li>
                  <i class="fa-solid fa-cart-shopping"></i>Quản lý đơn hàng
                </li>
                <li>
                  <i class="fa-solid fa-location-dot"></i>Sổ địa chỉ
                </li>
                <li>
                  <i class="fa-solid fa-heart"></i>Sản phẩm yêu thích
                </li>
                <li>
                  <img src="https://frontend.tikicdn.com/_desktop-next/static/img/mycoupon/coupon_code.svg" />
                  Mã giảm giá
                </li>
                <li>
                  <i class="fa-brands fa-bitcoin"></i>Quản lý xu của tôi
                </li>
                <li>
                  <i class="fa-solid fa-headset"></i>Hỗ trợ khách hàng
                </li>
              </ul>
            </div>
            <div className="col-lg-9 profile-account  ">
              <div className="row profile-account">
                <div style={{ fontSize: 20 }}>Thông tin tài khoản</div>
                <div style={{ marginTop: 27 }} className="d-flex">
                  <div className="col-lg-7 profile-account-left ">
                    <span class="info-title">Thông tin cá nhân</span>
                    <div style={{ marginTop: 15, marginBottom: -20 }}>
                      <from>
                        <div className="from-info d-flex justify-content-between">
                          <div class="form-avatar">
                            <div class="styles__StyleAvatar-sc-7twymm-0 iRBxWb">
                              <div>
                                <div
                                  className="avatar-view"
                                  style={{ overflow: "hidden" }}
                                >
                                  {selectedAvatar ? (
                                    <img
                                      style={{
                                        width: 110,
                                        height: 110,
                                        borderRadius: "50%",
                                      }}
                                      src={URL.createObjectURL(selectedAvatar)}
                                      alt="Avatar"
                                    />
                                  ) : avatar ? (
                                    <img
                                      style={{
                                        width: 110,
                                        height: 110,
                                        borderRadius: "50%",
                                      }}
                                      src={avatar}
                                      alt="Avatar"
                                    />
                                  ) : (
                                    <img
                                      style={{
                                        width: 60,
                                        height: 60,
                                      }}
                                      src="https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-name">
                            <div className="form-controls">
                              <label className="input-label">
                                Họ &amp; Tên
                              </label>

                              <div className="styles__StyledInput-sc-s5c7xj-5 hisWEc">
                                <input
                                  className="input "
                                  type="search"
                                  name="fullName"
                                  maxlength="128"
                                  placeholder="Thêm họ tên"
                                  value={name}
                                  onChange={handlOnchangeName}
                                />
                              </div>
                            </div>
                            <div className="form-controls">
                              <label class="input-label">Nickname</label>
                              <div>
                                <input
                                  class="input "
                                  name="userName"
                                  maxlength="128"
                                  placeholder="Thêm nickname"
                                  type="search"
                                  value={nickname}
                                  onChange={handlOnchangeNickName}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </from>
                    </div>
                    <label htmlFor="avatarInput" className="file-label">
                      <p> Tải lên ảnh</p>
                      <input
                        id="avatarInput"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden-input"
                      />
                    </label>
                    <div class="form-control1">
                      <label class="input-label">Giới tính</label>
                      <form>
                        <input
                          className="ss"
                          name="gender"
                          type="radio"
                          value="Nam"
                        />
                        <span
                          style={{ marginRight: 20 }}
                          className="option-gender"
                        >
                          Nam
                        </span>
                        <input
                          className="ss"
                          name="gender"
                          type="radio"
                          value="Nữ"
                        />
                        <span
                          style={{ marginRight: 20 }}
                          className="option-gender"
                        >
                          Nữ
                        </span>
                        <input
                          className="ss"
                          name="gender"
                          type="radio"
                          value="Khác"
                        />
                        <span
                          style={{ marginRight: 20 }}
                          className="option-gender"
                        >
                          Khác
                        </span>
                      </form>
                    </div>
                    <div className="button-accout">
                      {" "}
                      <button onClick={handleUpdate} disabled={isLoading}>
                        {isLoading ? "Đang cập nhật..." : "Cập nhật"}
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-5 profile-account-right">
                    <span class="info-title">Số điện thoại và email</span>
                    <div className="account-right-top">
                      <div className="account-right-top-SDT d-flex">
                        <div className="account-right-top-SDT-info">
                          <i class="fa-solid fa-phone"></i>
                          <div className="info-account ">
                            <label>Số điện thoại</label>
                            <input
                              type="search"
                              placeholder="Cập nhật SDT"
                              value={phone}
                              maxLength="10"
                              onChange={handlOnchangePhone}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="account-right-top-SDT d-flex">
                        <div className="account-right-top-SDT-info">
                          <i class="fa-solid fa-envelope"></i>
                          <div className="info-account">
                            <label>Email</label>
                            <input
                              onChange={handlOnchangeEmail}
                              value={email}
                              style={{ width: 230 }}
                              type="search"
                              placeholder="Cập nhật Email"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span class="info-title">Địa chỉ</span>
                    <div
                      style={{ border: "none" }}
                      className="account-right-top-SDT d-flex"
                    >
                      <div className="account-right-top-SDT-info">
                        <i class="fa-solid fa-location-dot"></i>
                        <div className="info-account">
                          <label>Số địa chỉ</label>
                          <input
                            style={{ width: 230 }}
                            type="search"
                            placeholder="Cập nhật địa chỉ"
                            value={address}
                            onChange={handlOnchangeAddress}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
