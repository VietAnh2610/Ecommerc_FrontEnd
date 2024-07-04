import React from "react";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartComponents from "../../components/CartComponents/CartComponents";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
  });

  return (
    <div className="Home">
      <HomeSlider />
      <div className="container py-3">
        <div className="row">
          <div className="col-md-6 col-lg-3 col-6 mb-4 homepage-itroduce">
            <div className="img-homepage-intro">
              <img src="https://theme.hstatic.net/200000696635/1001199686/14/policies_icon_1.png?v=8" />
            </div>
            <div className="text-homepage-intro">
              <p>Miễn phí vận chuyển</p>
              <span>Nhận hàng trong vòng 3 ngày</span>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 col-6 mb-4 homepage-itroduce">
            <div className="img-homepage-intro">
              <img src="https://theme.hstatic.net/200000696635/1001199686/14/policies_icon_1.png?v=8" />
            </div>
            <div className="text-homepage-intro">
              <p>Miễn phí vận chuyển</p>
              <span>Nhận hàng trong vòng 3 ngày</span>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 col-6 mb-4 homepage-itroduce">
            <div className="img-homepage-intro">
              <img src="https://theme.hstatic.net/200000696635/1001199686/14/policies_icon_1.png?v=8" />
            </div>
            <div className="text-homepage-intro">
              <p>Miễn phí vận chuyển</p>
              <span>Nhận hàng trong vòng 3 ngày</span>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 col-6 mb-4 homepage-itroduce">
            <div className="img-homepage-intro">
              <img src="https://theme.hstatic.net/200000696635/1001199686/14/policies_icon_1.png?v=8" />
            </div>
            <div className="text-homepage-intro">
              <p>Miễn phí vận chuyển</p>
              <span>Nhận hàng trong vòng 3 ngày</span>
            </div>
          </div>
        </div>
      </div>

      <section className="container">
        <div className="row justify-content-center text-align-center">
          <section className="feature_product_area">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div class="main_title">
                  <h2>
                    <span>Thời trang EGA</span>
                  </h2>
                  <p>Danh mục sản phẩm dành cho bạn</p>
                </div>
              </div>
            </div>
          </section>
          <div className="col-md-6 col-lg-2 col-6 d-flex flex-column align-items-center mb-4 hover-product">
            <div className="img-homepage-intro">
              <img
                src="https://theme.hstatic.net/200000696635/1001199686/14/season_coll_1_img_large.png?v=8"
                className="img-fluid mx-auto"
              />
            </div>
            <div className="text-homepage-products text-center">
              <p className="mb-0">Áo khoác</p>
              <p className="hihi">8 sản phẩm</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-2 col-6 d-flex flex-column align-items-center mb-4 hover-product">
            <div className="img-homepage-intro">
              <img
                src="https://theme.hstatic.net/200000696635/1001199686/14/season_coll_2_img_large.png?v=8"
                className="img-fluid mx-auto"
              />
            </div>
            <div className="text-homepage-products text-center">
              <p className="mb-0">Áo sơ mi</p>
              <p className="hihi">8 sản phẩm</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-2 col-6 d-flex flex-column align-items-center mb-4 hover-product">
            <div className="img-homepage-intro">
              <img
                src="https://theme.hstatic.net/200000696635/1001199686/14/season_coll_3_img_large.png?v=8"
                className="img-fluid mx-auto"
              />
            </div>
            <div className="text-homepage-products text-center">
              <p className="mb-0">Áo thun</p>
              <p className="hihi">8 sản phẩm</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-2 col-6 d-flex flex-column align-items-center mb-4 hover-product">
            <div className="img-homepage-intro">
              <img
                src="https://theme.hstatic.net/200000696635/1001199686/14/season_coll_4_img_large.png?v=8"
                className="img-fluid mx-auto"
              />
            </div>
            <div className="text-homepage-products text-center">
              <p className="mb-0">Quần dài nam</p>
              <p className="hihi">8 sản phẩm</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-2 col-6 d-flex flex-column align-items-center mb-4 hover-product">
            <div className="img-homepage-intro">
              <img
                src="https://theme.hstatic.net/200000696635/1001199686/14/season_coll_5_img_large.png?v=8"
                className="img-fluid mx-auto"
              />
            </div>
            <div className="text-homepage-products text-center">
              <p className="mb-0">Quần jeans</p>
              <p className="hihi">8 sản phẩm</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-2 col-6 d-flex flex-column align-items-center mb-4 hover-product">
            <div className="img-homepage-intro">
              <img
                src="https://theme.hstatic.net/200000696635/1001199686/14/season_coll_6_img_large.png?v=8"
                className="img-fluid mx-auto"
              />
            </div>
            <div className="text-homepage-products text-center">
              <p className="mb-0">Quần short</p>
              <p className="hihi">8 sản phẩm</p>
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
            return (
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
            );
          })}
        </div>
      </div>

      <section className="all-product"  onClick={() => navigate("/products")} style={{cursor: "pointer"}}>
        <p>Xem tất cả</p>
        <i class="fa-solid fa-chevron-right"></i>
      </section>


      <section className="offer-area">
        <div className="py-3">
          <img
            className="offer-area-img"
            src="https://theme.hstatic.net/200000690725/1001078549/14/slide_4_img.jpg?v=418"
          />
        </div>
      </section>
  

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
    </div>
  );
};

export default HomePage;
