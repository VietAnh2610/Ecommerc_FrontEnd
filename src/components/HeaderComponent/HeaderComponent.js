import React, { useEffect, useState } from "react";
import "./HeaderComponent.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Import useLocation từ react-router-dom
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { resetUser } from "../../redux/counter/userSlide";
const HeaderComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [userName, setUserName] = useState('')
  const user = useSelector((state) => state.user);
  console.log('user', user)
const handleLogout = async() => {
  await UserService.logoutUser()
  dispatch(resetUser())
}
useEffect(() => {
  if (user && user.name) {
    setUserName(user?.name); 
  }
}, [user?.name]);
  return (
    <header className="">
      <div className="top-menu">
        <div className="container px-5">
          <div className="row ">
            <div className="col-lg-7 ">
              <div className="top-menu-left  d-flex  align-items-center">
                <p>Điện thoại: 0987654321 </p>
                <p style={{ borderRight: "none" }}>email: eiser@gmail.com</p>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="float-right">
                {user?.access_token ? (
                  <div className="user_login">
                    <ul className="user_login-item d-flex">
                      <li style={{paddingTop:7, paddingBottom: 7}} className="login"
                        
                      >
                        <span style={{ marginRight: 3 }}>Xin chào:</span>{" "}
                        {userName?.length ? userName: user?.email}
                      <div className="infomation-user">
                        <div className="infomation-user_list">
                          <ul className="infomation-user_list-item">
                            <li className="d-flex "><Link to='profile-user' className="profile"><i class="fa-regular fa-user"></i><span>Xem hồ sơ</span></Link></li>
                            <li><i class="fa-regular fa-money-bill-1"></i><span>Đơn hàng</span></li>
                            <li><i class="fa-regular fa-bookmark"></i><span>Yêu thích</span></li>
                            <li><i class="fa-regular fa-moon"></i><span>Chế độ tối</span></li>
                            <li><i class="fa-solid fa-gear"></i><span>Cài đặt</span></li>
                            <li onClick={handleLogout}>  <i class="fa-solid fa-arrow-right-from-bracket"></i><span>Đăng xuất</span></li>
                          </ul>
                        </div>
                      </div>
                      </li>
                      <li>
                        <a>VI</a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <ul className="right_side d-flex">
                    <li>
                      <Link to="/singin">Đăng nhập</Link>
                    </li>
                    <li>
                      <Link to="/singup">Đăng ký</Link>
                    </li>
                    <li>
                      <a style={{ borderRight: "none" }}>VI</a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container header px-5 ">
        <nav className="navbar navbar-expand-lg navbar-light  py-3">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand" href="">
              <img src="https://themewagon.github.io/eiser/img/logo.png"></img>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center">
                <li
                  className={`nav-item li1 ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <Link to="/" className="nav-link">
                    TRANG CHỦ
                  </Link>
                </li>

                <li
                  className={`nav-item ${
                    location.pathname === "/products" ? "active" : ""
                  }`}
                >
                  <Link to="/products" className="nav-link">
                    CỬA HÀNG
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <Link to="/Blog" className="nav-link">
                    TIN TỨC
                  </Link>
                </li>
                <li
                  className={`nav-item ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <Link to="" className="nav-link">
                    GIỚI THIỆU
                  </Link>
                </li>
              </ul>
              <form className="d-flex input">
                <button
                  style={{ marginRight: -13 }}
                  className="btn btn-search "
                  type="submit"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>

                <div className="header-right">
                  <i className="fa-solid fa-cart-shopping"></i>

                  <i className="fa-regular fa-heart"></i>
                </div>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
