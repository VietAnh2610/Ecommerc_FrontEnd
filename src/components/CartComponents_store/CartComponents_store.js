import React from 'react';
import './CartComponents.scss';
import { Link } from 'react-router-dom';

const CartComponents_store = (props) => {
  const { countInStock, descriptions, image, name, price, rating, type, original_price } = props;
  const renderRatingStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    return stars;
  };

  return (
    <div className="col-lg-4 col-md-6">
      <div className="single-product">
       <Link to="/product-detail">
          <div className="product-img">
            {Array.isArray(image) ? (
             <img style={{ width: '80%' }} className="3" src={image[0]} alt="" />
            ) : (
              <img style={{ width: '90%' }} className="3" src={image} alt="" />
            )}
  
            <div className="p_icon">
              <Link to="/product-detail">
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
          <Link to="/product-detail" className="d-block">
            <p className='name_product'>{name}</p>
          </Link>
          <div className="mt-4 cart-title">
            <span style={{ color: 'var(--text-color)' }}>{price} đ</span>
            <span>{original_price}đ</span>
          </div>
          <div class="promotion"><p style={{textTransform:'none'}} class="coupon-price">
              Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...
            </p></div>
          <div className=" cart-footer">
           <div className='cart-footer-start'> {renderRatingStars()}</div>
           <div className='cart-footer-favourite'><p style={{textTransform:'none'}}>Yêu thích<i class="fa-regular fa-heart"></i></p>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponents_store;
