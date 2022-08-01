import React,{useEffect} from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux'
import Map from './components/Map';
import Home from './pages/Home';
import Login from './pages/Login';
import LoginId from './pages/Login/LoginId';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Order from './pages/Order';
import OrderId from './pages/Order/OrderId';
import Weather from './pages/Weather';
import OrderManage from './pages/Manage/OrderManage';
import OrderManageOrderId from './pages/Manage/OrderManage/OrderId';
import CatalogManage from './pages/Manage/Catalog';
import CatalogManageId from './pages/Manage/Catalog/Id';
import CatalogManageCreate from './pages/Manage/Catalog/Create';
import PageNotFound from './pages/PageNotFound';
//import GlobalStylesheet from './components/GlobalStylesheet';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { getAuthToken } from "./utils/localstorage";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Paymentsuccess from "./pages/Paymentsuccess";
const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const localToken = getAuthToken();
  var isAdmin = ""
  if (localToken){
    //isAdmin=JSON.parse(atob(localToken.split('.')[1])).role
  }
  const GlobalUser = useSelector((state) => state.loginReducer);
  if (GlobalUser.token){
    isAdmin=JSON.parse(atob(GlobalUser.token.split('.')[1])).role
  }
  return (
      <AppContainer>
      <BrowserRouter>
      <ScrollToTop />
      {/* <GlobalStylesheet /> */}
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="map" element={<Map />}/>
          <Route path="weather" element={<Weather />}/>
          <Route
            path="login"
            element={GlobalUser.token ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="login/:id"
            element={
              GlobalUser.token ? <Navigate to="/" replace />:  <LoginId />
            }
          />
          <Route
            path="register"
            element={GlobalUser.token ? <Navigate to="/" replace /> : <Register />}
          />
           <Route
            path="cart"
            element={
              !GlobalUser.token ? <Navigate to="/login" replace />:  <Cart />
            }
          />
          <Route
            path="order"
            element={
              !GlobalUser.token ? <Navigate to="/login" replace />:  <Order />
            }
          />
          <Route
            path="order/:orderId"
            element={
              !GlobalUser.token ? <Navigate to="/login" replace />:  <OrderId />
            }
          />
          {/* <Route
              path="manage"
              element={
                !GlobalUser.token ? <Navigate to="/login" replace />:  <CatalogManage />
              }
            />  */}
          <Route
            path="manage/order"
            element={
              isAdmin!=="admin" ? <Navigate to="/" replace />:  <OrderManage />
            }
          />
          <Route
            path="manage/order/:orderId"
            element={
              isAdmin!=="admin" ? <Navigate to="/" replace />:  <OrderManageOrderId />
            }
          />
          <Route
            path="manage/catalog"
            element={
              isAdmin!=="admin" ? <Navigate to="/" replace />:  <CatalogManage />
            }
          />
          <Route
            path="manage/catalog/:id"
            element={
              isAdmin!=="admin"? <Navigate to="/" replace />:  <CatalogManageId />
            }
          />
          <Route
            path="manage/catalog/create"
            element={
              isAdmin!=="admin" ? <Navigate to="/" replace />:  <CatalogManageCreate />
            }
          />
          <Route
          path="paymentsuccess"
          element={
            <Paymentsuccess />
          }
        />
          {/* <Route path="products" element={<ProductList />}>
            <Route path=":cat" element={<ProductList />} />
          </Route>
          <Route path="search" element={<Search />}>
            <Route path=":cat" element={<Search />} />
          </Route>
          <Route path="product" element={<Product />}>
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="success" element={<Success />} />
          
          
          <Route
            path="profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          /> */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>


    </BrowserRouter>
    </AppContainer>
    
    
  );
}

export default App;
