import React from "react";
import "./ProductsPage.scss";
import CartComponents from "../../components/CartComponents/CartComponents";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const ProductsPage = () => {
  return (
    <div>
      <div className="menu-top d-flex align-items-center">
        <div className="container">
          <div class="banner_content d-md-flex justify-content-between align-items-center">
            <div class="mb-3 mb-md-0">
              <h2 style={{fontSize:27}}>Danh mục cửa hàng</h2>
              <p>Hãy lựa chọn sản phẩm phù hợp cho chính mình</p>
            </div>
            <div class="page_link">
              <Link className="link" to='/' style={{ textDecoration: 'none',  }}>Trang chủ</Link> 
              <Link className="link" style={{ textDecoration: 'none', }}>Cửa hàng</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="homepage">
          <div className="row">
            <div className="col-lg-3  ">
              <div className="category">
                <div className="category_title">
                  <h3>Danh mục sản phẩm</h3>
                </div>
                <div>
                  <ul className="category_list">
                 <div className="d-flex category_list-item align-items-center"> <i class="fa-regular fa-circle"></i><li>Đồng hồ</li></div>
                  <div className="d-flex  category_list-item align-items-center"><i class="fa-regular fa-circle"></i><li>Quần</li></div>
                  <div className="d-flex category_list-item  align-items-center"><i class="fa-regular fa-circle"></i><li>Áo</li></div>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9   ">
              <div className="products row d-flex flex-wrap">
                <CartComponents />
                <CartComponents />
                <CartComponents />
                <CartComponents />
                <CartComponents />
                <CartComponents />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent/>
    </div>
  );
};

export default ProductsPage;
