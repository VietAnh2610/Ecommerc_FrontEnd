import React, { useState } from "react";
import "./AdminUser.scss";
import TimeComponent from "../TimeCompnent/TimeComponent";
import AddPost from "../AddPost/AddPost";
import TableComponentPost from '../TableComponentProduct/TableComponentPost';
const AdminPost = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const handleAddUserClick = () => {
    setShowAddUser(true);
  };

  const handleBackToTable = () => {
    setShowAddUser(false);
  };

  return (
    <div  className="Admin_user px-3 py-3 ">
      { !showAddUser && (
        <>
          <div className="Admin_user-title d-flex justify-content-between">
            <h5>Danh sách bài viết</h5>
            <TimeComponent />
          </div>
          <div className="Admin_user_main">
            <div
           
              className="Admin_user_main-button-list d-flex px-1 py-3"
            >
              <div
                className="Admin_user_main-button align-items-center text-center py-1 px-2"
                onClick={handleAddUserClick}
             >
                <i className="fa-solid fa-plus"></i>
                <span>Thêm bài viết</span>
              </div>
            </div>
      
            <div className="px-3">
              <TableComponentPost
            
              />
            </div>
          </div>
        </>
      )}
      {showAddUser && (
        <div>
          <AddPost />
          <button style={{marginTop:10}} className="BackToTable" onClick={handleBackToTable}>Trở về</button>
        </div>
      )}
    </div>
  );
};

export default AdminPost;
