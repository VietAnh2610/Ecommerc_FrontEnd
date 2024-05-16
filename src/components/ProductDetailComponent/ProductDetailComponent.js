import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as ProductService from '../../services/ProductService';
import './ProductDetailComponent.scss';
import FooterComponent from '../FooterComponent/FooterComponent';

const ProductDetailComponent = () => {
  const { id } = useParams(); // Lấy tham số id từ URL
  const [product, setProduct] = useState(null);
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);

  // Hàm fetch chi tiết sản phẩm dựa vào id
  const fetchProductDetails = async (productId) => {
    try {
      console.log('Fetching product details for ID:', productId);
      const response = await ProductService.getDetailsProduct(productId);
      console.log('Response:', response);
      setProduct(response.data);
      setLargeImage(response.data.image[0]); // Giả sử hình ảnh đầu tiên là ảnh lớn
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
      setError('Có lỗi xảy ra khi lấy chi tiết sản phẩm.'); // Thiết lập lỗi để hiển thị
    }
  };

  // Sử dụng useEffect để fetch dữ liệu khi component được render lần đầu
  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>; // Hiển thị thông báo lỗi
  }

  if (!product) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div style={{ marginTop: 110 }}>
      <div className="product-detail">
        <div className="container">
          <div className="row product_inner">
            <div className="col-lg-6 product_inner-left">
              <img src={largeImage} alt="Large Product Image" />
              <ul className="product_img">
                {product.image.map((imageUrl, index) => (
                  <li key={index}>
                    <img
                      src={imageUrl}
                      alt="Thumbnail Image"
                      onClick={() => setLargeImage(imageUrl)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="product_text">
                <h3>{product.name}</h3>
                <h2>
                  {product.price.toLocaleString()} <span>VND</span>
                </h2>
                <ul className="list">
                  <li>
                    <span style={{ color: '#555555' }}>Danh mục</span>: {product.type}
                  </li>
                  <li>
                    <span>Tình trạng</span>: {product.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
                  </li>
                </ul>
                <p>{product.description}</p>
                <div className="product_count">
                  <label className="label" htmlFor="qty">Số lượng:</label>
                  <button>
                    <i className="fa-solid fa-chevron-up"></i>
                  </button>
                  <input
                    type="text"
                    name="qty"
                    id="sst"
                    maxLength="12"
                    defaultValue="1"
                    title="Quantity:"
                    className="input-text qty"
                  />
                  <button>
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                </div>
                <div className="card_area">
                  <a className="main_btn" href="#">Thêm giỏ hàng</a>
                  <a className="icon_btn" href="#"><i className="fa-regular fa-gem"></i></a>
                  <a className="icon_btn" href="#"><i className="fa-regular fa-heart"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default ProductDetailComponent;
