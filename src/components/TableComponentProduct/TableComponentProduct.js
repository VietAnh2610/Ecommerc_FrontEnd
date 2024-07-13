import React, { useState, useEffect } from "react";
import { Table, Input, Modal, Form, Button, Select } from "antd";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import "./TableComponent.scss";
import { getBase64 } from "../../utils";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";
const { Option } = Select;

const TableComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const cleanToken = token.replace(/(^"|"$)/g, "");
      setAccessToken(cleanToken);
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await ProductService.getAllTypeProduct();
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách danh mục:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProductAll = async () => {
    try {
      setLoading(true);
      const res = await ProductService.getAllProduct();
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
      throw error;
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    try {
      for (const file of files) {
        const base64Image = await getBase64(file);
        if (!imageUrls.includes(base64Image)) {
          setImageUrls((prevUrls) => [...prevUrls, base64Image]);
        }
      }
    } catch (error) {
      console.error("Lỗi khi chuyển đổi ảnh thành base64:", error);
    }
  };

  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
  });

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleEditProduct = (record) => {
    setSelectedProduct(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);

    if (record.type && categories.includes(record.type)) {
      setNewCategory(false); 
    } else {
      setNewCategory(true); 
    }

    const images = Array.isArray(record.image) ? record.image : [];
    setImageUrls(images);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const base64Images = imageUrls.map((url) => {
        const base64Prefix = "data:image/jpeg;base64,";
        return url.startsWith(base64Prefix)
          ? url
          : base64Prefix + url.split(",")[1];
      });

      let sizes = values.size;
      let colors = values.color;
      if (Array.isArray(values.size)) {
        sizes = values.size.map((size) => size.trim()).filter(Boolean);
      } else {
        sizes = values.size.split(",").map((size) => size.trim());
      }
      if (Array.isArray(values.color)) {
        colors = values.color.map((color) => color.trim()).filter(Boolean);
      } else {
        colors = values.color.split(",").map((color) => color.trim());
      }

      let categoryValue = values.category;
      if (values.category === "new") {
        categoryValue = values.newCategory;
      }

      await ProductService.updateProduct(
        selectedProduct._id,
        {
          ...values,
          type: categoryValue,
          image: base64Images,
          size: sizes,
          color: colors,
        },
        accessToken
      );

      setIsModalVisible(false);
      form.resetFields();
      setLoading(false);
      await refetch();
      toast.success("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi lưu thông tin sản phẩm:", error);
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      Modal.confirm({
        title: `Bạn chắc chắn muốn xóa ${
          selectedRowKeys.length > 1
            ? `${selectedRowKeys.length} sản phẩm`
            : "sản phẩm"
        }?`,
        centered: true,
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        onOk: async () => {
          setLoading(true);
          await Promise.all(
            (productId ? [productId] : selectedRowKeys).map((id) => {
              return ProductService.deleteProduct(id, accessToken);
            })
          );
          setLoading(false);
          toast.success("Xóa sản phẩm thành công!");
          setSelectedRowKeys([]);
          await refetch();
        },
        onCancel() {
          console.log("Hủy xóa sản phẩm");
        },
      });
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setLoading(false);
      toast.error("Đã xảy ra lỗi khi xóa sản phẩm");
    }
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <>
          {Array.isArray(image) && image.length > 0 && (
            <img
              src={image[0]} 
              alt={"ảnh sản phẩm"}
              style={{ width: "70px", marginRight: "5px" }}
            />
          )}
        </>
      ),
    },
    {
      title: "Giá gốc",
      dataIndex: "original_price",
      key: "original_price",
      sorter: (a, b) =>
        parseFloat(a.original_price.replaceAll(".", "").replace(",", ".")) -
        parseFloat(b.original_price.replaceAll(".", "").replace(",", ".")),
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) =>
        parseFloat(a.price.replaceAll(".", "").replace(",", ".")) -
        parseFloat(b.price.replaceAll(".", "").replace(",", ".")),
    },
    {
      title: "Danh mục",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Số lượng",
      dataIndex: "countInStock",
      key: "countInStock",
      sorter: (a, b) => a.countInStock - b.countInStock,
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
      render: (sizes) => sizes.join(", "),
      sorter: (a, b) => a.size.length - b.size.length,
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
      render: (colors) => colors.join(", "),
      sorter: (a, b) => a.colors.length - b.colors.length,
    },
    {
      title: "Tình trạng",
      dataIndex: "countInStock",
      key: "status",
      render: (countInStock) => (
        <span
          className={countInStock > 0 ? "badge bg-success" : "badge bg-danger"}
        >
          {countInStock > 0 ? "Còn hàng" : "Hết hàng"}
        </span>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <div style={{ width: 110 }} className="d-flex ">
          <button
            onClick={() => handleDeleteProduct(record._id)}
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
            onClick={() => handleEditProduct(record)}
            style={{
              backgroundColor: "rgb(250, 226, 197)",
              border: "none",
            }}
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
        </div>
      ),
    },
  ];

  const filteredData = products?.data.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

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
          onClick={() => handleDeleteProduct(null)}
        >
          <i
            style={{ marginRight: 5, color: "rgb(222, 4, 0)" }}
            className="fa-solid fa-trash-can"
          ></i>
          Xóa sản phẩm đã chọn ({selectedRowKeys.length})
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
        title="Chỉnh sửa sản phẩm"
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
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>

          {/* Trường ảnh để người dùng tải lên */}
          <Form.Item label="Ảnh" name="image">
            <div>
              <label
                style={{ marginTop: 0 }}
                htmlFor="avatarInput"
                className="file-label1"
              >
                <i
                  style={{ marginRight: 5 }}
                  className="fa-solid fa-cloud-arrow-up"
                ></i>
                <p>Tải lên ảnh</p>
                <input
                  style={{ display: "none" }}
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                />
              </label>

              <div className="d-flex">
                {imageUrls &&
                  imageUrls.map((url, index) => (
                    <div key={index}>
                      <img
                        src={url}
                        alt={`Ảnh sản phẩm ${index}`}
                        style={{
                          width: "100px",
                          marginTop: "10px",
                          marginRight: "10px",
                        }}
                      />
                      <button
                        className="delete_image_update"
                        onClick={() => {
                          // Xóa URL của ảnh khỏi mảng imageUrls
                          setImageUrls((prevUrls) =>
                            prevUrls.filter((u) => u !== url)
                          );
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </Form.Item>

          <Form.Item
            label="Giá gốc"
            name="original_price"
            rules={[
              { required: true, message: "Vui lòng nhập giá gốc sản phẩm" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá bán"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá bán" }]}
          >
            <Input type="string" />
          </Form.Item>
          <Form.Item label="Danh mục" name="category">
            <Select
              placeholder="Chọn danh mục hoặc thêm mới"
              // defaultValue={selectedProduct?.type}
            
              onChange={(value) => {
                if (value === "new") {
                  setNewCategory(true);
                } else {
                  setNewCategory(false); 
                }
              }}
            >
                
              {categories.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
              <Option value="new">Thêm danh mục mới</Option>
            </Select>
          </Form.Item>

          {newCategory && (
            <Form.Item
              label="Danh mục mới"
              name="newCategory"
              rules={[
                { required: true, message: "Vui lòng nhập danh mục mới" },
              ]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label="Số lượng"
            name="countInStock"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="size"
            label="Kích thước"
            rules={[{ required: true, message: "Vui lòng nhập kích thước!" }]}
          >
            <Input placeholder="Nhập kích thước (cách nhau bởi dấu phẩy)" />
          </Form.Item>
          <Form.Item
            name="color"
            label="Màu sắc"
            rules={[{ required: true, message: "Vui lòng nhập màu sắc!" }]}
          >
            <Input placeholder="Nhập màu sắc (cách nhau bởi dấu phẩy)" />
          </Form.Item>
          <Form.Item
            name="countInStock"
            label="Số lượng"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <Input type="number" placeholder="Nhập số lượng" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm" },
            ]}
          >
            <textarea
              className="input_description"
              style={{
                width: "100%",
                height: 150,
                borderRadius: 5,
                padding: 5,
              }}
              type="number"
            ></textarea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableComponent;
