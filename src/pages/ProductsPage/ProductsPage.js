import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import CartComponents_store from "../../components/CartComponents_store/CartComponents_store";
import './ProductsPage.scss';

const ProductsPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: ProductService.getAllProduct,
  });

  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const res = await ProductService.getAllTypeProduct();
        setProductTypes(res?.data || []);
      } catch (error) {
        console.error("Error fetching product types:", error);
      }
    };

    fetchProductTypes();
  }, []);

  const handleTypeClick = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  return (
    <div style={{ marginTop: 110 }}>
      <div className="menu-top d-flex align-items-center">
        <div className="container px-5">
          <div className="banner_content d-md-flex justify-content-between align-items-center">
            <div className="mb-3 mb-md-0">
              <h2 style={{ fontSize: 27 }}>Danh mục cửa hàng</h2>
              <p>Hãy lựa chọn sản phẩm phù hợp cho chính mình</p>
            </div>
            <div className="page_link">
              <Link className="link" to="/" style={{ textDecoration: "none" }}>
                Trang chủ
              </Link>
              <Link className="link" style={{ textDecoration: "none" }}>
                Cửa hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-5 px-5">
        <div className="homepage">
          <div className="row">
            <div className="col-lg-3">
              <div className="category">
                <div className="category_title">
                  <h3>Danh mục sản phẩm</h3>
                </div>
                <div>
                  <ul className="category_list">
                    <li
                      key="All"
                      className={selectedType === null ? "active" : ""}
                      onClick={() => handleTypeClick(null)}
                    >
                      Tất cả
                    </li>
                    {productTypes.map((type) => (
                      <li
                        key={type}
                        className={selectedType === type ? "active" : ""}
                        onClick={() => handleTypeClick(type)}
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="products row d-flex flex-wrap">
                {products?.data
                  ?.filter((product) => selectedType === null || product.type === selectedType)
                  .map((product) => (
                    <CartComponents_store
                      key={product._id}
                      countInStock={product.countInStock}
                      descriptions={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      type={product.type}
                      original_price={product.original_price}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default ProductsPage;
