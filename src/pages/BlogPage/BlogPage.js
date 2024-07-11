import React, { useEffect, useState } from "react";
import "./BlogPage.scss";
import { Link } from "react-router-dom";
import * as PostService from "../../services/PostService";
import moment from "moment";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

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

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="menu-top d-flex align-items-center">
        <div className="container px-4">
          <div className="signup_header">
            <Link className="link-homepage" to="/">
              Trang chủ
            </Link>
            <p>/</p>
            <p style={{ color: "rgb(191, 191, 191)" }}>Sản phẩm</p>
          </div>
        </div>
      </div>
      <h1 style={{ marginTop: "1px", fontSize: "30px", fontWeight: "400" }}>
        Tin tức cập nhật
      </h1>
      <div className="container py-3 px-5">
        <div className="row">
          <div style={{ padding: 0 }} className="blog-left col-md-9 ">
            {currentPosts.map((post, index) => (
              <Link
                to={`/blog/${post._id}`}
                style={{ textDecoration: "none", color: "black" }}
                key={index}
              >
                <div className="d-flex blog-item py-3">
                  <img className="blog-image" src={post.image[0]} alt="post" />
                  <div className="blog-content">
                    <h3>{post.title}</h3>
                    <p>{post.describe}</p>
                    <div className="d-flex align-items-center">
                      <span
                        style={{ marginRight: 10, color: "rgb(25, 108, 181)" }}
                      >
                        {post.author}
                      </span>
                      <span style={{ color: "#637381", fontSize: 14 }}>
                        <i
                          style={{ fontSize: 14, marginRight: 5 }}
                          className="fa-regular fa-clock"
                        ></i>
                        {moment(post.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <div className="pagination">
              {[...Array(Math.ceil(blogs.length / postsPerPage)).keys()].map(
                (number) => (
                  <button
                    key={number}
                    className={`page-button ${
                      currentPage === number + 1 ? "active" : ""
                    }`}
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="blog-right col-md-3">
            <div className="category">
              <h3>DANH MỤC</h3>
              <ul className="category-list">
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/products">Sản phẩm</Link>
                </li>
                <li>
                  <Link to="/location">Hệ thống cửa hàng</Link>
                </li>
                <li>
                  <Link to="/introduce">Giới thiệu</Link>
                </li>
                <li>
                  <Link to="/blog">Tin tức</Link>
                </li>
              </ul>
            </div>
            <div className="featured-news">
              <h3>TIN NỔI BẬT</h3>
              {blogs.slice(0, 4).map((post, index) => (
                <Link
                  to={`/blog/${post._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                  key={index}
                >
                  <div className="d-flex py-2">
                    <img
                      style={{
                        width: "30%",
                        borderRadius: 5,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      src={post.image[0]}
                      alt="featured"
                    />
                    <div style={{ cursor: "pointer" }}>
                      <h4 style={{ fontSize: 14 }}>{post.title}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
