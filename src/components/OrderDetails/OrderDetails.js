// OrderDetails.jsx
import React from 'react';
import { Modal, Descriptions } from 'antd';
import moment from 'moment';

const OrderDetails = ({ order, visible, onClose }) => {
  if (!order) {
    return null;
  }

  const formattedDate = moment(order.createdAt).format('DD/MM/YYYY HH:mm');

  return (
    <Modal 
      title="Chi tiết đơn hàng"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Descriptions bordered column={1} layout="horizontal"  >
        <Descriptions.Item label="Tên khách hàng">
          {order.shippingAddress.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Sản phẩm">
          {order.orderItems.map((item, index) => (
             <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
             <img src={item.image[0]} alt={item.name} style={{ marginRight: 8, width: 50, height: 50 }} />
             <div>
               {item.name} <strong>x{item.amount}</strong> - {item.price}đ
             </div>
           </div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {order.shippingAddress.phone}
        </Descriptions.Item>
     
        <Descriptions.Item label="Địa chỉ">
          {order.shippingAddress.address}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">
          {formattedDate}
        </Descriptions.Item>
        <Descriptions.Item label="Phương thức thanh toán">
          {(() => {
            switch (order.paymentMethod) {
              case 'cash':
                return 'Thanh toán khi nhận hàng';
              case 'momo':
                return 'Ví MoMo';
              case 'vnpay':
                return 'Thanh toán qua VN Pay';
              default:
                return order.paymentMethod;
            }
          })()}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái thanh toán">
          {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái giao hàng">
          {order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng số tiền">
          {order.totalPrice}
        </Descriptions.Item>
    
      </Descriptions>
    </Modal>
  );
};

export default OrderDetails;
