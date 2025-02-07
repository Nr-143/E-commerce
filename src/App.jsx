import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import ProductPage from "./components/ProductDetailsPage/ProductDetailsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
import TermsModal from "./components/TermsModal/TermsModal.jsx";

function App() {
  const [isModalOpen, setModalOpen] = useState(false); 

  const openTermsModal = () => setModalOpen(true);

  // Function to close the Terms Modal
  const closeTermsModal = () => setModalOpen(false);

  return (
    <>
      {/* Navbar and Routes */}
      <NavbarComponent openTermsModal={openTermsModal} />

      <Routes>
        <Route 
          path="/" 
          element={<HomePage openTermsModal={openTermsModal} />} 
        />
        <Route 
          path="/product/:id" 
          element={<  ProductPage />} 
        />
        <Route 
          path="/cart" 
          element={<CartPage />} 
        />
      </Routes>

      {/* Terms & Conditions Modal */}
      <TermsModal isOpen={isModalOpen} onClose={closeTermsModal} />
    </>
  );
}

export default App;
