import React, { useState } from 'react';
import './QuickViewComponent.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct } from '../../redux/counter/orderSlice';
import { toast } from 'react-toastify';
import { Radio } from 'antd';

const QuickViewComponent = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [largeImage, setLargeImage] = useState(product.image[0]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + delta;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };
console.log("product", product)
  const handleAddCart = () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để mua sản phẩm');
      return;
    }

    if (quantity > product.countInStock) {
      toast.error('Số lượng sản phẩm vượt quá số lượng trong kho');
      return;
    }

    if (product.countInStock === 0) {
      toast.error('Sản phẩm đã hết hàng');
      return;
    }

    if (!selectedColor) {
      toast.error('Vui lòng chọn màu sắc');
      return;
    }

    if (!selectedSize) {
      toast.error('Vui lòng chọn kích thước');
      return;
    }

    dispatch(addOrderProduct({
      orderItem: {
        name: product.name,
        amount: quantity,
        image: product.image,
        price: product.price,
        product: product.id,
        original_price: product.original_price,
        selectedColor,
        selectedSize,
      }
    }));

    toast.success('Sản phẩm đã được thêm vào giỏ hàng');
  };

  if (!product) return null;

  return (
    <div className="quickviewComponent-overlay">
      <div className="quickviewComponent-content">
        <button className="quickviewComponent-close" onClick={onClose}>
          &times;
        </button>
        <div className="quickviewComponent-product">
          <div className='quickviewLeft'>
            <img src={largeImage} alt={product.name} className="large-image" />
            <div className="image-thumbnails">
              {product.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setLargeImage(img)}
                  className={img === largeImage ? 'selected' : ''}
                />
              ))}
            </div>
          </div>

          <div className='quickviewRight'>
            <h2>{product.name}</h2>
            <ul>
              <li>
                <span style={{ color: '#555555' }}>Danh mục</span>: {product.type}
              </li>
              <li>
                <span>Tình trạng</span>: {product.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
              </li>
              <li className='mt-3'>
                <p style={{ padding: 0 }} className='color'>Màu sắc</p>
                <Radio.Group
                  onChange={(e) => setSelectedColor(e.target.value)}
                  value={selectedColor}
                >
                  {product?.color.map((color, index) => (
                    <Radio key={index} value={color}>
                      {color}
                    </Radio>
                  ))}
                </Radio.Group>
              </li>
              <li className='mt-3'>
                <p style={{ padding: 0 }} className='color'>Kích thước</p>
                <Radio.Group
                  onChange={(e) => setSelectedSize(e.target.value)}
                  value={selectedSize}
                >
                  {product?.size.map((size, index) => (
                    <Radio key={index} value={size}>
                      {size}
                    </Radio>
                  ))}
                </Radio.Group>
              </li>
            </ul>
            <p>{product.descriptions}</p>
            <div className='d-flex'>
              <h2 style={{color:'rgb(115, 207, 23)'}}>
                {product.price.toLocaleString()} <span>VND</span>
              </h2>
              <del style={{marginLeft:10, fontWeight:600, color:'#707070'}}>
                {product.original_price.toLocaleString()} <span>VND</span>
              </del>
            </div>
            <div className="product_count">
              <label className="label" htmlFor="qty">Số lượng:</label>
              <button onClick={() => handleQuantityChange(-1)}>
                <i className="fa-solid fa-chevron-down"></i>
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
              <button onClick={() => handleQuantityChange(1)}>
                <i className="fa-solid fa-chevron-up"></i>
              </button>
            </div>
            <div onClick={handleAddCart} className="main_btn1">
              Thêm giỏ hàng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewComponent;
