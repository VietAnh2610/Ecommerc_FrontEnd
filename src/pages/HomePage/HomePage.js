import React from "react";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartComponents from "../../components/CartComponents/CartComponents";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import * as  ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query';
const HomePage = () => {
  
  const fetchProductAll = async () => {
      const res = await ProductService.getAllProduct();
      return res
  };
  const { data: products} = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
  });




  return (
    <div className="Home">
     <HomeSlider/>
      <section className="feature-area px-5 ">
        <div className="container px-5">
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <div class="single-feature">
                <div class="title">
                  <i class="fa-solid fa-sack-dollar"></i>
                  <h3>Mua nhiều giảm nhiều</h3>
                </div>
                <p>Giảm giá lên tận 50%</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="single-feature">
                <div class="title">
                  <i class="fa-solid fa-cart-flatbed"></i>
                  <h3>Miễn phí vận chuyển</h3>
                </div>
                <p>Phạm vi trong khoảng 5km</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="single-feature">
                <div class="title">
                  <i class="fa-solid fa-headset"></i>
                  <h3>Sẵn sàng hỗ trợ</h3>
                </div>
                <p>Chỉ cần liên hệ với chúng tôi</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="single-feature">
                <div class="title">
                  <i class="fa-solid fa-shield-heart"></i>
                  <h3>An toàn thanh toán</h3>
                </div>
                <p>Các cổng thanh toán uy tín</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature_product_area">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div class="main_title">
              <h2>
                <span>Sản phẩm nổi bật</span>
              </h2>
              <p>Bạn sẽ không thất vọng khi lựa chọn</p>
            </div>
          </div>
        </div>
      </section>
      <div className="col-lg-9  container px-5 ">
        <div className="products row d-flex flex-wrap">
          {products?.data?.map((product) => {
            return(
              <CartComponents
              key={product._id}
              id={product._id}
              countInStock={product.countInStock}
              descriptions={product.description}
              image={product.image}
              name={product.name}
              price={product.price}
              rating={product.rating}
              type={product.type}
              original_price={product.original_price} 
              />
            )
          })}
      
        </div>
      </div>

      <section className="offer-area">
        <div className="py-3">
          <img
            className="offer-area-img"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/robot-hut-bui-roborock-s8-max-ultra-slide-11-04-24.jpg"
          ></img>
        </div>
      </section>
      {/* <section className="new_product_area py-5 container">
        <div className="row new_product_area-left justify-content-center">
          <div className="col-lg-12">
            <div class="main_title">
              <h2>
                <span>Sản phẩm mới</span>
              </h2>
              <p>Những sản phẩm vừa ra mắt mới lạ cuốn hút người xem</p>
            </div>
          </div>
        </div>
        <div class="row px-5">
          <div class="col-lg-6">
            <div class="new_product">
              <h5 class="text-uppercase">Bộ sưu tập năm 2024</h5>
              <h3 class="text-uppercase">Công nghệ mới</h3>
              <div class="product-img">
                <img
                  class="img-fluid"
                  src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/54/236016/tai-nghe-bluetooth-airpods-2-apple-mv7n2-trang-200923-112201-600x600.jpg"
                  alt=""
                />
              </div>
              <h4>
                12.000.000 <span>VND</span>
              </h4>
              <a href="#" class="main_btn">
                Add to cart
              </a>
            </div>
          </div>

          <div class="col-lg-6 mt-5 mt-lg-0 ">
            <div class="row ">
            <div class="col-lg-6 col-md-6 ">
                <div class="single-product ">
                  <div class="product-img">
                    <img
                      class="3"
                      src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-xanh-duong-thumb-1-600x600.jpg"
                      alt=""
                    />
                    <div class="p_icon">
                      <Link to="/product-detail">
                        <i class="fa-regular fa-eye"></i>
                      </Link>

                      <a href="#">
                        <i class="fa-regular fa-heart"></i>
                      </a>
                      <a href="#">
                        <i class="fa-solid fa-cart-plus"></i>
                      </a>
                    </div>
                  </div>
                  <div class="product-btm">
                    <Link href="#" class="d-block">
                      <p>ĐỒNG HỒ ĐEO TAY</p>
                    </Link>
                    <div class="mt-3 cart-title">
                      <span class="mr-4">đ146,999 </span>
                      <del>đ300,000</del>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 ">
                <div class="single-product">
                  <div class="product-img">
                    <img
                      class="3"
                      src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-xanh-duong-thumb-1-600x600.jpg"
                      alt=""
                    />
                    <div class="p_icon">
                      <Link to="/product-detail">
                        <i class="fa-regular fa-eye"></i>
                      </Link>

                      <a href="#">
                        <i class="fa-regular fa-heart"></i>
                      </a>
                      <a href="#">
                        <i class="fa-solid fa-cart-plus"></i>
                      </a>
                    </div>
                  </div>
                  <div class="product-btm">
                    <Link href="#" class="d-block">
                      <p>ĐỒNG HỒ ĐEO TAY</p>
                    </Link>
                    <div class="mt-3 cart-title">
                      <span class="mr-4">đ146,999 </span>
                      <del>đ300,000</del>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 ">
                <div class="single-product">
                  <div class="product-img">
                    <img
                      class="3"
                      src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-xanh-duong-thumb-1-600x600.jpg"
                      alt=""
                    />
                    <div class="p_icon">
                      <Link to="/product-detail">
                        <i class="fa-regular fa-eye"></i>
                      </Link>

                      <a href="#">
                        <i class="fa-regular fa-heart"></i>
                      </a>
                      <a href="#">
                        <i class="fa-solid fa-cart-plus"></i>
                      </a>
                    </div>
                  </div>
                  <div class="product-btm">
                    <Link href="#" class="d-block">
                      <p>ĐỒNG HỒ ĐEO TAY</p>
                    </Link>
                    <div class="mt-3 cart-title">
                      <span class="mr-4">đ146,999 </span>
                      <del>đ300,000</del>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 ">
                <div class="single-product">
                  <div class="product-img">
                    <img
                      class="3"
                      src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/7077/316007/apple-watch-se-2023-40mm-vien-nhom-day-silicone-xanh-duong-thumb-1-600x600.jpg"
                      alt=""
                    />
                    <div class="p_icon">
                      <Link to="/product-detail">
                        <i class="fa-regular fa-eye"></i>
                      </Link>

                      <a href="#">
                        <i class="fa-regular fa-heart"></i>
                      </a>
                      <a href="#">
                        <i class="fa-solid fa-cart-plus"></i>
                      </a>
                    </div>
                  </div>
                  <div class="product-btm">
                    <Link href="#" class="d-block">
                      <p>ĐỒNG HỒ ĐEO TAY</p>
                    </Link>
                    <div class="mt-3 cart-title">
                      <span class="mr-4">đ146,999 </span>
                      <del>đ300,000</del>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section> */}
      <section className="">
      <div className="row new_product_area-left justify-content-center ">
          <div className="col-lg-12">
            <div class="main_title">
              <h2>
                <span>bài viết mới nhất</span>
              </h2>
              <p>Những bài blog về thời trang mới nhất</p>
            </div>
          </div>
        </div>
      </section>
      <FooterComponent/>
    </div>
  );
};

export default HomePage;
