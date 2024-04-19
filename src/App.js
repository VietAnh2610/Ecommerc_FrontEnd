import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from './routers/index';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import {useEffect, useState} from 'react'
import axios from 'axios'
function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/product/getAll?page=1&limit=2&filter=name&filter=product');
        const jsonData = await response.json();
       
        
        setData(jsonData);
      

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log(data)
  }, []);
  return (
    <Router>
      <div>
        <HeaderComponent/>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
          
            return (
              <Route path={route.path} element={<Page />} />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
