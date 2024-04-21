import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routers/index";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  // useEffect(() => {
  //   fetchApi();
  // }, []);

  //   const fetchApi = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/getAll?page=1&limit=2&filter=name&filter=product`);
  //   return res.data

  // };
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  //  console.log('query', query)
   
  return (
    <Router>
      <div>
        <HeaderComponent />
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            return <Route path={route.path} element={<Page />} />;
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
