import React from "react";
import "./HeaderComponent.scss";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'; // Import useLocation từ react-router-dom

const HeaderComponent = () => {
  const location = useLocation();
  return (
   <header>

      <div className="top-menu">
        <div className="container">
          <div className="row ">
            <div className="col-lg-7 ">
              <div className="top-menu-left  d-flex  align-items-center">
                <p>Điện thoại: 0849193858 </p> 
                <p style={{borderRight:'none'}}>email: quang1602@gmail.com</p>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="float-right">
                <ul className="right_side d-flex">
                  <li>
                    <a href="/singin">Đăng nhập</a>
                  </li> 
                  <li >
                    <a href="/singup">Đăng ký</a> 
                  </li>
                  <li>
                    <a style={{borderRight:'none'}}>VI</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container header ">
        <nav className="navbar navbar-expand-lg navbar-light  py-3">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand" href="#">
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
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center">
      <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <Link to="/" className="nav-link">
          TRANG CHỦ
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === '/products' ? 'active' : ''}`}>
        <Link to="/products" className="nav-link">
          CỬA HÀNG
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <Link to="" className="nav-link">
          TIN TỨC
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
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
                  <Link to="singin">
                    <i className="fas fa-user"></i>
                  </Link>
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
