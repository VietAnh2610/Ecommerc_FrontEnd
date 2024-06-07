import React, { useEffect, useState } from "react";
import "./BlogPage.scss";
import { Link } from "react-router-dom";
import * as PostService from "../../services/PostService";
import moment from "moment";
const BlogPage = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PostService.getAllPosts();
        setBlogs(data.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchData();
  }, []);
  console.log('blogs',blogs)

  return (
    <div style={{ marginTop: 110 }}>
      <div className="menu-top d-flex align-items-center">
        <div className="container px-5">
          <div className="banner_content d-md-flex justify-content-between align-items-center">
            <div className="mb-3 mb-md-0">
              <h2 style={{ fontSize: 27 }}>Danh mục bài viết</h2>
              <p>Khám phá tin tức mới nhất</p>
            </div>
            <div className="page_link">
              <Link className="link" to="/" style={{ textDecoration: "none" }}>
                Trang chủ
              </Link>
              <Link className="link" style={{ textDecoration: "none" }}>
                Tin tức
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5 px-5">
        <div className="row">
          <div style={{ padding: 0 }} className="blog-left col-md-8 ">
            <h2>TIN TỨC CẬP NHẬT</h2>
            <span></span>
            {blogs.map((post, index) => (
            <div key={index} className="d-flex justify-content-between py-3">
              <img
                style={{ width: "35%", borderRadius: 5, marginRight: 20 , cursor:'pointer'}}
                src={post.image[0]}
              />
              <div style={{cursor:"pointer"}} className="">
                <h3 style={{ fontSize: 16 }}>
                  {post.title}
                </h3>
                <p>
                  {post.describe}
                </p>
                <div className="d-flex align-items-center">
                  <span style={{ marginRight: 10, color: "rgb(25, 108, 181)" }}>
                  {post.author}
                  </span>
                  <span style={{color:"#637381", fontSize:14}}><i style={{fontSize:14, marginRight:5}} class="fa-regular fa-clock"></i>{moment(post.createdAt).format("DD/MM/YYYY HH:mm:ss")}</span>
                </div>
              </div>
            </div>
                 ))}
          </div>
          <div
            style={{ padding: 0 }}
            className="col-md-4  blog-right "
          >
            <h2 style={{ marginRight: 100 }}>Xem nhiều tuần qua</h2>
            <span style={{ marginRight: 160 }}></span>
            
            <div className="aa">
              <img
                style={{ width: 300 }}
                src="https://cdn-media.sforum.vn/storage/app/media/Photo/2024/trannghia/iOS-17-5.jpeg"
              ></img>
              <p style={{ paddingLeft: 7 }} className="content-ios">
                Apple chính thức phát hành iOS 17.5 với phát hiện phụ kiện theo
                dõi đa nền tảng, tải ứng dụng từ trang web,...
              </p>
            </div>
            {blogs.map((post, index) => (
            <div style={{ width: "72%" , marginBottom:15}} className="d-flex">
              <h3 style={{ fontSize: 14 }}>
                {post.title}
              </h3>
              <img
                style={{ width: "40%", borderRadius: 5 }}
                src={post.image}
              ></img>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
