import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import FooterComponent from "../../components/FooterComponent/FooterComponent";
import "./SingInPage.scss";
import * as UserService from "../../services/UserService";
import { UseMutationHooks } from "../../hooks/UseMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
  import { updateUser } from "../../redux/counter/userSlide";
const SingUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsDisabled(!e.target.value || !password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsDisabled(!email || !e.target.value);
  };

  const mutation = UseMutationHooks((data) => UserService.loginUser(data));
  const { data } = mutation;

  useEffect(() => {
    if (data && data.status === "OK") {
     
      localStorage.setItem("access_token", JSON.stringify(data.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
       
        if (decoded && decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
          setIsLoggedIn(true);

        }
      }
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setIsLoading(true);
    try {
      const response = await mutation.mutateAsync({
        email,
        password,
      });
    
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message.includes("email")) {
          setEmailError(message);
          
        } else if (message.includes("password")) {
          setPasswordError(message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      {isLoading && <LoadingComponent />}
      <div style={{ marginTop: 110 }} className="singin">
        <div className="styles__Root-sc-2hr4xa-0 jyAQAr">
          <div className="styles__Left-sc-2hr4xa-1 iwneWf">
            <div className="Back_singUp">
              <Link to="/singup">
                <i className="fa-solid fa-chevron-left"></i>
              </Link>
            </div>
            <div className="heading">
              <h4>Đăng nhập bằng email</h4>
              <p>Nhập email và mật khẩu tài khoản eiser</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input_login">
                <input
                  type="email"
                  name="email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                />
                <p className="error-message">{emailError}</p>
              </div>
              <div className="input_login">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <p className="error-message">{passwordError}</p>
                <span className="show-btn" onClick={togglePasswordVisibility}>
                  <i
                    className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                  ></i>
                </span>
              </div>
              <div className="err-login" style={{ marginTop: 5 }}></div>
              <div className="err-login" style={{ marginTop: 5 }}>
                {data?.status === "ERR" && (
                  <span style={{ paddingTop: 10, color: "red" }}>
                    {data?.message}
                  </span>
                )}
              </div>
              <button
                className="button_continue"
                type="submit"
                disabled={isDisabled}
              >
                {" "}
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>

            <p className="Forgot_password">Quên mật khẩu</p>
            <div className="singUp_footer">
              <p>Bạn chưa có tài khoản?</p>
              <Link to="/singup">
                <span>Tạo tài khoản</span>
              </Link>
            </div>
          </div>
          <div className="styles__Right-sc-2hr4xa-2 cxqVZX">
            <img
              src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
              width="203"
              alt="eiser"
            />
            <div className="content">
              <h4>Mua sắm tại eiser</h4>
              <span>Siêu ưu đãi mỗi ngày</span>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default SingUpPage;
