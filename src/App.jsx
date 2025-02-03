import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
import TermsModal from "./components/TermsModal/TermsModal.jsx";

function App() {
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

  return (
    <>
      {/* Navbar and Routes */}
      <NavbarComponent openTermsModal={() => setModalOpen(true)} />

      <Routes>
        <Route path="/" element={<HomePage openTermsModal={() => setModalOpen(true)} />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      {/* Terms & Conditions Modal */}
      <TermsModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default App;
