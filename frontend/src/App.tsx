import { Route, Routes } from "react-router-dom";

import SiteLayout from "@/components/layout/SiteLayout";
import ApiSmokeTestPage from "@/pages/ApiSmokeTestPage";
import CartPage from "@/pages/CartPage";
import CatalogPage from "@/pages/CatalogPage";
import GiftDetailPage from "@/pages/GiftDetailPage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import OrderSuccessPage from "@/pages/OrderSuccessPage";
import RegisterPage from "@/pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/gift/:id" element={<GiftDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
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
