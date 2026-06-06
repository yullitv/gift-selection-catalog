import { Route, Routes } from "react-router-dom";

import SiteLayout from "@/components/layout/SiteLayout";
import { ROUTES } from "@/constants/routes";
import AccountPage from "@/pages/AccountPage";
import AdminAccountPage from "@/pages/AdminAccountPage";
import ApiSmokeTestPage from "@/pages/ApiSmokeTestPage";
import CartPage from "@/pages/CartPage";
import CatalogPage from "@/pages/CatalogPage";
import CheckoutPage from "@/pages/CheckoutPage";
import GiftDetailPage from "@/pages/GiftDetailPage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import OrderSuccessPage from "@/pages/OrderSuccessPage";
import RegisterPage from "@/pages/RegisterPage";
import WishlistPage from "@/pages/WishlistPage";

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/gift/:id" element={<GiftDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path={ROUTES.wishlist} element={<WishlistPage />} />
        <Route path={ROUTES.account} element={<AccountPage />} />
        <Route path={ROUTES.adminAccount} element={<AdminAccountPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/dev/smoke" element={<ApiSmokeTestPage />} />
    </Routes>
  );
}

export default App;