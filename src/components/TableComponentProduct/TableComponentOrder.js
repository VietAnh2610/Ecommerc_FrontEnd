import React, { useState, useEffect } from "react";
import { Table, Input, Modal, Button, Select } from "antd";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import OrderDetails from "../OrderDetails/OrderDetails"; // Import component mới

const { Option } = Select;

const TableComponentOrder = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // State mới
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const cleanToken = token.replace(/(^"|"$)/g, "");
      setAccessToken(cleanToken);
    }
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await OrderService.getAllOrder(accessToken);
      setLoading(false);
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

  const handleEditOrder = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleDetailsOrder = (record) => {
    setSelectedOrder(record);
    setIsDetailsVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDetailsVisible(false); // Đóng modal chi tiết
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
            <div key={index}>{item.name} <strong>X{item.amount}</strong></div>
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
            default:
              return method;
          }
        };
        return getPaymentMethodText(paymentMethod);
      },
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid) => (isPaid ? "Đã thanh toán" : "Chưa thanh toán"),
    },
    {
      title: "Trạng thái giao hàng",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered) => (isDelivered ? "Đã giao hàng" : "Chưa giao hàng"),
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <div className="d-flex">
          <Button
            // onClick={() => handleDeleteOrder(record._id)
            // }
            style={{ marginRight: 6 }}
            type="danger"
          >
            Xóa
          </Button>
          <Button
           style={{ marginRight: 6 }}
            onClick={() => handleEditOrder(record)}
            type="primary"
          >
            Sửa
          </Button>
          <Button
            onClick={() => handleDetailsOrder(record)}
            type="primary"
          >
            Chi tiết
          </Button>
          
        </div>
      ),
    },
  ];

  const filteredData = orders?.data.filter((order) =>
    order.shippingAddress.fullName.toLowerCase().includes(searchText.toLowerCase())
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
          // onClick={() => handleDeleteOrder(null)}
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
          <Button key="save" type="primary" 
          // onClick={handleSave}
          >
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
            <div className="mb-2">
              <label>Trạng thái thanh toán:</label>
              <Select
                value={selectedOrder.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                onChange={(value) =>
                  setSelectedOrder({
                    ...selectedOrder,
                    isPaid: value === "Đã thanh toán",
                  })
                }
                style={{ width: "100%" }}
              >
                <Option value="Đã thanh toán">Đã thanh toán</Option>
                <Option value="Chưa thanh toán">Chưa thanh toán</Option>
              </Select>
            </div>
            <div className="mb-2">
              <label>Trạng thái giao hàng:</label>
              <Select
                value={selectedOrder.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"}
                onChange={(value) =>
                  setSelectedOrder({
                    ...selectedOrder,
                    isDelivered: value === "Đã giao hàng",
                  })
                }
                style={{ width: "100%" }}
              >
                <Option value="Đã giao hàng">Đã giao hàng</Option>
                <Option value="Chưa giao hàng">Chưa giao hàng</Option>
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
