import React from "react";
import "./FooterComponent.scss";

const FooterComponent = () => {
  return (
    <div className="footer">
      <div className="container px-3 py-5">
        <div className="row">
          <div className="col-md-6 col-lg-3 col-sm-12">
            <div style={{marginBottom:" 15px"}}>
              <img src="https://theme.hstatic.net/200000696635/1001199686/14/logo-footer.png?v=8" />
            </div>
            <div className="footer-first-item d-flex">
              <i class="fa-solid fa-location-dot"></i>
              <p>Địa chỉ: Đại học Phenikaa, Hà Đông, Hà Nội</p>
            </div>
            <div className="footer-first-item d-flex">
              <i class="fa-solid fa-mobile-screen-button"></i>
              <p>Số điện thoại: 0123456789</p>
            </div>
            <div className="footer-first-item d-flex">
              <i class="fa-solid fa-envelope"></i>
              <p>Email: info.egamen@phenikaa.com</p>
            </div>
            <div className="footer-first-item d-flex">
              <i class="fa-solid fa-circle-info"></i>
              <p>
                Bản quyền thuộc về
                <span className="px-2" style={{ color: "black" }}>
                  EGAMEN
                </span>
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 col-sm-12 py-3">
            <div className="footer-second-item d-flex ">
              <h4>CHÍNH SÁCH</h4>
            </div>

            <div className="footer-second-item d-flex">
              <a href="">Giới thiệu</a>
            </div>

            <div className="footer-second-item d-flex">
              <a href="">Hệ thống cửa hàng</a>
            </div>

            <div className="footer-second-item d-flex">
              <a href="">Câu hỏi thường gặp</a>
            </div>

            <div className="footer-second-item d-flex">
              <a href="">Gọi điện đặt hàng</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 col-sm-12 py-3">
            <div className="footer-second-item d-flex">
              <h4>HỖ TRỢ KHÁCH HÀNG</h4>
            </div>

            <div className="footer-second-item d-flex">
              <a href="">Liên hệ</a>
            </div>

            <div className="footer-second-item d-flex">
              <a href="/salespolicy">Chính sách bán hàng</a>
            </div>

            <div className="footer-second-item d-flex">
              <a href="/deliverypolicy">Chính sách giao hàng</a>
            </div>

            <div className="footer-second-item d-flex">
              <a href="/returnpolicy">Chính sách đổi trả</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 col-sm-12 py-3">
            <div className="row">
              <div className="footer-second-item d-flex">
                <h4>ĐĂNG KÝ NHẬN TIN</h4>
              </div>
              <div className="form-footer-input">
                <label className="d-flex" style={{ position: "relative" }}>
                  <input type="text" placeholder="Nhập địa chỉ email"></input>
                  <div className="form-footer-input-item">
                    <p>Đăng ký</p>
                  </div>
                </label>
              </div>
              <div className="footer-info-item d-flex ">
                <img src="https://theme.hstatic.net/200000696635/1001199686/14/facebook.png?v=8" />
                <img src="https://theme.hstatic.net/200000696635/1001199686/14/zalo.png?v=8" />
                <img src="https://theme.hstatic.net/200000696635/1001199686/14/instagram.png?v=8" />
                <img src="https://theme.hstatic.net/200000696635/1001199686/14/youtube.png?v=8" />
                <img src="https://theme.hstatic.net/200000696635/1001199686/14/tiktok.png?v=8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
