import React from 'react';
import './CartComponents.scss';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrderProduct } from '../../redux/counter/orderSlice';
import { toast } from 'react-toastify';

const CartComponents = (props) => {
  const { id, countInStock, descriptions, image, name, price, rating, type, original_price } = props;
  const dispatch = useDispatch();
  const location = useLocation();

  const isValidObjectId = (id) => {
    return /^[a-fA-F0-9]{24}$/.test(id);
  };

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    return stars;
  };

  const isProductsPage = location.pathname === '/products';

  const handleAddCart = () => {
   
      dispatch(addOrderProduct({
        orderItem: {
          name,
          amount: 1,
          image: image,
          price,
          product: id,
          original_price,
        }
      }));
      toast.success('Sản phẩm đã được thêm vào giỏ hàng');
  
  };

  if (!isValidObjectId(id)) {
    console.error('Invalid product ID:', id);
    return null;
  }

  return (
    <div className={`col-lg-${isProductsPage ? '4' : '3'} col-md-6`}>
      <div className="single-product">
        <div>
          <div className="product-img">
            {Array.isArray(image) ? (
              <Link to={`/product-detail/${id}`}>
               <div className='aaaa'> <img style={{ width: '80%' }} className="img-fluid" src={image[0]} alt={name} /></div>
              </Link>
            ) : (
              <img style={{ width: '90%' }} className="img-fluid" src={image} alt={name} />
            )}
            <div className="p_icon">
              <Link to={`/product-detail/${id}`}>
                <i className="fa-regular fa-eye"></i>
              </Link>
              <a href="#">
                <i className="fa-regular fa-heart"></i>
              </a>
              <a onClick={handleAddCart} >
                <i onClick={handleAddCart} className="fa-solid fa-cart-plus"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="product-btm">
          <Link to={`/product-detail/${id}`} className="d-block">
            <p className="name_product">{name}</p>
          </Link>
          <div className="mt-4 cart-title">
            <span style={{ color: 'var(--text-color)' }}>{price} đ</span>
            <span>{original_price} đ</span>
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
                Yêu thích <i className="fa-regular fa-heart"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponents;
