import React, { useState, useEffect } from "react";
import "./AddPost.scss";
import * as PostService from "../../services/PostService";
import { getBase64 } from "../../utils";
import AddCategoryModal from "../AddCategoryModal/AddCategoryModal";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";
import TinymceEditor from '../TinymceEditor/TinymceEditor'; // Import TinymceEditor

const AddPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statePost, setStatePost] = useState({
    title: "",
    author: "",
    image: [],
    describe: "",
    content: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleOnChange = (e) => {
    setStatePost({
      ...statePost,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditorChange = (content) => {
    setStatePost({
      ...statePost,
      content: content,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (selectedImages.length + files.length > 3) {
      alert("Bạn chỉ có thể chọn tối đa 3 ảnh.");
      return;
    }

    const newImages = [];
    for (const file of files) {
      if (file.type.startsWith("image/")) {
        newImages.push(file);
      } else {
        console.error(`File '${file.name}' không phải là hình ảnh hợp lệ.`);
      }
    }

    setSelectedImages([...selectedImages, ...newImages]);
  };

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formErrors = {};
    if (!statePost.title) {
      formErrors.title = "Vui lòng nhập tiêu đề bài viết.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    const imageBase64List = [];
    for (const file of selectedImages) {
      const base64 = await getBase64(file);
      imageBase64List.push(base64);
    }

    const updatedStatePost = {
      ...statePost,
      image: imageBase64List,
    };

    try {
      await PostService.createPost(updatedStatePost);
      setStatePost({
        title: "",
        author: "",
        image: [],
        describe: "",
        content: "",
      });
      setSelectedImages([]);
      setErrors({});
      toast.success("Thêm bài viết thành công");
    } catch (error) {
      console.error("Error creating post:", error);
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    setStatePost({
      title: "",
      author: "",
      image: [],
      describe: "",
      content: "",
    });
    setSelectedImages([]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  return (
    <div className="Add_post">
      <div className="Admin_user-title d-flex justify-content-between">
        <h5>Danh sách bài viết / Thêm bài viết</h5>
      </div>
      <div className="Admin_user_main py-2">
        <div
          style={{ borderBottom: "2px solid var(--text-color)" }}
          className="Admin_user_main-button-list d-flex px-1 pt-3"
        >
          <div className="align-items-center text-center py-1 px-2">
            <h5 style={{ fontWeight: 600 }}>Tạo mới bài viết</h5>
          </div>
        </div>

        <form className="row px-4 py-5" onSubmit={handleSubmit}>
          <div className="form-group col-md-6">
            <label className="control-label">Tiêu đề bài viết</label>
            <input
              className="form-control"
              type="text"
              value={statePost.title}
              onChange={handleOnChange}
              name="title"
            />
            {errors.title && (
              <p className="error-messages">{errors.title}</p>
            )}
          </div>

          <div className="form-group col-md-6">
            <label className="control-label">Tác giả</label>
            <input
              className="form-control"
              type="text"
              value={statePost.author}
              onChange={handleOnChange}
              name="author"
            />
          </div>

          <div className="form-group col-md-12">
            <label className="control-label">Ảnh bài viết</label>
            <label htmlFor="imageInput" className="file-label1">
              <i className="fa-solid fa-cloud-arrow-up"></i>
              <p>Tải lên ảnh</p>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden-input"
                multiple
                label="image"
                name="image"
              />
            </label>
          </div>

          <div className="form-group col-md-12">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                >
                  {image instanceof File && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index + 1}`}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        marginRight: 5,
                      }}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: "absolute",
                      top: -15,
                      right: 0,
                      background: "transparent",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                      fontSize: 25,
                      padding: 3,
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group col-md-12">
            <label className="control-label">Mô tả bài viết</label>
            <textarea
              style={{ width: "100%", height: 100 }}
              className="form-control"
              name="describe"
              value={statePost.describe}
              onChange={handleOnChange}
            ></textarea>
          </div>
          <div className="form-group col-md-12">
            <label className="control-label">Nội dung bài viết</label>
            <TinymceEditor
              value={statePost.content}
              onEditorChange={handleEditorChange}
            />
          </div>

          <div className="form-group col-md-12">
            <button type="submit" className="button-submit">
              Lưu lại
            </button>
            <button
              style={{
                marginLeft: 10,
                backgroundColor: "rgb(255, 196, 196)",
                color: "rgb(191, 40, 40)",
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

export default AddPost;
