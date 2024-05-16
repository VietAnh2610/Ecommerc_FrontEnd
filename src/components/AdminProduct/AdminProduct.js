import React, { useState } from "react";
import "./AdminProduct.scss";
import TimeComponent from "../TimeCompnent/TimeComponent";
import TableComponentProduct from "../TableComponentProduct/TableComponentProduct";
import AddProduct from "../AddProduct/AddProduct";

const AdminProduct = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleAddProductClick = () => {
    setShowAddProduct(true);
  };

  const handleBackToTable = () => {
    setShowAddProduct(false);
  };

  return (
    <div className="Admin_user py-3 px-3">
      {!showAddProduct && (
        < >
          <div className="Admin_user-title d-flex justify-content-between">
            <h5>Danh sách sản phẩm</h5>
            <TimeComponent />
          </div>
          <div className="Admin_user_main">
            <div
              
              className="Admin_user_main-button-list d-flex px-1 py-3"
            >
              <div
                className="Admin_user_main-button align-items-center text-center py-1 px-2"
                onClick={handleAddProductClick}
             >
                <i className="fa-solid fa-plus"></i>
                <span>Thêm sản phẩm</span>
              </div>
            </div>
      
            <div className="px-3">
              <TableComponentProduct
            
              />
            </div>
          </div>
        </>
      )}
      {showAddProduct && (
        <div>
          <AddProduct />
          <button style={{marginTop:10}} className="BackToTable" onClick={handleBackToTable}>Trở về</button>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
