import React, { useEffect, useState } from "react";
import "./BlogComponent.scss";
import { Link } from "react-router-dom";
import * as PostService from "../../services/PostService";
import moment from "moment";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const BlogComponent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PostService.getAllPosts();
        setBlogs(data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);
  console.log("blogs", blogs);

  return (
    <div>
      <div className="container">
        <div className="blog-container">
          {blogs.length > 0 && (
            <div className="main-article">
              <Link to={`/blog/${blogs[0]._id}`}>
                <img
                  className="img-main"
                  src={blogs[0].image[0]}
                  alt="Main article"
                />
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "100%",
                }}
                to={`/blog/${blogs[0]._id}`}
              >
                <h2 className="main-title">{blogs[0].title}</h2>
              </Link>
              <div className="main-meta">
                <span>{moment(blogs[0].createdAt).format("DD/MM/YYYY")}</span>
                <span>•</span>
                <span>{blogs[0].readTime} phút đọc</span>
              </div>
              <p className="main-excerpt">
                {blogs[0].describe.slice(0, 100)}...
              </p>
            </div>
          )}
          <div className="sidebar">
            {blogs.slice(1, 5).map((post, index) => (
              <div key={index} className="sidebar-article">
                <Link to={`/blog/${post._id}`}>
                  <img
                    className="img-sidebar"
                    src={post.image[0]}
                    alt={`Image ${index}`}
                  />
                </Link>
                <div className="sidebar-content">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    to={`/blog/${post._id}`}
                  >
                    <h4 className="sidebar-title">{post.title}</h4>
                  </Link>
                  <div className="sidebar-meta">
                    <span>{moment(post.createdAt).format("DD/MM/YYYY")}</span>
                  </div>
                  <p className="sidebar-excerpt">
                    {post.describe.slice(0, 50)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogComponent;
