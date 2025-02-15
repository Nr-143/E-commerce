import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import ProductPage from "./components/ProductDetailsPage/ProductDetailsPage.jsx";
import OrdersPage from "./pages/ordersPage/OrdersPage.jsx";
import TrackOrder from "./components/TrackOrder/TrackOrder.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import NavbarComponent from "./components/NavBarComponent/NavbarComponent.jsx";
import TermsModal from "./components/TermsModal/TermsModal.jsx";
import SearchResults from "./pages/SearchResultPage/SearchResult.jsx";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openTermsModal = () => setModalOpen(true);

  // Function to close the Terms Modal
  const closeTermsModal = () => setModalOpen(false);

  return (
    <>
      {/* Navbar and Routes */}
      <NavbarComponent />
      <Routes>
        <Route
          path="/"
          element={<HomePage openTermsModal={openTermsModal} />}
        />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/TrackOrder" element={<TrackOrder />} />

      </Routes>


      {/* Terms & Conditions Modal */}
      <TermsModal isOpen={isModalOpen} onClose={closeTermsModal} />
    </>
  );
}

export default App;
