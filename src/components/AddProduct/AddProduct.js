import React, { useState, useEffect } from "react";
import "./AddProduct.scss";
import * as ProductService from "../../services/ProductService";
import { getBase64 } from "../../utils";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal";
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { toast } from "react-toastify";
const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [stateProduct, setStateProduct] = useState({
    name: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    image: [],
    size:[],
    color:[],
    description: "",
    original_price: "",
    isFeatured: false 
  });

  const [selectedAvatars, setSelectedAvatars] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
  
    if (type === "checkbox") {
      newValue = checked;
    } else if (name === "size" || name === "color") {
      newValue = value.split(",").map(item => item.trim());
    }
  
    setStateProduct({
      ...stateProduct,
      [name]: newValue
    });
  };
  

  const handleAvatarChange = (e) => {
    const files = Array.from(e.target.files);
    if (selectedAvatars.length + files.length > 3) {
      alert("Bạn chỉ có thể chọn tối đa 3 ảnh.");
      return;
    }

    const newAvatars = [];
    for (const file of files) {
      if (file.type.startsWith("image/")) {
        newAvatars.push(file);
      } else {
        console.error(`File '${file.name}' không phải là hình ảnh hợp lệ.`);
      }
    }

    setSelectedAvatars([...selectedAvatars, ...newAvatars]);
  };

  const handleSelectChange = (value) => {
    if (value === "__addNew") {
      setIsAddCategoryModalOpen(true);
    } else {
      setSelectedType(value);
    }
  };

  const handleAddCategory = (newCategory) => {
    setProductTypes([...productTypes, newCategory]);
    setSelectedType(newCategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
   
    const formErrors = {};
    if (!stateProduct.name) {
      formErrors.name = "Vui lòng nhập tên sản phẩm.";
    }
   
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      
      return;
    }
  
    const avatarBase64List = [];
    for (const file of selectedAvatars) {
      const base64 = await getBase64(file);
      avatarBase64List.push(base64);
    }
  
    const updatedStateProduct = {
      ...stateProduct,
      type: selectedType,
      image: avatarBase64List
    };
    
  
    try {
      await ProductService.creteProduct(updatedStateProduct);
     
  
   
      setStateProduct({
        name: "",
        type: "",
        price: "",
        countInStock: "",
        rating: "",
        description: "",
        image: [],
        size:[],
        color:[],
        original_price: ""
      });
      setSelectedAvatars([]);
      setSelectedType("");
      setErrors({}); 
      toast.success('Thêm sản phẩm thành công')
    } catch (error) {
      console.error("Error creating product:", error);
    }
  
    setIsLoading(false);
  };
  

  const handleCancel = () => {
    setStateProduct({
      name: "",
      type: "",
      price: "",
      countInStock: "",
      rating: "",
      description: "",
      image: [],
      size:[],
      color:[],
      original_price: ""
    });
    setSelectedAvatars([]);
    setSelectedType("");
  };

  const handleRemoveAvatar = (index) => {
    const newAvatars = [...selectedAvatars];
    newAvatars.splice(index, 1);
    setSelectedAvatars(newAvatars);
  };

  return (
    <div className="Add_product">
      <div className="Admin_user-title d-flex justify-content-between">
        <h5>Danh sách sản phẩm / Thêm sản phẩm</h5>
      </div>
      <div className="Admin_user_main py-2">
        <div
          style={{ borderBottom: "2px solid var(--text-color)" }}
          className="Admin_user_main-button-list d-flex px-1 pt-3"
        >
          <div className="align-items-center text-center py-1 px-2">
            <h5 style={{ fontWeight: 600 }}>Tạo mới sản phẩm</h5>
          </div>
        </div>

        <form className="row px-4 py-5" onSubmit={handleSubmit}>
          <div className="form-group col-md-3">
            <label className="control-label">Tên sản phẩm</label>
            <input
              className="form-control"
              type="text"
              value={stateProduct.name}
              onChange={handleOnChange}
              name="name"
            />
             {errors.name && <p className="error-messages">{errors.name}</p>}
          </div>

          
           <div className="form-group col-md-3">
            <label className="control-label">Số lượng</label>
            <input
              className="form-control"
              type="number"
              value={stateProduct.countInStock}
              onChange={handleOnChange}
              name="countInStock"
            />
             {errors.countInStock && <p className="error-messages">{errors.countInStock}</p>}
          </div>
          <div className="form-group col-md-3">
            <label className="control-label">Size</label>
            <input
              className="form-control"
              type="text"
              value={stateProduct.size.join(", ")}
              onChange={handleOnChange}
              name="size"
            />
          </div>

          <div className="form-group col-md-3">
            <label className="control-label">Color</label>
            <input
              className="form-control"
              type="text"
              value={stateProduct.color.join(", ")}
              onChange={handleOnChange}
              name="color"
            />
          </div>

          <div className="form-group col-md-3 my-3 my-3 ">
            <label className="control-label">Danh mục</label>
            <select
              className="form-control"
              value={selectedType}
              onChange={(e) => handleSelectChange(e.target.value)}
              name="type"
            >
              <option value="">Chọn danh mục</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
              <option value="__addNew">Thêm danh mục mới</option>
            </select>
            {errors.type && <p className="error-messages">{errors.type}</p>}
          </div>

          <div className="form-group col-md-3 my-3">
            <label className="control-label">Giá gốc</label>
            <input
              className="form-control"
              type="text"
              value={stateProduct.original_price}
              onChange={handleOnChange}
              name="original_price"
            />

          </div>
          <div  className="form-group col-md-3 my-3">
            <label className="control-label">Giá bán</label>
            <input
              className="form-control"
              type="text"
              value={stateProduct.price}
              onChange={handleOnChange}
              name="price"
            />
          </div>

          <div className="form-group col-md-3 my-3">
            <label className="control-label">Đánh giá</label>
            <input
              className="form-control"
              type="number"
              value={stateProduct.rating}
              onChange={handleOnChange}
              name="rating"
            />
          </div>
          <div className="form-group col-md-12 my-2 d-flex align-items-center">
            <label style={{padding:0}}   className="control-label">Sản phẩm nổi bật</label>
            <input
            style={{marginLeft:10}}
              type="checkbox"
              name="isFeatured"
              checked={stateProduct.isFeatured}
              onChange={handleOnChange}
              className="large-checkbox"
            />
          </div>

          <div className="form-group col-md-12 d-flex align-items-center">
            <label style={{marginRight:10}} className="control-label">Ảnh sản phẩm</label>
            <label htmlFor="avatarInput" className="file-label1">
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <p>Tải lên ảnh</p>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden-input"
                multiple
                label="image"
                name="image"
              />
            </label>
          </div>

          <div className="form-group col-md-12">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {selectedAvatars.map((avatar, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    marginRight: 10,
                    marginBottom: 10
                  }}
                >
                  {avatar instanceof File && (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt={`Avatar ${index}`}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        marginRight: 5
                      }}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveAvatar(index)}
                    style={{
                      position: "absolute",
                      top: -15,
                      right: 0,
                      background: "transparent",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                      fontSize: 25,
                      padding: 3
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group col-md-12">
            <label className="control-label">Mô tả sản phẩm</label>
            <textarea
              style={{ width: "100%", height: 100 }}
              className="form-control"
              name="description"
              value={stateProduct.description}
              onChange={handleOnChange}
            ></textarea>
          </div>

          <div className="form-group col-md-12">
            <button type="submit" className="button-submit">
              Lưu lại
            </button>
            <button
              style={{
                marginLeft: 10,
                backgroundColor: "rgb(255, 196, 196)",
                color: "rgb(191, 40, 40)"
              }}
              type="button"
              className="button-submit"
              onClick={handleCancel}
            >
              Hủy bỏ
            </button>
          </div>
        </form>
      </div>

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAddCategory={handleAddCategory}
      />
       {isLoading && <LoadingComponent />}
    </div>
  );
};

export default AddProduct;
