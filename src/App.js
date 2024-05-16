import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routers/index";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/counter/userSlide";
import axios from "axios";
import { ToastContainer } from "react-toastify";

function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    const { storageData, decoded } = handleDecoded();

    if (decoded && decoded?.id) {
      handleGetDetailsUser(decoded.id, storageData);
    }
  }, []);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);

      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async function (config) {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return (
    <Router>
      <div>
        <ToastContainer style={{ marginTop: 100 }} />
        <HeaderComponent />
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const isPrivate = route.isPrivate; // Kiểm tra thuộc tính isPrivate của route
            const isAdmin = user && user.isAdmin; // Kiểm tra và xác định quyền isAdmin của user

            // Kiểm tra xem route có phải là không riêng tư hoặc người dùng là quản trị viên
            const isCheckAuth = !isPrivate || isAdmin;

            // Kiểm tra isCheckAuth trước khi render Route
            return isCheckAuth ? (
              <Route path={route.path} element={<Page />} />
            ) : null;
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
