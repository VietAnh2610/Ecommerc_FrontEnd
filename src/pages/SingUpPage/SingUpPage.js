import React, { useState, useEffect } from "react";
import "./SingUpPage.scss";
import { useNavigate } from "react-router-dom";
import { UseMutationHooks } from "../../hooks/UseMutationHook";
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";
import "react-toastify/dist/ReactToastify.css";

const SingUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isFormValid = name && phone && email && password && confirmPassword;
    setIsFormValid(isFormValid);
  }, [name, phone, email, password, confirmPassword]);

  const handleOnChangeName = (event) => {
    setName(event.target.value);
  };
  const handleOnChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleOnChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const mutation = UseMutationHooks((data) => UserService.singupUser(data));
  const { data } = mutation;
  useEffect(() => {
    if (data && data.status === "OK") {
      message.success();
      navigate("/singin");
    }
  });

  const handleSignUp = () => {
    if (isFormValid) {
      mutation.mutate({
        name,
        phone,
        email,
        password,
        confirmPassword,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container px-5">
      <div className="signup_header">
        <span
          className="link-homepage"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Trang chủ
        </span>
        <p>/</p>
        <p style={{ color: "rgb(191, 191, 191)" }}>Đăng ký</p>
      </div>

      <div className="heading-bar text-center py-5">
        <h1 style={{ fontSize: "25px" }}>ĐĂNG KÝ TÀI KHOẢN</h1>
        <p>
          Bạn đã có tài khoản? Đăng nhập
          <span
            className="link-signin px-2"
            onClick={() => navigate("/singin")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            tại đây
          </span>
        </p>
      </div>

      <div className="formSignup">
        <div className="text-center">
          <h1>THÔNG TIN CÁ NHÂN</h1>
        </div>
        <form>
          <div className="form-Signup-Input">
            <label>
              Họ và tên<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={handleOnChangeName}
            ></input>
          </div>
          <div className="form-Signup-Input">
            <label>
              Số điện thoại<span>*</span>
            </label>
            <input
              type="number"
              placeholder="Số điện thoại"
              value={phone}
              onChange={handleOnChangePhone}
            ></input>
          </div>
          <div className="form-Signup-Input">
            <label>
              Email<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleOnChangeEmail}
            ></input>
          </div>
          <div className="form-Signup-Input">
            <label>
              Mật khẩu<span>*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                className="password-input"
                value={password}
                onChange={handleOnChangePassword}
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
          <div className="form-Signup-Input">
            <label>
              Nhập lại mật khẩu<span>*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                className="password-input"
                value={confirmPassword}
                onChange={handleOnChangeConfirmPassword}
              />
              <i
                className={`fa-solid ${
                  showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={toggleConfirmPasswordVisibility}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        </form>
        {data?.status === "ERR" && (
          <span style={{ color: "red", fontSize: "14px" }}>
            {data?.message}
          </span>
        )}
        <div className="button-signup">
          <p
            className="text-center py-3"
            onClick={isFormValid ? handleSignUp : null}
            style={{
              cursor: isFormValid ? "pointer" : "not-allowed",
              backgroundColor: isFormValid ? "black" : "gray",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Đăng ký
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingUpPage;
