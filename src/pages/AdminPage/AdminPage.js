import React, { useState } from "react";
import './AdminPage.scss'
import {
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined ,
  ProfileOutlined

} from "@ant-design/icons";
import { Menu } from "antd";
import { getLevelKeys } from "../../utils";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminUser from '../../components/AdminUser/AdminUser';


export const AdminPage = () => {
  const items = [
    {
      key: "user",
      icon: <UserOutlined />,
      label: "Quản lý người dùng",
    },
    {
      key: "product",
      icon: <AppstoreOutlined />,
      label: "Quản lý sản phẩm",
    },
    {
      key: "order",
     icon: <ShoppingCartOutlined />,
      label: "Quản lý đơn hàng",
    },
    {
      key: "blog",
      icon: <ProfileOutlined />,
      label: "Quản lý bài viết",
    },
  ];

  const [keySelected, setKeySelected] = useState(""); 
  const [stateOpenKeys, setStateOpenKeys] = useState([]);
const renderPage = (key) => {
    switch(key) {
        case 'user': 
        return (
            <AdminUser/>
        )
        case 'product': 
        return (
            <AdminProduct/>
        )
        default:
            return (<AdminUser/>)
    }
}
  const onOpenChange = (openKeys) => {
    setStateOpenKeys(openKeys);
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key); 
  };


  return (
    <div className="Admin d-flex" style={{ marginTop: 110 }}>
      <Menu
        mode="inline"
        selectedKeys={[keySelected]} 
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{
     
      width:230,
          height:'auto',
        }}
      >
        {items.map((item) => (
          <Menu.Item style={{ width:215, color:'white', fontSize: 15, padding:25, fontWeight:500}}  key={item.key} icon={item.icon} onClick={handleOnClick}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
      <div style={{width:'100%'}} className="admin-content  py-2 px-2">
        {renderPage(keySelected)}
      </div>
    </div>
  );
};

export default AdminPage;
