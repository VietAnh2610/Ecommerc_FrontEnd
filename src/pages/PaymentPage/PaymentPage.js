import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import "./PaymentPage.scss";
import { useSelector } from "react-redux";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total } = location.state || {};
  const { selectedProducts } = location.state || {};
  // console.log("selectedItemssss", selectedProducts);
  const user = useSelector((state) => state.user);
  console.log(user);

  const [showAllProducts, setShowAllProducts] = useState(false);
  const handlePayment = () => {
    Modal.success({
      title: "Thành công",
      content: "Thanh toán thành công! Cảm ơn bạn đã mua hàng.",
      onOk() {
        navigate("/"); // Điều hướng trở lại trang chủ sau khi thanh toán thành công
      },
    });
  };
  const toggleShowAllProducts = () => {
    setShowAllProducts((prevState) => !prevState);
  };

  return (
    <div className="payment-page">
      <div className="container px-5 py-2">
        <div className="payment-page">
          <div style={{ marginBottom: 30 }} className="payment-header">
        <Link style={{color:'black'}} to='/Order'>    <i className="fa-solid fa-arrow-left-long"></i></Link>
            <div className="go-back">
              <p className="title">Thông tin thanh toán</p>
            </div>
          </div>
          <div className="payment-body">
            {selectedProducts
              .slice(0, showAllProducts ? selectedProducts.length : 1)
              .map((product, index) => {
                const firstImage = product.image[0];

                // Tạo URL từ base64
                const imageUrl = `${firstImage}`;
                return (
                  <div
                    style={{ marginTop: 0 }}
                    key={product}
                    className="block__product-item"
                  >
                    <div className="checkbox-product">
                      <div className="select-product-action custom-control custom-checkbox">
                        <img
                          src={imageUrl}
                          // alt={product.name}
                          style={{ width: 100, height: 100, marginLeft: 20 }}
                          loading="lazy"
                          className="product-img"
                        />
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-info-top d-flex justify-content-between align-items-start">
                        <a href="#" className="product-name">
                          {product.name}
                        </a>{" "}
                      </div>
                      <div
                        style={{ marginTop: 30 }}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="block-box-price">
                          <div className="box-info__box-price">
                            <div
                              style={{ position: "relative", width: 310 }}
                              className="d-flex"
                            >
                              <p className="product__price--show">
                                {product.price.toLocaleString()}đ
                              </p>{" "}
                              <del
                                style={{ marginTop: 2 }}
                                className="product__price--through"
                              >
                                {product.original_price.toLocaleString()}đ
                              </del>
                            </div>
                            <p className="quality">
                              Số lượng:{" "}
                              <span style={{ color: "#d70018" }}>
                                {product.amount}
                              </span>
                            </p>
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                );
              })}

            {selectedProducts.length > 1 && (
              <p className="btn-product py-3" onClick={toggleShowAllProducts}>
                {showAllProducts ? (
                  <>
                    Thu gọn <i className="fa-solid fa-chevron-up"></i>
                  </>
                ) : (
                  <>
                    và {selectedProducts.length - 1} sản phẩm khác{" "}
                    <i className="fa-solid fa-chevron-down"></i>
                  </>
                )}
              </p>
            )}
          </div>

          <div style={{ marginTop: 30 }} className="block-customer">
            <p>Thông tin nhận hàng</p>
            <div className="block-customer__main">
              <div className="block-customer__main-info">
                <div className="d-flex">
                  {" "}
                  <p className="title-info">Họ Tên:</p>
                  <p style={{ marginTop: -2, marginLeft: 5 }}>{user.name}</p>
                </div>
                <div className="d-flex">
                  <p className="title-info">SDT:</p>{" "}
                  <p style={{ marginTop: -2, marginLeft: 5 }}>{user.phone}</p>
                </div>
              </div>
              <div
                style={{ borderBottom: "1px solid rgb(228, 232, 235)" }}
                className="d-flex justify-content-between"
              >
                <div>
                  <p className="title-info">Email</p>
                  <p>{user.email}</p>
                </div>
                <div className="d-flex flex-column">
                  <p style={{ float: "left" }} className="title-info">
                    Địa chỉ
                  </p>
                  <p> {user.address}</p>
                </div>
              </div>
              <Link to="/profile-user" style={{ textDecoration: "none" }}>
                <p className="address">Cập nhật lại địa chỉ giao hàng</p>
              </Link>
            </div>
          </div>

          <div style={{width:600}} data-v-469fe132="" class="bottom-bar container mt-auto">
            <div
              data-v-469fe132=""
              class="total-box d-flex justify-content-between align-items-start"
            >
              <p style={{fontWeight:600}} data-v-469fe132="" class="title-temp">
                Tổng tiền tạm tính:
              </p>{" "}
              <div
                data-v-469fe132=""
                class="price d-flex flex-column align-items-end"
              >
                <span style={{color:'#d70018', fontWeight:600}} data-v-469fe132="" class="total">
                 {total}
                </span>
              </div>
            </div>{" "}
            <div data-v-469fe132="" class="btn-submit mt-2">
              <button
                data-v-469fe132=""
                class="button__go-next btn  d-flex flex-column justify-content-center align-items-center w-100"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
