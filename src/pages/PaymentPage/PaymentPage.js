import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, Radio } from "antd";
import "./PaymentPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { UseMutationHooks } from "../../hooks/UseMutationHook";
import * as OrderService from "../../services/OrderService";
import { toast } from "react-toastify";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { clearPurchasedProducts, clearOrder, clearCart } from "../../redux/counter/orderSlice";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, selectedProducts } = location.state || {};
  const user = useSelector((state) => state.user);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [payment, setPaymentMethod] = useState("cash");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const handlePayment = () => {
    setIsLoading(true)
    mutationAddOder.mutate({
      token: user?.access_token,
      orderItems: selectedProducts,
      fullName: user?.name,
      address: user?.address,
      phone: user?.phone,
      paymentMethod: payment,
      totalPrice: total,
      user: user?.id,
    });
   
  };



  const toggleShowAllProducts = () => {
    setShowAllProducts((prevState) => !prevState);
  };
  
  const mutationAddOder = UseMutationHooks(async (data) => {
    const { id, token, ...rests } = data;
    try {
      const response = await OrderService.createOrder(rests, token);
      toast.success('Đặt hàng thành công');
      dispatch(clearOrder());
      dispatch(clearPurchasedProducts());
      navigate(`/OrderManagement/${user?.id}`);
      return response;
    } catch (error) {
      toast.error('Đặt hàng thất bại');
      throw error;
    } finally {
      setIsLoading(false);
    }
  });



  return (
    <div>
    { isLoading &&  <LoadingComponent/>}
      <div className="payment-page">
        <div className="container px-5 py-2">
          <div className="payment-page">
            <div style={{ marginBottom: 30 }} className="payment-header">
              <Link style={{ color: "black" }} to="/Order">
                <i className="fa-solid fa-arrow-left-long"></i>
              </Link>
              <div className="go-back">
                <p className="title">Thông tin thanh toán</p>
              </div>
            </div>
            <div className="payment-body">
              {selectedProducts.slice(0, showAllProducts ? selectedProducts.length : 1).map((product) => {
                  const firstImage = product.image[0];
                  const imageUrl = `${firstImage}`;
                  return (
                    <div
                      key={product.id}
                      className="block__product-item"
                      style={{ marginTop: 0 }}
                    >
                      <div className="checkbox-product">
                        <div className="select-product-action custom-control custom-checkbox">
                          <img
                            src={imageUrl}
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
                          </a>
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
                                </p>
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
                          </div>
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
                    <p className="title-info">Họ Tên:</p>
                    <p style={{ marginTop: -2, marginLeft: 5 }}>{user.name}</p>
                  </div>
                  <div className="d-flex">
                    <p className="title-info">SDT:</p>
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
                    <p>{user.address}</p>
                  </div>
                </div>
                <Link to="/profile-user" style={{ textDecoration: "none" }}>
                  <p className="address">Cập nhật lại địa chỉ giao hàng</p>
                </Link>
              </div>
            </div>
            <div style={{ marginTop: 30 }} className="block-payment-method">
              <p>Phương thức thanh toán</p>
              <Radio.Group
                onChange={(e) => setPaymentMethod(e.target.value)}
                value={payment}
              >
                <Radio value="cash">Thanh toán khi nhận hàng</Radio>
                <Radio value="vnpay">VnPay</Radio>
                <Radio value="momo">Ví Momo</Radio>
              </Radio.Group>
            </div>
            <div style={{ width: 600 }} className="bottom-bar container mt-auto">
              <div className="total-box d-flex justify-content-between align-items-start">
                <p style={{ fontWeight: 600 }} className="title-temp">
                  Tổng tiền tạm tính:
                </p>
                <div className="price d-flex flex-column align-items-end">
                  <span
                    style={{ color: "#d70018", fontWeight: 600 }}
                    className="total"
                  >
                    {total}
                  </span>
                </div>
              </div>
              <div className="btn-submit mt-2">
                <button
                  onClick={handlePayment}
                  className="button__go-next btn d-flex flex-column justify-content-center align-items-center w-100"
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
