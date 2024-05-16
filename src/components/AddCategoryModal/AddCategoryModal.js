import React, { useState } from 'react';
import './AddCategoryModal.scss'
const AddCategoryModal = ({ isOpen, onClose, onAddCategory }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      onAddCategory(newCategory.trim());
      setNewCategory(''); 
      onClose(); 
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div style={{backgroundColor:'white', width:300, borderRadius:5}} className="modal-content">
            <h2>Thêm danh mục mới</h2>
            <input
              type="text"
              value={newCategory}
              onChange={handleInputChange}
              placeholder="Nhập tên danh mục mới..."
            />
            <div className="modal-actions">
              <button style={{marginRight:10,backgroundColor:'rgb(166, 237, 170)', color:'rgb(2, 122, 6)'}} onClick={handleAddCategory}>Thêm</button>
              <button style={{ backgroundColor:'rgb(255, 197, 196)', color: 'rgb(191, 40, 40)'}} className='close' onClick={onClose}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCategoryModal;
