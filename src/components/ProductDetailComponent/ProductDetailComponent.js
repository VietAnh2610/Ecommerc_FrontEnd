import { Link } from "react-router-dom";
import "./ProductDetailComponent.scss";
import FooterComponent from "../FooterComponent/FooterComponent";
import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
const ProductDetailComponent = () => {
  const [largeImage, setLargeImage] = useState('https://themewagon.github.io/eiser/img/product/new-product/n2.jpg');

  // Hàm xử lý sự kiện onClick để thay đổi ảnh lớn
  const changeImage = (imageUrl) => {
    setLargeImage(imageUrl);
  };
  return (
    <div>
      <div className="menu-top d-flex align-items-center">
        <div className="container">
          <div class="banner_content d-md-flex justify-content-between align-items-center">
            <div class="mb-3 mb-md-0">
              <h2 style={{ fontSize: 27 }}>Chi tiết sản phẩm</h2>
              <p>Thông số chi tiết về sản phẩm</p>
            </div>
            <div class="page_link">
              <Link className="link" to="/" style={{ textDecoration: "none" }}>
                Trang chủ
              </Link>
              <Link className="link" style={{ textDecoration: "none" }}>
                Chi tiết sản phẩm
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="product-detail">
        <div className="container">
          <div className="row product_inner">
             <div className="col-lg-6 product_inner-left">
      <img src={largeImage} alt="Large Product Image"></img>
      <ul className="product_img">
        <li>
          <img src="https://themewagon.github.io/eiser/img/product/new-product/n2.jpg" alt="Thumbnail Image" onClick={() => changeImage('https://themewagon.github.io/eiser/img/product/new-product/n2.jpg')}></img>
        </li>
        <li>
          <img src="https://themewagon.github.io/eiser/img/product/inspired-product/i3.jpg" alt="Thumbnail Image" onClick={() => changeImage('https://themewagon.github.io/eiser/img/product/inspired-product/i3.jpg')}></img>
        </li>
        <li>
          <img src="https://themewagon.github.io/eiser/img/product/inspired-product/i6.jpg" alt="Thumbnail Image" onClick={() => changeImage('https://themewagon.github.io/eiser/img/product/inspired-product/i6.jpg')}></img>
        </li>
      </ul>
    </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="product_text">
                <h3 className="">Đồng hồ thông minh Apple Watch SE 2023 GPS 40mm</h3>
                <h2>
                  5.990.000 <span>VND</span>
                </h2>
                <ul class="list">
                  <li>
                    <a class="active" href="#">
                      <span style={{ color: "#555555" }}>Danh mục</span> : Đồng hồ
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <span>Tình trạng</span> : Còn hàng
                    </a>
                  </li>
                </ul>
                <p>
                Apple Watch SE 2023 GPS 40mm viền nhôm dây thể thao là chiếc smartwatch có mức giá dễ tiếp cận nhất nhà Táo, là lựa chọn tối ưu ngân sách cho người dùng nhưng vẫn đảm bảo một thiết kế đẹp mắt, hỗ trợ đa dạng tính năng cũng như tiện ích hằng ngày.
                </p>
                <div class="product_count">
                  <label className="label" for="qty">
                    Số lượng:
                  </label>
                  <button>
                    <i class="fa-solid fa-chevron-up"></i>
                  </button>
                  <input
                    type="text"
                    name="qty"
                    id="sst"
                    maxlength="12"
                    value="1"
                    title="Quantity:"
                    class="input-text qty"
                  />

                  <button>
                    <i class="fa-solid fa-chevron-down"></i>
                  </button>
                </div>

                <div class="card_area">
                  <a class="main_btn" href="#">
                    Thêm giỏ hàng
                  </a>
                  <a class="icon_btn" href="#">
                    <i class="fa-regular fa-gem"></i>
                  </a>
                  <a class="icon_btn" href="#">
                    <i class="fa-regular fa-heart"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  <div className="container product-tabs ">
        <Tab.Container  id="product-tabs" defaultActiveKey="description">
          <Nav  variant="tabs">
    
              <Nav.Item>
                <Nav.Link  eventKey="description">Mô tả</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="specs">Thông số</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="comment">Bình luận</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="revew">Đánh giá</Nav.Link>
              </Nav.Item>
          
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="description">
              <p>
              Apple Watch SE 2023 GPS 40mm viền nhôm dây thể thao là chiếc smartwatch có mức giá dễ tiếp cận nhất nhà Táo, là lựa chọn tối ưu ngân sách cho người dùng nhưng vẫn đảm bảo một thiết kế đẹp mắt, hỗ trợ đa dạng tính năng cũng như tiện ích hằng ngày.Thiết kế quen thuộc với độ nhận diện cao
Xét về mặt thiết kế thì Apple Watch SE 2023 không có nhiều sự khác biệt so với các phiên bản đã ra mắt trước đó. Mặt đồng hồ được bo cong 4 góc tạo nên sự liền mạch, mang đến cảm giác hiện đại và sang trọng. Khung viền bằng hợp kim nhôm vừa chắc chắn vừa có khối lượng nhẹ, thoải mái hơn trong quá trình sử dụng.
              </p>
            </Tab.Pane>
            <Tab.Pane eventKey="specs">
  <div className="table-responsive">
    <div className="product-details">
      <div className="product-spec">
        <span className="spec-title">Màn hình:</span>
        <span className="spec-value">OLED</span>
      </div>
      <div className="product-spec">
        <span className="spec-title">Thời lượng pin:</span>
        <span className="spec-value">Khoảng 18 giờ (ở chế độ sử dụng thông thường)</span>
      </div>
      <div className="product-spec">
        <span className="spec-title">Kết nối với hệ điều hành:</span>
        <span className="spec-value">iPhone Xs trở lên chạy iOS 17 trở lên</span>
      </div>
      <div className="product-spec">
        <span className="spec-title">Mặt:</span>
        <span className="spec-value">Ion-X strengthened glass40 mm</span>
      </div>
      <div className="product-spec">
        <span className="spec-title">Tính năng cho sức khỏe:</span>
        <span className="spec-value">
          Đếm số bước chân<br />
          Đo nhịp tim<br />
          Tính quãng đường chạy<br />
          Tính lượng calories tiêu thụ<br />
          Theo dõi mức độ stress<br />
          Theo dõi giấc ngủ<br />
          Theo dõi chu kỳ kinh nguyệt<br />
          Nhắc nhở nhịp tim cao, thấp<br />
          Gửi thông báo khi có tai nạn
        </span>
      </div>
    </div>
  </div>
</Tab.Pane>

            <Tab.Pane eventKey="comment">
              <div className="table-responsive">
                <p>Còn hàng không</p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="revew">
  <div className="table-responsive">
    <p>Đánh giá sản phẩm:</p>
    <div class="star-rating">
      <input type="radio" id="star5" name="rating" value="5" />
      <label for="star5" title="5 stars">&#9733;</label>
      <input type="radio" id="star4" name="rating" value="4" />
      <label for="star4" title="4 stars">&#9733;</label>
      <input type="radio" id="star3" name="rating" value="3" />
      <label for="star3" title="3 stars">&#9733;</label>
      <input type="radio" id="star2" name="rating" value="2" />
      <label for="star2" title="2 stars">&#9733;</label>
      <input type="radio" id="star1" name="rating" value="1" />
      <label for="star1" title="1 star">&#9733;</label>
    </div>
  </div>
</Tab.Pane>

          </Tab.Content>
        </Tab.Container>
  </div>

      <FooterComponent />
    </div>
  );
};

export default ProductDetailComponent;
