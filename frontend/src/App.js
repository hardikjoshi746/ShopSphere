import { BrowserRouter, Routes, Route } from "react-router-dom";

import CartPage from "./pages/CartPage.js";
import Loginpage from "./pages/LoginPage.js";
import HomePage from "./pages/HomePage.js";
import RegisterPage from "./pages/RegisterPage.js";
import ProductDetailPage from "./pages/ProductDetail.js";
import ListOfProductPage from "./pages/ListOfProduct.js";

//Protect User Page

import UserProfilePage from "./pages/user/UserProfilePage.js";
import UserOrderPage from "./pages/user/UserOrderPage.js";
import UserCartDetailPage from "./pages/user/UserCartDetailsPage.js";
import UserOrderDetailPage from "./pages/user/UserOrderDetailsPage.js";
import ProtectedRouteComponent from "./components/ProtectedRouteComponent.js";

// Protect Admin Page

import AdminUserPage from "./pages/admin/AdminUserPage.js";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage.js";
import AdminOrderPage from "./pages/admin/AdminOrderPage.js";
import AdminOrderDetailPage from "./pages/admin/AdminOrderDetailPage.js";
import AdminChatPage from "./pages/admin/AdminChatPage.js";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage.js";
//import AdminUserPage from './pages/admin/AdminUserPage.js';
import AdminProductPage from "./pages/admin/AdminProductPage.js";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage.js";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage.js";

// components
import HeaderComponent from "./components/HeaderComponent.js";
import FooterComponent from "./components/FooterComponent.js";

//import User Components

import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent.js";

import ScrollToTop from "./utils/ScrollToTop.js";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderComponent />
      <Routes>
        <Route element={<RoutesWithUserChatComponent />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product-detail/:id" element={<ProductDetailPage />} />
          <Route path="/list-of-products" element={<ListOfProductPage />} />
          <Route path="*" element="404 Page not found" />

          <Route element={<ProtectedRouteComponent />}>
            <Route path="/user" element={<UserProfilePage />} />
            <Route path="/user/my-orders" element={<UserOrderPage />} />
            <Route path="/user/cart-details" element={<UserCartDetailPage />} />
            <Route
              path="/user/order-details"
              element={<UserOrderDetailPage />}
            />
          </Route>
        </Route>

        <Route element={<ProtectedRouteComponent admin={true} />}>
          <Route path="/admin/users" element={<AdminUserPage />} />
          <Route path="/admin/edit-user" element={<AdminEditUserPage />} />
          <Route path="/admin/products" element={<AdminProductPage />} />
          <Route
            path="/admin/create-new-product"
            element={<AdminCreateProductPage />}
          />
          <Route
            path="/admin/edit-product"
            element={<AdminEditProductPage />}
          />
          <Route path="/admin/orders" element={<AdminOrderPage />} />
          <Route
            path="/admin/order-details/:id"
            element={<AdminOrderDetailPage />}
          />
          <Route path="/admin/chats" element={<AdminChatPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
