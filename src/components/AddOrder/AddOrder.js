import React, { useState, useEffect } from "react";
import "./AddUser.scss";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";
import { Modal, Button, Select, InputNumber } from "antd"; 
import * as OrderService from "../../services/OrderService";
import * as UserService from "../../services/UserService";
import * as ProductService from "../../services/ProductService";

const { Option } = Select;

const AddOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [productAmounts, setProductAmounts] = useState({}); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [orderState, setOrderState] = useState({
    orderItems: [],
    paymentMethod: "",
    totalPrice: "",
    fullName: "",
    address: "",
    phone: "",
    user: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUser();
        if (response && response.data) {
          const adminUser = response.data.find((user) => user.name === "admin");
          if (adminUser) {
            setUsers([adminUser]);
          } else {
            console.log("Không tìm thấy người dùng 'admin'");
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAllProduct();
        if (response && response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };

    fetchUsers();
    fetchProducts();
  }, []);

  const handleOnChange = (e) => {
    setOrderState({
      ...orderState,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserChange = (e) => {
    const selectedUser = users.find((user) => user._id === e.target.value);
    setOrderState({
      ...orderState,
      user: e.target.value,
    });
  };

  const handleProductSelect = (selectedIds) => {
    setSelectedProductIds(selectedIds);
    const selectedProducts = products.filter((product) =>
      selectedIds.includes(product._id)
    );
    setSelectedProducts(selectedProducts);

    const orderItems = selectedProducts.map((product) => ({
      name: product.name,
      amount: productAmounts[product._id] || 1,
      image: product.image,
      price: product.price,
      original_price: product.original_price,
      product: product, // Thêm trường product với giá trị là đối tượng có _id của sản phẩm
    }));

    const total = selectedProducts.reduce(
      (acc, curr) => acc + parseFloat(curr.price),
      0
    );

    const formattedTotal = total
      .toFixed(6)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    setOrderState({
      ...orderState,
      orderItems,
      totalPrice: formattedTotal,
    });
  };

  const handleAmountChange = (productId, amount) => {
    setProductAmounts({
      ...productAmounts,
      [productId]: amount,
    });

    const selectedProductsUpdated = selectedProducts.map((product) => {
      if (product._id === productId) {
        return { ...product, amount };
      }
      return product;
    });
    setSelectedProducts(selectedProductsUpdated);

    const total = selectedProductsUpdated.reduce(
      (acc, curr) => acc + parseFloat(curr.price) * (curr.amount || 1), // Tính tổng giá trị dựa trên số lượng
      0
    );

    const formattedTotal = total
      .toFixed(6)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    setOrderState({
      ...orderState,
      totalPrice: formattedTotal,
    });
  };

  const handleRemoveProduct = (productId) => {
    const updatedSelectedProducts = selectedProducts.filter(
      (product) => product._id !== productId
    );
    setSelectedProducts(updatedSelectedProducts);
    const updatedProductAmounts = { ...productAmounts };
    delete updatedProductAmounts[productId];
    setProductAmounts(updatedProductAmounts);

    const total = updatedSelectedProducts.reduce(
      (acc, curr) => acc + parseFloat(curr.price) * (curr.amount || 1), // Tính tổng giá trị dựa trên số lượng
      0
    );
    const formattedTotal = total
      .toFixed(6)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setOrderState({
      ...orderState,
      orderItems: updatedSelectedProducts,
      totalPrice: formattedTotal,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setOrderState({
      ...orderState,
      orderItems: [],
      paymentMethod: "",
      totalPrice: "",
      fullName: "",
      address: "",
      phone: "",
      user: "",
    });
    setErrors({});
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  const validatePhoneNumber = (phone) => {
    const phonePattern = /^0\d{9}$/;
    return phonePattern.test(phone);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validatePhoneNumber(orderState.phone)) {
      setErrors({
        ...errors,
        phone: "Số điện thoại phải có đúng 10 chữ số",
      });
      setIsLoading(false);
      return;
    }
    try {
      const orderItems = selectedProducts.map((product) => ({
        _id: product._id,
        name: product.name,
        amount: productAmounts[product._id] || 1,
        image: product.image,
        price: product.price,
        original_price: product.original_price,
        product: product._id, // Sử dụng toàn bộ đối tượng product thay vì chỉ có _id
      }));

      const newOrder = await OrderService.createOrder({
        ...orderState,
        orderItems,
      });
      setOrderState({
        ...orderState,
        orderItems: [],
        paymentMethod: "",
        totalPrice: "",
        fullName: "",
        address: "",
        phone: "",
        user: "",
      });
      setSelectedProducts([]); // Xóa các sản phẩm đã chọn
      setSelectedProductIds([]); // Xóa các ID sản phẩm đã chọn
      setProductAmounts({}); // Xóa số lượng sản phẩm đã chọn
      setErrors({});
      toast.success("Đã thêm đơn hàng thành công");
    } catch (error) {
      console.error("Error creating order:", error);
      if (error.response && error.response.data) {
        toast.error(
          `Error: ${error.response.data.message || "Something went wrong"}`
        );
      } else {
        toast.error("Error: Unable to add order");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="Add_order">
      <div className="Order_title d-flex justify-content-between">
        <h5>Danh sách đơn hàng / Thêm đơn hàng</h5>
      </div>
      <div className="Order_main py-2">
        <div
          style={{ borderBottom: "2px solid var(--text-color)" }}
          className="Order_main-button-list d-flex px-1 pt-3"
        >
          <div className="align-items-center text-center py-1 px-2">
            <h5 style={{ fontWeight: 600 }}>Tạo mới đơn hàng</h5>
          </div>
        </div>

        <form className="row px-4 py-5" onSubmit={handleSubmit}>
          <div className="form-group col-md-6">
            <label className="control-label">Người dùng</label>
            <select
              className="form-control"
              value={orderState.user}
              onChange={handleUserChange}
              name="user"
            >
              <option value="">Chọn người dùng</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.user && <p className="error-messages">{errors.user}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="control-label">Tên khách hàng</label>
            <input
              className="form-control"
              type="text"
              value={orderState.fullName}
              onChange={handleOnChange}
              name="fullName"
            />
            {errors.fullName && (
              <p className="error-messages">{errors.fullName}</p>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="control-label">Số điện thoại</label>
            <input
              className="form-control"
              type="text"
              value={orderState.phone}
              onChange={handleOnChange}
              name="phone"
            />
            {errors.phone && <p className="error-messages">{errors.phone}</p>}
          </div>

          <div className="form-group col-md-6">
            <label className="control-label">Địa chỉ giao hàng</label>
            <input
              className="form-control"
              type="text"
              value={orderState.address}
              onChange={handleOnChange}
              name="address"
            />
            {errors.address && (
              <p className="error-messages">{errors.address}</p>
            )}
          </div>
          <div className="form-group col-md-6">
            <label className="control-label">Phương thức thanh toán</label>
            <select
              className="form-control"
              value={orderState.paymentMethod}
              onChange={handleOnChange}
              name="paymentMethod"
            >
              <option value="">Chọn phương thức thanh toán</option>
              <option value="paystore">Thanh toán tại cửa hàng</option>
            </select>
            {errors.paymentMethod && (
              <p className="error-messages">{errors.paymentMethod}</p>
            )}
          </div>
          <div className="form-group col-md-12">
            <div className="form-group col-md-12">
              <label className="control-label">Sản phẩm đã chọn</label>
              <ul className="selected-products-list">
                {selectedProducts.map((product) => (
                  <div style={{marginBottom:10}} className="d-flex" key={product._id}>
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      style={{
                        marginRight: 8,
                        width: 50,
                        height: 50,
                        marginBottom: 5,
                      }}
                    />
                    <div className="selected-products-item d-flex">
                      <li style={{ width: "100%",display:'flex', textAlign:'center', alignItems:'center', marginBottom:5 }}>{product.name}</li>
                      <li style={{ width: "100%", color: "rgb(215, 0, 24)" , display:'flex', textAlign:'center', alignItems:'center', marginBottom:5 }}>
                        {product.price}đ
                      </li>
                      <InputNumber
                        min={1}
                        value={productAmounts[product._id] || 1}
                        onChange={(value) =>
                          handleAmountChange(product._id, value)
                        }
                      />
                      <button
                        style={{
                          marginLeft: 5,
                          backgroundColor: "rgb(255, 197, 196)",
                        }}
                        className="btn  ml-2"
                        onClick={() => handleRemoveProduct(product._id)}
                      >
                        <i
                          style={{ color: "rgb(222, 4, 0)" }}
                          class="fa-regular fa-trash-can"
                        ></i>
                      </button>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
            <Button type="primary" onClick={handleOpenModal}>
              Chọn sản phẩm
            </Button>
            {errors.selectedProducts && (
              <p className="error-messages">{errors.selectedProducts}</p>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="control-label">Tổng số tiền</label>
            <div className="d-flex">
              <input
                style={{ color: "#d70018", fontWeight: 500 }}
                className="form-control"
                type="text"
                value={orderState.totalPrice}
                onChange={handleOnChange}
                name="totalPrice"
                readOnly
              />
              <div
                style={{ marginLeft: 10 }}
                className="d-flex align-items-center"
              >
                VND
              </div>
            </div>
            {errors.totalPrice && (
              <p className="error-messages">{errors.totalPrice}</p>
            )}
          </div>

          <div className="form-group col-md-12">
            <button type="submit" className="button-submit">
              Lưu lại
            </button>
            <button
              style={{
                marginLeft: 10,
                backgroundColor: "rgb(255, 196, 196)",
                color: "rgb(191, 40, 40)",
              }}
              type="button"
              className="button-submit"
              onClick={handleCancel}
            >
              Hủy bỏ
            </button>
          </div>
        </form>
      </div>

      {isLoading && <LoadingComponent />}

      <Modal
        title="Chọn sản phẩm"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={[
          <Button key="cancel" onClick={handleCancelModal}>
            Hủy bỏ
          </Button>,
          <Button key="submit" type="primary" onClick={handleCancelModal}>
            Xác nhận
          </Button>,
        ]}
      >
       <Select
  mode="multiple"
  style={{ width: "100%", }}
  placeholder="Chọn sản phẩm"
  defaultValue={selectedProductIds}
  onChange={handleProductSelect}
  filterOption={(input, option) =>
    option.children.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
>
  {products.map((product) => (
    <Option key={product._id} value={product._id}>
      <div className="">
        <img
          src={product.image[0]}
          alt={product.name}
          style={{
            marginRight: 8,
            width: 30,
            height: 30,
            marginBottom: 0,
            borderRadius:5
          }}
        />
        {product.name}
      </div>
    </Option>
  ))}
</Select>

      </Modal>
    </div>
  );
};

export default AddOrder;
