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
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import CategoryPage from "./pages/Home/CategoryPage.jsx";
import BarcodeScanner from "./components/BarcodeScanner/BarcodeScanner.jsx";
import AccountSettings from "./components/AccountSettings/AccountSettings.jsx";
import MultiStepForm from "./pages/AddProductPage/AddProductPage.jsx";



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
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/AccountSettings" element={<AccountSettings />} />
        <Route path="/BarcodeScanner" element={<BarcodeScanner />} />
        <Route path="/MultiStepForm" element={<MultiStepForm />} />

        

      </Routes>


      {/* Terms & Conditions Modal */}
      <TermsModal isOpen={isModalOpen} onClose={closeTermsModal} />
    </>
  );
}

export default App;
