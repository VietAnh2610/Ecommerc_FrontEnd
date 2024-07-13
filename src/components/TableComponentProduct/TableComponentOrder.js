import React, { useState, useEffect } from "react";
import { Table, Input, Modal, Button, Select } from "antd";
import * as OrderService from "../../services/OrderService";
import * as ProductService from "../../services/ProductService"; 
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import OrderDetails from "../OrderDetails/OrderDetails";
import "./TableComponent.scss";

const { Option } = Select;

const TableComponentOrder = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const cleanToken = token.replace(/(^"|"$)/g, "");
      setAccessToken(cleanToken);
    }
  }, []);
  const fetchProductDetails = async (productId) => {
    try {
      const res = await ProductService.getDetailsProduct(productId);
      if (res && res.data) {
        return res.data;
      }
      return null;
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu chi tiết sản phẩm:", error);
      throw error;
    }
  };
  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await OrderService.getAllOrder(accessToken);
      setLoading(false);
      if (res && res.data) {
        const reversedOrders = res.data.reverse();
        return { data: reversedOrders };
      }
      return res;
    } catch (error) {
      setLoading(false);
      console.error("Lỗi khi tải dữ liệu đơn hàng:", error);
      throw error;
    }
  };

  const { data: orders, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleEditOrder = async (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
    
    // Fetch product details to get available sizes and colors
    const productId = record.orderItems[0].product; 
    const product = await ProductService.getDetailsProduct(productId, accessToken);
    console.log('productId',productId)
    // Assuming only one item per order
    try {
      setAvailableSizes(product.data.size || []);
      setAvailableColors(product.data.color || []);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  

  const handleDetailsOrder = (record) => {
    setSelectedOrder(record);
    setIsDetailsVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDetailsVisible(false);
  };

  const handleDeleteOrder = (userId, orderId) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa đơn hàng này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        DeleteOrder(userId, orderId);
      },
    });
  };

  const handleDeleteSelectedOrders = () => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa các đơn hàng đã chọn?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        DeleteSelectedOrders();
      },
    });
  };

  const DeleteOrder = async (userId, orderId) => {
    try {
      await OrderService.deleteOrder(userId, orderId, accessToken);
      refetch().then(() => {
        toast.success("Đã xóa đơn hàng thành công");
      });
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      toast.error("Xóa đơn hàng thất bại");
    }
  };

  const DeleteSelectedOrders = async () => {
    try {
      if (selectedRowKeys.length === 0) {
        toast.error("Vui lòng chọn ít nhất một đơn hàng để xóa");
        return;
      }

      const promises = selectedRowKeys.map(async (orderId) => {
        const order = orders.data.find((order) => order._id === orderId);
        if (order) {
          await OrderService.deleteOrder(order.user, order._id, accessToken);
        }
      });

      await Promise.all(promises);

      setSelectedRowKeys([]);
      refetch().then(() => {
        toast.success("Đã xóa các đơn hàng đã chọn thành công");
      });
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      toast.error("Xóa đơn hàng thất bại");
    }
  };

  const handleSave = async () => {
    try {
      if (selectedOrder && accessToken) {
        const userId = selectedOrder.user;
        const orderId = selectedOrder._id;
        
        const data = {
          shippingAddress: selectedOrder.shippingAddress,
          isPaid: selectedOrder.isPaid,
          isDelivered: selectedOrder.isPaid ? false : selectedOrder.isDelivered,
          orderItems: selectedOrder.orderItems.map(item => ({
            ...item,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
          }))
        };
  
        const response = await OrderService.updateOrder(
          userId,
          orderId,
          data,
          accessToken
        );
  
        setIsModalVisible(false);
        refetch().then(() => {
          toast.success("Cập nhật đơn hàng thành công");
        });
      } else {
        toast.error("Invalid order data");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order");
    }
  };
  

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (shippingAddress) => shippingAddress.fullName,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "orderItems",
      key: "name",
      render: (orderItems) => (
        <>
          {orderItems.map((item, index) => (
            <div key={index}>
              {item.name} <strong>X{item.amount}</strong>
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice}`,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Kích thước",
      dataIndex: "orderItems",
      key: "selectedSize",
      render: (orderItems) => (
        <>
          {orderItems.map((item, index) => (
            <div key={index}>
              {item.selectedSize}
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Màu sắc",
      dataIndex: "orderItems",
      key: "selectedColor",
      render: (orderItems) => (
        <>
          {orderItems.map((item, index) => (
            <div key={index}>
              {item.selectedColor}
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod) => {
        const getPaymentMethodText = (method) => {
          switch (method) {
            case "cash":
              return "Thanh toán khi nhận hàng";
            case "momo":
              return "Ví MoMo";
            case "vnpay":
              return "Thanh toán qua VN Pay";
            case "paystore":
              return "Thanh toán tại cửa hàng";
            default:
              return method;
          }
        };
        return getPaymentMethodText(paymentMethod);
      },
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid, record) => {
        if (isPaid && !record.isDelivered) {
          record.isDelivered = false;
        }
        return (
          <span className={isPaid ? "status-paid" : "status-unpaid"}>
            {isPaid ? "Đã xác nhận" : "Chưa xác nhận"}
          </span>
        );
      },
    },
    {
      title: "Tình trạng vận chuyển",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered, record) => {
        if (record.isPaid && !isDelivered) {
          return (
            <span
              style={{ backgroundColor: "#ff7f50" }}
              className="status-undelivered"
            >
              Đang giao hàng
            </span>
          );
        }
        return (
          <span
            className={isDelivered ? "status-delivered" : "status-undelivered"}
          >
            {isDelivered ? "Đã nhận hàng" : "Chưa giao hàng"}
          </span>
        );
      },
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <div style={{ width: 110 }} className="d-flex">
          <button
            onClick={() => handleDeleteOrder(record.user, record._id)}
            style={{
              marginRight: 6,
              backgroundColor: "rgb(247, 196, 195)",
              border: "none",
            }}
            className="btn btn-primary btn-sm trash"
            title="Xóa"
          >
            <i
              style={{ color: "rgb(222, 4, 0)" }}
              className="fas fa-trash-alt"
            ></i>
          </button>
          <button
         
            onClick={() => handleEditOrder(record)}
            style={{ backgroundColor: "rgb(250, 226, 197)", border: "none" }}
            className="btn btn-primary btn-sm edit"
            title="Sửa"
            data-toggle="modal"
            data-target="#ModalUP"
          >
            <i
              style={{ color: "rgb(245, 158, 59)" }}
              className="fas fa-edit"
            ></i>
          </button>
          <button
            onClick={() => handleDetailsOrder(record)}
            style={{
              backgroundColor: "rgb(159, 250, 157)",
              border: "none",
              marginLeft: 6,
            }}
            className="btn btn-primary btn-sm edit"
            title="Chi tiết"
            data-toggle="modal"
            data-target="#ModalUP"
         
          >
            <i
              style={{ color: "var(--text-color)" }}
              className="fa-regular fa-eye"
            ></i>
          </button>
        </div>
      ),
    },
  ];

  const filteredData = orders?.data.filter((order) =>
    order.shippingAddress.fullName
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <div>
      {loading && <LoadingComponent />}

      <div className="py-4">
        <div className="row d-flex justify-content-between">
          <div className="col-sm-12 col-md-6 d-flex align-items-center">
            <div className="dataTables_length" id="sampleTable_length">
              <label className="d-flex align-items-center">
                Hiện{" "}
                <select
                  style={{
                    outline: "none",
                    width: 80,
                    marginLeft: 8,
                    marginRight: 8,
                    backgroundColor: "rgb(242, 242, 242)",
                  }}
                  name="sampleTable_length"
                  aria-controls="sampleTable"
                  className="form-control form-control-sm"
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>{" "}
                <i className="fa-solid fa-angle-down"></i>
                đơn hàng
              </label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div id="sampleTable_filter" className="dataTables_filter">
              <label
                style={{ fontSize: 14 }}
                className="d-flex justify-content-between"
              >
                Tìm kiếm:
                <input type="search" placeholder="" onChange={handleSearch} />
              </label>
            </div>
          </div>
        </div>
        <Button
          className="delete_list_user"
          type="danger"
          disabled={selectedRowKeys.length === 0}
          onClick={handleDeleteSelectedOrders}
        >
          <i
            style={{ marginRight: 5, color: "rgb(222, 4, 0)" }}
            className="fa-solid fa-trash-can"
          ></i>
          Xóa đơn hàng đã chọn ({selectedRowKeys.length})
        </Button>
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData?.length || 0,
          onChange: handlePageChange,
        }}
        rowKey="_id"
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
      />
      <div style={{ marginTop: "16px" }}></div>

      <Modal
  title="Chỉnh sửa đơn hàng"
  visible={isModalVisible}
  onCancel={handleCancel}
  footer={[
    <Button key="cancel" onClick={handleCancel}>
      Hủy
    </Button>,
    <Button key="save" type="primary" onClick={handleSave}>
      Lưu
    </Button>,
  ]}
>
  {selectedOrder && (
    <>
      <div className="mb-2">
        <label>Tên khách hàng:</label>
        <Input
          value={selectedOrder.shippingAddress.fullName}
          onChange={(e) =>
            setSelectedOrder({
              ...selectedOrder,
              shippingAddress: {
                ...selectedOrder.shippingAddress,
                fullName: e.target.value,
              },
            })
          }
        />
      </div>
      <div className="mb-2">
        <label>Số điện thoại:</label>
        <Input
          value={selectedOrder.shippingAddress.phone}
          onChange={(e) =>
            setSelectedOrder({
              ...selectedOrder,
              shippingAddress: {
                ...selectedOrder.shippingAddress,
                phone: e.target.value,
              },
            })
          }
        />
      </div>
      <div className="mb-2">
        <label>Địa chỉ:</label>
        <Input
          value={selectedOrder.shippingAddress.address}
          onChange={(e) =>
            setSelectedOrder({
              ...selectedOrder,
              shippingAddress: {
                ...selectedOrder.shippingAddress,
                address: e.target.value,
              },
            })
          }
        />
      </div>

      {selectedOrder.orderItems.map((item, index) => (
        <div key={index} className="mb-2">
          <div>
            <label>Tên sản phẩm:</label>
            <Input value={item.name} disabled />
          </div>
          <div className="mb-2">
            <label>Kích thước:</label>
            <Select
              value={item.selectedSize}
              onChange={(value) =>
                setSelectedOrder({
                  ...selectedOrder,
                  orderItems: selectedOrder.orderItems.map((orderItem, i) =>
                    i === index ? { ...orderItem, selectedSize: value } : orderItem
                  ),
                })
              }
              style={{ width: "100%" }}
            >
              {availableSizes.map((size) => (
                <Option key={size} value={size}>
                  {size}
                </Option>
              ))}
            </Select>
          </div>
          <div className="mb-2">
            <label>Màu sắc:</label>
            <Select
              value={item.selectedColor}
              onChange={(value) =>
                setSelectedOrder({
                  ...selectedOrder,
                  orderItems: selectedOrder.orderItems.map((orderItem, i) =>
                    i === index ? { ...orderItem, selectedColor: value } : orderItem
                  ),
                })
              }
              style={{ width: "100%" }}
            >
              {availableColors.map((color) => (
                <Option key={color} value={color}>
                  {color}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      ))}

      <div className="mb-2">
        <label>Trạng thái đơn hàng:</label>
        <Select
          value={selectedOrder.isPaid ? "Đã xác nhận" : "Chưa xác nhận"}
          onChange={(value) =>
            setSelectedOrder({
              ...selectedOrder,
              isPaid: value === "Đã xác nhận",
              isDelivered: value === "Đã xác nhận" ? false : selectedOrder.isDelivered,
            })
          }
          style={{ width: "100%" }}
        >
          <Option value="Đã xác nhận">Đã xác nhận</Option>
          <Option value="Chưa xác nhận">Chưa xác nhận</Option>
        </Select>
      </div>
    </>
  )}
</Modal>


      <OrderDetails
        order={selectedOrder}
        visible={isDetailsVisible}
        onClose={handleCancel}
      />
    </div>
  );
};

export default TableComponentOrder;
