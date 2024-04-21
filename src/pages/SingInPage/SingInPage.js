import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import "./SingInPage.scss";
import * as UserService from "../../services/UserService";
import { UseMutationHooks } from "../../hooks/UseMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
const SingUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Thêm state cho loading
  const [isDisabled, setIsDisabled] = useState(true); // Thêm biến trạng thái để kiểm tra nút Đăng Nhập có được kích hoạt hay không

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Xóa các lỗi trước khi gửi yêu cầu
    setEmailError("");
    setPasswordError("");

    // Gửi yêu cầu đăng nhập
    setIsLoading(true);
    try {
      await mutation.mutateAsync({
        email,
        password,
      });
      // Xử lý khi đăng nhập thành công (ví dụ: chuyển hướng)
    } catch (error) {
      // Xử lý lỗi khi đăng nhập không thành công
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

  const mutation = UseMutationHooks((data) => UserService.loginUser(data));
  const { data } = mutation;
console.log(data)

  return (
    <div>
       {isLoading && <div className="overlay"></div>}
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
              <div className="err-login" style={{ marginTop: 5 }}>
               
              </div>
              {isLoading && <LoadingComponent />}
              <div className="err-login" style={{marginTop:5}}>
                {data?.status === "ERR" && (
                  <span style={{ paddingTop: 10, color: "red" }}>
                    {data?.message}
                  </span>
                )}
            </div>
            <button className="button_continue" type="submit" disabled={isDisabled}>
          đăng nhập
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
