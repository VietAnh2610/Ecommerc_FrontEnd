import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import "./ProductsPage.scss";
import CartComponents from "../../components/CartComponents/CartComponents";

const ProductsPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
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

  const handlePriceRangeClick = (priceRange) => {
    setSelectedPriceRange(
      priceRange === selectedPriceRange ? null : priceRange
    );
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filterProductsByPriceRange = (product) => {
    if (!selectedPriceRange) return true;

    const [minPrice, maxPrice] = selectedPriceRange.split("-");
    const productPrice = parseFloat(product.price.replace(/\D/g, "")); // Chuyển đổi giá sản phẩm từ chuỗi sang số
    return (
      productPrice >= parseFloat(minPrice) &&
      productPrice <= parseFloat(maxPrice)
    );
  };

  const filterProductsBySearchKeyword = (product) => {
    if (!searchKeyword) return true;

    return product.name.toLowerCase().includes(searchKeyword.toLowerCase());
  };

  return (
    <div>
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
                    <div style={{ marginTop: 10 }}>
                      <input
                        type="search"
                        placeholder="Tìm kiếm sản phẩm"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        className="search-input-product"
                      />
                    </div>
                  </ul>
                </div>
              </div>

              <div className="category">
                <div className="category_title">
                  <h3>Lọc sản phẩm theo giá</h3>
                </div>
                <div>
                  <ul className="category_list">
                    <li
                      className={
                        selectedPriceRange === "0-5000000" ? "active" : ""
                      }
                      onClick={() => handlePriceRangeClick("0-5000000")}
                    >
                      Dưới 5 triệu
                    </li>
                    <li
                      className={
                        selectedPriceRange === "5000000-10000000"
                          ? "active"
                          : ""
                      }
                      onClick={() => handlePriceRangeClick("5000000-10000000")}
                    >
                      Từ 5 triệu đến 10 triệu
                    </li>
                    <li
                      className={
                        selectedPriceRange === "10000000-20000000"
                          ? "active"
                          : ""
                      }
                      onClick={() => handlePriceRangeClick("10000000-20000000")}
                    >
                      Từ 10 triệu đến 20 triệu
                    </li>
                    <li
                      className={
                        selectedPriceRange === "20000000-10000000000"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        handlePriceRangeClick("20000000-10000000000")
                      }
                    >
                      Trên 20 triệu
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="products row d-flex flex-wrap">
                {products?.data
                  ?.filter(
                    (product) =>
                      (selectedType === null ||
                        product.type === selectedType) &&
                      filterProductsByPriceRange(product) &&
                      filterProductsBySearchKeyword(product)
                  )
                  .map((product) => (
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
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
