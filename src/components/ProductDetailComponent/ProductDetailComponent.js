import React, { useState, useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import * as ProductService from '../../services/ProductService';
import './ProductDetailComponent.scss';
import FooterComponent from '../FooterComponent/FooterComponent';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProductDetailComponent = () => {
  const { id } = useParams(); // Lấy tham số id từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [largeImage, setLargeImage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const user = useSelector((state) => state.user)
  console.log('user', user)
  // Hàm fetch chi tiết sản phẩm dựa vào id
  const fetchProductDetails = async (productId) => {
    try {
      // console.log('Fetching product details for ID:', productId);
      const response = await ProductService.getDetailsProduct(productId);
      // console.log('Response:', response);
      setProduct(response.data);
      setLargeImage(response.data.image[0]); 
      setSelectedImage(response.data.image[0]); 
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
      setError('Có lỗi xảy ra khi lấy chi tiết sản phẩm.'); 
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);



  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;
      return newQuantity < 1 ? 1 : newQuantity; 
    });
  };

  if (error) {
    return <div>{error}</div>; 
  }

  if (!product) {
    return <div>Đang tải dữ liệu...</div>;
  }
  const handleAddOderProduct = () => {
   if(!user.id) {
    navigate('/singin')
    toast.error('Vui lòng đăng nhập để mua sản phẩm')
   }
  };
  return (
    <div style={{ marginTop: 110 }}>
      <div className="product-detail py-5">
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
                      onClick={() => {
                        setLargeImage(imageUrl);
                        setSelectedImage(imageUrl);
                      }}
                      className={selectedImage === imageUrl ? 'selected' : ''}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="product_text">
                <h3>{product.name}</h3>
               <div className='d-flex'>
                  <h2>
                    {product.price.toLocaleString()} <span>VND</span>
                  </h2>
                  <del style={{marginLeft:10, fontWeight:600, color:'#707070'}}>
                    {product.original_price.toLocaleString()} <span>VND</span>
                  </del>
               </div>
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
                  <button onClick={() => handleQuantityChange(1)}>
                    <i className="fa-solid fa-chevron-up"></i>
                  </button>
                  <input
                    type="text"
                    name="qty"
                    id="sst"
                    maxLength="12"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    title="Quantity:"
                    className="input-text qty"
                  />
                  <button onClick={() => handleQuantityChange(-1)}>
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                </div>
                <div className="card_area">
                  <a onClick={handleAddOderProduct} className="main_btn" href="#">Thêm giỏ hàng</a>
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
