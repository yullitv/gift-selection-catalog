import { Route, Routes } from "react-router-dom";

import SiteLayout from "@/components/layout/SiteLayout";
import ApiSmokeTestPage from "@/pages/ApiSmokeTestPage";
import CatalogPage from "@/pages/CatalogPage";
import GiftDetailPage from "@/pages/GiftDetailPage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/gift/:id" element={<GiftDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/dev/smoke" element={<ApiSmokeTestPage />} />
    </Routes>
  );
}

export default App;