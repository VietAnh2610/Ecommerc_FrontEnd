import React from "react";
import { Modal, Descriptions } from "antd";
import "./PostDetails.scss";
import moment from "moment";
const PostDetail = ({ post, visible, onClose }) => {
  if (!post) {
    return null;
  }

  return (
    <Modal
      title="Chi tiết bài viết"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={"70%"}
    >
      <Descriptions bordered column={1} layout="horizontal">
        {/* <Descriptions.Item label="Tiêu đề">
          {post.title}
        </Descriptions.Item>
        <Descriptions.Item label="Tác giả">
          {post.author}
        </Descriptions.Item>
        <Descriptions.Item label="Ảnh">
          {post.image && post.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`ảnh bài viết ${index}`}
              style={{ marginRight: 8, width: 100, height: 100 }}
            />
          ))}
        </Descriptions.Item> */}
        {/* <Descriptions.Item label="Mô tả">
          {post.describe}
        </Descriptions.Item> */}
        <Descriptions.Item label="Nội dung">
          <div className="content-img">
            {post.image &&
              post.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`ảnh bài viết ${index}`}
                  style={{
                    marginRight: 8,
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                  }}
                />
              ))}
          </div>
          <div className="content-body">
            <div
              className="d-flex justify-content-center py-1"
              style={{
                backgroundColor: "var(--text-color)",
                width: 100,
                textAlign: "center",
                color: "white",
                borderRadius: 5,
              }}
            >
              <span style={{ fontSize: 16 }}>Thủ thuật</span>
            </div>
            <h1 style={{ fontSize: 28, marginTop: 20 }}>{post.title}</h1>
            <div
              style={{ height: 50 }}
              className="d-flex justify-content-between align-items-center my-4"
            >
              <div className="d-flex ">
                <img
                  style={{ width: "20%", marginRight: 10 }}
                  src="https://static.cellphones.com.vn/img/smember.ab0728d.svg"
                />
                <div style={{ width: 200 }}>
                  <span
                    style={{
                      fontSize: 15,
                      color: "var(--text-color)",
                      textTransform: "uppercase",
                    }}
                  >
                    {post.author}
                  </span>{" "}
                  <br></br>
                 <span style={{fontSize:11}}> <i style={{marginRight:5}} class="fa-regular fa-calendar"></i>Ngày đăng:  {moment(post.createdAt).format("DD/MM/YYYY")}</span>
                </div>
              </div>
              <img
                style={{ width: "20%", height: 30 }}
                src="https://cellphones.com.vn/sforum/_next/image?url=https%3A%2F%2Fcdn-static.sforum.vn%2Fsforum%2F_next%2Fstatic%2Fmedia%2Fgg-sforum.5aeb923e.png&w=1200&q=75"
              />
            </div>
            <strong> {post.describe}</strong>
            <div
              style={{ marginTop: 30 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default PostDetail;
