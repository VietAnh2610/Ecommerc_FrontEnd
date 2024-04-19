import React, { useState } from 'react';

import "./SingInPage.css";
import { Link } from 'react-router-dom';

const SingUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div style={{marginTop:110}} className="singin">
      <div className="styles__Root-sc-2hr4xa-0 jyAQAr">
        <button className="btn-close">
          <img
            className="close-img"
            src="https://salt.tikicdn.com/ts/upload/fe/20/d7/6d7764292a847adcffa7251141eb4730.png"
            alt="icon"
          />
        </button>

        <div className="styles__Left-sc-2hr4xa-1 iwneWf">
          <div className="Back_singUp"><Link to='/singup'><i className="fa-solid fa-chevron-left"></i></Link></div>
          <div className="heading">
            <h4>Đăng nhập bằng email</h4>
            <p>Nhập email và mật khẩu tài khoản eiser</p>
          </div>
          <form>
            <div className="input_login">
              <input type="email" name='email' placeholder="abc@gmail.com" />
            </div>
            <div className="input_login">
              <input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" />
              <span className="show-btn" onClick={togglePasswordVisibility}>
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </div>
            <div className="input_login">
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu" />
              <span className="show-btn" onClick={toggleConfirmPasswordVisibility}>
                <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </div>
            <button className="button_continue">Đăng Nhập</button>
          </form>
          <p className="Forgot_password">Quên mật khẩu</p>
          <div className='singUp_footer'>
            <p>Bạn chưa có tài khoản?</p>
            <Link to='/singup'><span>Tạo tài khoản</span></Link>
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
  );
};

export default SingUpPage;
