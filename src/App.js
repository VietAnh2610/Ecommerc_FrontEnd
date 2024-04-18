import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from './routers/index';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';

function App() {
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
