import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as PostService from "../../services/PostService";
import moment from "moment";
import "./BlogPageDetails.scss";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const BlogPageDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await PostService.getPostById(id);
        setPost(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <LoadingComponent />;
  if (error) return <div>Error loading post: {error.message}</div>;

  return (
    <div style={{ marginTop: 110 }} className="blog-detail-container">
      <div className="container py-5 px-5">
        <div className="row">
          <div className="content-img">
            <img
              src={post?.data.image}
              style={{
                marginRight: 8,
                width: "100%",
                height: "100%",
                borderRadius: 20,
              }}
            />
          </div>
          <div className="px-4">
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
              <h1 style={{ fontSize: 28, marginTop: 20 }}>
                {post?.data.title}
              </h1>
              <div
                style={{ height: 50 }}
                className="d-flex justify-content-between align-items-center my-4"
              >
                <div className="d-flex">
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
                      {post?.data.author}
                    </span>{" "}
                    <br></br>
                    <span style={{ fontSize: 11 }}>
                      <i
                        style={{ marginRight: 5 }}
                        className="fa-regular fa-calendar"
                      ></i>
                      Ngày đăng: {moment(post?.data.createdAt).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </div>
                <img
                  style={{ width: "20%", height: 30 }}
                  src="https://cellphones.com.vn/sforum/_next/image?url=https%3A%2F%2Fcdn-static.sforum.vn%2Fsforum%2F_next%2Fstatic%2Fmedia%2Fgg-sforum.5aeb923e.png&w=1200&q=75"
                />
              </div>
              <strong>{post?.data.describe}</strong>
              <div
                style={{ marginTop: 30 }}
                dangerouslySetInnerHTML={{ __html: post?.data.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPageDetails;
