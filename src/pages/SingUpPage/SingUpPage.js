import React from "react";
import "./SingUpPage.scss";
import {Link} from 'react-router-dom'
const SingInPage = () => {
  return (
    <div style={{marginTop:110}} className="singup">
      <div class="styles__Root-sc-2hr4xa-0 jyAQAr">
        <button class="btn-close">
          <img
            class="close-img"
            src="https://salt.tikicdn.com/ts/upload/fe/20/d7/6d7764292a847adcffa7251141eb4730.png"
            alt="icon"
          />
        </button>
        <div class="styles__Left-sc-2hr4xa-1 iwneWf">
          <div class="styles__StyledLoginWithPhone-sc-si1ros-0 jdahxv">
            <div class="heading">
              <h4>Xin chào,</h4>
              <p>Đăng nhập hoặc Tạo tài khoản</p>
            </div>
            <form>
              <div class="input ">
                <input type="tel" placeholder="Số điện thoại"></input>
              </div>
              <button className="button_continue">Tiếp Tục</button>
            </form>
            <Link    style={{ textDecoration: 'none' }} to='/singin'><p class="login-with-email">Đăng nhập bằng email</p></Link>
            <div class="styles__StyledSocial-sc-si1ros-1 ghIlRk">
              <p class="social-heading">
                <span>Hoặc tiếp tục bằng</span>
              </p>
              <ul class="social__items">
                <li class="social__item">
                  <img
                    src="https://salt.tikicdn.com/ts/upload/3a/22/45/0f04dc6e4ed55fa62dcb305fd337db6c.png"
                    alt="facebook"
                  />
                </li>
                <li class="social__item">
                  <img
                    src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png"
                    alt="google"
                  />
                </li>
              </ul>
              <p class="note">
                Bằng việc tiếp tục, bạn đã đọc và đồng ý với{" "}
                <a href="https://hotro.tiki.vn/s/article/dieu-khoan-su-dung">
                  điều khoản sử dụng
                </a>{" "}
                và{" "}
                <a href="https://tiki.vn/bao-mat-thong-tin-ca-nhan">
                  Chính sách bảo mật thông tin cá nhân
                </a>{" "}
                của eiser
              </p>
            </div>
          </div>
        </div>
        <div class="styles__Right-sc-2hr4xa-2 cxqVZX">
          <img
            src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
            width="203"
          />
          <div class="content">
            <h4>Mua sắm tại eiser</h4>
            <span>Siêu ưu đãi mỗi ngày</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingInPage;
