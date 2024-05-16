import React from 'react';
import './CartComponents.scss';
import { Link } from 'react-router-dom';

const CartComponents = (props) => {
  const { id, countInStock, descriptions, image, name, price, rating, type, original_price } = props;

  // Kiểm tra giá trị id
  const isValidObjectId = (id) => {
    return /^[a-fA-F0-9]{24}$/.test(id);
  };

  if (!isValidObjectId(id)) {
    console.error('Invalid product ID:', id);
    return null; // Hoặc hiển thị thông báo lỗi thích hợp
  }

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    return stars;
  };

  return (
    <div className="col-lg-3 col-md-6">
      <div  className="single-product">
        <Link to={`/product-detail/${id}`}>
          <div className="product-img">
            {Array.isArray(image) ? (
              <img style={{ width: '80%' }} className="3" src={image[0]} alt="" />
            ) : (
              <img style={{ width: '90%' }} className="3" src={image} alt="" />
            )}

            <div className="p_icon">
              <Link to={`/product-detail/${id}`}>
                <i className="fa-regular fa-eye"></i>
              </Link>
              <a href="#">
                <i className="fa-regular fa-heart"></i>
              </a>
              <a href="#">
                <i className="fa-solid fa-cart-plus"></i>
              </a>
            </div>
          </div>
        </Link>
        <div className="product-btm">
          <Link to={`/product-detail/${id}`} className="d-block">
            <p className="name_product">{name}</p>
          </Link>
          <div className="mt-4 cart-title">
            <span style={{ color: 'var(--text-color)' }}>{price} đ</span>
            <span>{original_price}đ</span>
          </div>
          <div className="promotion">
            <p style={{ textTransform: 'none' }} className="coupon-price">
              Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...
            </p>
          </div>
          <div className="cart-footer">
            <div className="cart-footer-start">{renderRatingStars()}</div>
            <div className="cart-footer-favourite">
              <p style={{ textTransform: 'none' }}>
                Yêu thích<i className="fa-regular fa-heart"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponents;
