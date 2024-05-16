import React, { useState, useEffect } from "react";
import { Table, Input, Modal, Form, Button, message } from "antd";
import * as UserService from "../../services/UserService";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { toast } from 'react-toastify';
import { getBase64 } from "../../utils";

const TableComponentUser = () => {
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [accessToken, setAccessToken] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State để lưu trữ các hàng được chọn
  
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        const cleanToken = token.replace(/(^"|"$)/g, "");
        setAccessToken(cleanToken);
      }
    }, []);
  
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await UserService.getAllUser(accessToken);
        setLoading(false);
        setUsers(res.data);
        console.log('Fetched Users:', res.data);
      } catch (error) {
        setLoading(false);
        console.error("Lỗi khi tải danh sách người dùng:", error);
      }
    };
  
    useEffect(() => {
      if (accessToken) {
        fetchUsers();
      }
    }, [accessToken]);
  
    const handlePageChange = (page, pageSize) => {
      setCurrentPage(page);
      setPageSize(pageSize);
    };
  
    const handleSearch = (e) => {
      const value = e.target.value;
      setSearchText(value);
    };
  
    const handleEditUser = (record) => {
      console.log('Selected User for Edit:', record);
      setSelectedUser(record);
      setIsModalVisible(true);
      form.setFieldsValue(record);
      setAvatarUrl(record.avatar || null);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
      form.resetFields();
      setAvatarUrl(null);
    };
  
    const handleDeleteUser = async (userIds) => {
      try {
        Modal.confirm({
            title: `Bạn chắc chắn muốn xóa ${userIds.length > 1 ? `${userIds.length} người dùng` : 'người dùng'}?`,
          centered: true,
          okText: 'Xóa',
          okType: 'danger',
          cancelText: 'Hủy',
          onOk: async () => {
            setLoading(true);
            await Promise.all(userIds.map(id => UserService.deleteUser(id, accessToken)));
            setLoading(false);
            await fetchUsers();
            toast.success('Xóa người dùng thành công!');
          },
          onCancel() {
            console.log('Hủy xóa người dùng');
          },
        });
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        setLoading(false);
        toast.error('Đã xảy ra lỗi khi xóa người dùng');
      }
    };
  
    const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const base64Image = await getBase64(file);
          setAvatarUrl(base64Image);
        } catch (error) {
          console.error("Lỗi khi chuyển đổi ảnh thành base64:", error);
          Modal.error({
            content: "Đã xảy ra lỗi khi tải lên ảnh.",
            centered: true,
          });
        }
      }
    };
  
    const handleSave = async () => {
      try {
        setLoading(true);
        const values = await form.validateFields();
        console.log('Form Values:', values);
        console.log('Selected User ID:', selectedUser?._id);
  
        await UserService.updateUser(selectedUser._id, { ...values, avatar: avatarUrl }, accessToken);
        setIsModalVisible(false);
        form.resetFields();
        setLoading(false);
        await fetchUsers();
        toast.success("Cập nhật người dùng thành công!");
      } catch (error) {
        console.error("Lỗi khi lưu thông tin người dùng:", error);
        setLoading(false);
        toast.error("Đã xảy ra lỗi khi lưu thông tin người dùng");
      }
    };
  
    const columns = [
      {
        title: "Tên",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Mật khẩu",
        dataIndex: "password",
        key: "password",
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Nickname",
        dataIndex: "nickname",
        key: "nickname",
      },
      {
        title: "Avatar",
        dataIndex: "avatar",
        key: "avatar",
        render: (avatar) => (
          <img src={avatar} alt="Avatar" style={{ width: 50, borderRadius: "50%" }} />
        ),
      },
      {
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Chức năng",
        dataIndex: "operation",
        key: "operation",
        render: (_, record) => (
          <div style={{ width: 110 }} className="d-flex ">
            <button
              style={{
                marginRight: 6,
                backgroundColor: "rgb(247, 196, 195)",
                border: "none",
              }}
              className="btn btn-primary btn-sm trash"
              title="Xóa"
              onClick={() => handleDeleteUser([record._id])}
            >
              <i style={{ color: "rgb(222, 4, 0)" }} className="fas fa-trash-alt"></i>
            </button>
            <button
              onClick={() => handleEditUser(record)}
              style={{ backgroundColor: "rgb(250, 226, 197)", border: "none" }}
              className="btn btn-primary btn-sm edit"
              title="Sửa"
            >
              <i style={{ color: "rgb(245, 158, 59)" }} className="fas fa-edit"></i>
            </button>
          </div>
        ),
      },
    ];
  
    const filteredUsers = searchText ? users.filter((user) => {
      if (user && user.name) {
        return user.name.toLowerCase().includes(searchText.toLowerCase());
      }
      return false;
    }) : users;
  
    // Cấu hình rowSelection để chọn nhiều hàng
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
      },
    };
  
    return (
      <div>
        {loading && <LoadingComponent />}
        <div className="py-4 ">
          <div className="row d-flex justify-content-between">
            <div className="col-sm-12 col-md-6 d-flex align-items-center ">
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
                    className="form-control form-control-sm "
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  >
                    <option value="8">8</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>{" "}
                  <i className="fa-solid fa-angle-down"></i>
                  danh mục
                </label>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div id="sampleTable_filter" className="dataTables_filter">
                <label style={{ fontSize: 14 }} className="d-flex justify-content-between">
                  Tìm kiếm:
                  <input type="search" placeholder="" onChange={handleSearch} />
                </label>
              </div>
            </div>
          </div>
          <Button className="delete_list_user"
        type="danger"
        onClick={() => handleDeleteUser(selectedRowKeys)}
        disabled={selectedRowKeys.length === 0}
        style={{ marginBottom: 16 }}
      >
       <i style={{marginRight:5, color:'rgb(222, 4, 0)'}} class="fa-solid fa-trash-can"></i> Xóa người dùng đã chọn  ({selectedRowKeys.length})
      </Button>
        </div>
        <Table
        rowSelection={rowSelection}
        dataSource={filteredUsers}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredUsers.length,
          onChange: handlePageChange,
          showSizeChanger: true,
        }}
        rowKey="_id"
      />

   

      <Modal
        title="Chỉnh sửa người dùng"
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
        {loading && <LoadingComponent />}
        <Form form={form}>
          <Form.Item
            label="Tên"
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nickname"
            name="nickname"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ảnh"
            name="avatar"
            rules={[{ required: true, message: "Vui lòng tải lên ảnh" }]}
          >
            <div>
              <label style={{ marginTop: 0 }} htmlFor="avatarInput" className="file-label1">
                <i style={{ marginRight: 5 }} className="fa-solid fa-cloud-arrow-up"></i>
                <p>Tải lên ảnh</p>
                <input
                  style={{ display: 'none' }}
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              {avatarUrl && (
                <div>
                  <img
                    src={avatarUrl}
                    alt="Ảnh sản phẩm"
                    style={{
                      width: "100px",
                      marginTop: "10px",
                      marginRight: "10px",
                    }}
                  />
                  <button
                    className="delete_image_update"
                    onClick={() => setAvatarUrl(null)}
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableComponentUser;
