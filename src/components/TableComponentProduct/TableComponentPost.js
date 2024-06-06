import React, { useState, useEffect } from "react";
import { Table, Input, Modal, Form, Button, Select } from "antd";
import * as PostService from "../../services/PostService";
import { useQuery } from "@tanstack/react-query";
import "./TableComponent.scss";
import { getBase64 } from "../../utils";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";
import PostDetail from "../PostDetails/PostDetails"; // Import the PostDetail component
import TinymceEditor from "../TinymceEditor/TinymceEditor";
import moment from 'moment';
const { Option } = Select;

const TableComponentPost = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false); // State for detail modal
  const [form] = Form.useForm();
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const [accessToken, setAccessToken] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [content, setContent] = useState(""); // Define content state

  const handleEditorChange = (content) => {
    // Define handleEditorChange function
    setContent(content);
  };
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const cleanToken = token.replace(/(^"|"$)/g, "");
      setAccessToken(cleanToken);
    }
  }, []);

  const fetchPostAll = async () => {
    try {
      setLoading(true);
      const res = await PostService.getAllPosts();
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      console.error("Lỗi khi tải dữ liệu bài viết:", error);
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

  const { data: post, refetch } = useQuery({
    queryKey: ["post"],
    queryFn: fetchPostAll,
  });

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleEditPost = (record) => {
    setSelectedPost(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
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
      await PostService.updatePost(
        selectedPost._id,
        {
          ...values,
          image: base64Images,
          content: content, // Make sure to include content in the update payload
        },
        accessToken
      );
      setIsModalVisible(false);
      form.resetFields();
      setLoading(false);
      await refetch();
      toast.success("Cập nhật bài viết thành công!");
    } catch (error) {
      console.error("Lỗi khi lưu thông tin bài viết:", error);
      setLoading(false);
    }
  };
  

  const handleDeletePost = async (postId) => {
    try {
      Modal.confirm({
        title: `Bạn chắc chắn muốn xóa ${
          selectedRowKeys.length > 1
            ? `${selectedRowKeys.length} bài viết`
            : "bài viết"
        }?`,
        centered: true,
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        onOk: async () => {
          setLoading(true);
          await Promise.all(
            (postId ? [postId] : selectedRowKeys).map((id) => {
              return PostService.deletePost(id, accessToken);
            })
          );
          await refetch();
          setLoading(false);
          toast.success("Xóa bài viết thành công!");
          setSelectedRowKeys([]);
        },
        onCancel() {
          console.log("Hủy xóa bài viết");
        },
      });
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      setLoading(false);
      toast.error("Đã xảy ra lỗi khi xóa bài viết");
    }
  };

  const handleViewDetail = (record) => {
    setSelectedPost(record);
    setIsDetailModalVisible(true);
  };

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text) => <h5 style={{fontSize:14, fontWeight:600, width:200}}>{text}</h5>,
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      sorter: (a, b) => a.author.length - b.author.length,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <>
          {Array.isArray(image) && (
            <img
              src={image[0]}
              alt={"ảnh bài viết"}
              style={{ width: "70px", marginRight: "5px" }}
            />
          )}
        </>
      ),
    },
    {
        title: "Ngày đăng",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
      },
    {
      title: "Mô tả",
      dataIndex: "describe",
      key: "describe",
    },
    // {
    //   title: "Nội dung",
    //   dataIndex: "content",
    //   key: "content",
    //   render: (content) => (
    //     <div dangerouslySetInnerHTML={{ __html: content }} />
    //   ),
    // },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => (
        <div style={{ width: 150 }} className="d-flex">
          <button
            onClick={() => handleEditPost(record)}
            style={{
              marginRight: 6,
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
          <button
            onClick={() => handleDeletePost(record._id)}
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
            onClick={() => handleViewDetail(record)}
            style={{
              marginRight: 6,
              backgroundColor: "rgb(159, 250, 157)",
              border: "none",
            }}
            className="btn btn-primary btn-sm view"
            title="Xem"
          >
            <i
              style={{ color: "rgb(115, 207, 23)" }}
              className="fas fa-eye"
            ></i>
          </button>
        </div>
      ),
    },
  ];

  const filteredData = post?.data.filter((post) =>
    post.title.toLowerCase().includes(searchText.toLowerCase())
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
                bài viết
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
          onClick={() => handleDeletePost(null)}
        >
          <i
            style={{ marginRight: 5, color: "rgb(222, 4, 0)" }}
            className="fa-solid fa-trash-can"
          ></i>
          Xóa bài viết đã chọn ({selectedRowKeys.length})
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

      {/* Post Detail Modal */}
      <PostDetail
        post={selectedPost}
        visible={isDetailModalVisible}
        onClose={() => setIsDetailModalVisible(false)}
      />

<Modal
  title="Chỉnh sửa bài viết"
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
  width={"70%"} // Set the width to your desired value, such as 800px
>
        {loading && <LoadingComponent />}
        <Form form={form}>
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tác giả"
            name="author"
            rules={[{ required: true, message: "Vui lòng nhập tác giả" }]}
          >
            <Input />
          </Form.Item>

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
                        alt={`Ảnh bài viết ${index}`}
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
            label="Mô tả"
            name="describe"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả bài viết" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nội dung"
            name="content"
            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
          >
            <TinymceEditor
              value={content} // Pass value prop
              onEditorChange={handleEditorChange} // Ensure you have this function defined
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableComponentPost;
