import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import AnimatedTextArea from "../AnimatedTextArea/AnimateTextArea";
import { FaShoppingCart, FaHome, FaBoxOpen, FaSignInAlt, FaHeart, FaStore } from "react-icons/fa";
import "./NavbarComponent.css";

const NavbarComponent = ({ cartItems = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchQuery("");
    }
  }, [location]);

  return (
    <>
      {/* Desktop Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="py-2 shadow-sm">
        <Container>
          {/* Logo (Left-Aligned) */}
          <Navbar.Brand as={Link} to="/" className="text-white fw-bold fs-5 me-auto">
            🛍 DailyMart
          </Navbar.Brand>

          {/* Desktop Search Bar */}
          <div className="d-none d-lg-block flex-grow-1 mx-4">
            <AnimatedTextArea
              value={searchQuery}
              setQuery={setSearchQuery}
              onEnterPress={() => console.log("Searching for:", searchQuery)}
            />
          </div>

          {/* Desktop Navigation Links */}
          <Nav className="d-none d-lg-flex align-items-center gap-3">
            <Nav.Link as={Link} to="/" className="nav-item"><FaHome size={18} /> Home</Nav.Link>
            <Nav.Link as={Link} to="/orders" className="nav-item"><FaBoxOpen size={18} /> Orders</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="nav-item position-relative">
              <FaShoppingCart size={18} /> Cart
              {cartItems.length > 0 && <Badge pill bg="danger" className="cart-badge">{cartItems.length}</Badge>}
            </Nav.Link>
            <Nav.Link as={Link} to="/wishlist" className="nav-item"><FaHeart size={18} /> Wishlist</Nav.Link>
            <Nav.Link as={Link} to="/BarcodeScanner" className="nav-item"><FaStore size={18} /> Sell</Nav.Link>
            <Nav.Link as={Link} to="/MultiStepForm" className="nav-item"><FaStore size={18} /> Add </Nav.Link>
            <Nav.Link as={Link} to="/AccountSettings" className="nav-item"><FaSignInAlt size={18} /> Account</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Mobile Navbar */}
      <Navbar bg="dark" variant="dark" fixed="top" className="d-lg-none py-2 shadow-sm">
        <Container className="d-flex align-items-center">
          {/* Logo (Left-Aligned) */}
          <Navbar.Brand as={Link} to="/" className="text-white fw-bold fs-5">
            🛍 DailyMart
          </Navbar.Brand>

          {/* Mobile Search Bar */}
          <div className="w-100 ms-3">
            <AnimatedTextArea
              value={searchQuery}
              setQuery={setSearchQuery}
              onEnterPress={() => console.log("Searching for:", searchQuery)}
            />
          </div>
        </Container>
      </Navbar>

      {/* Bottom Navbar for Mobile */}
      <div className="mobile-bottom-nav d-lg-none">
        <Nav className="d-flex justify-content-around align-items-center">
          <Nav.Link as={Link} to="/" className="mobile-nav-item"><FaHome size={22} /><div>Home</div></Nav.Link>
          <Nav.Link as={Link} to="/orders" className="mobile-nav-item"><FaBoxOpen size={22} /><div>Orders</div></Nav.Link>
          <Nav.Link as={Link} to="/cart" className="mobile-nav-item position-relative">
            <FaShoppingCart size={22} /><div>Cart</div>
            {cartItems.length > 0 && <Badge pill bg="danger" className="cart-badge">{cartItems.length}</Badge>}
          </Nav.Link>
          <Nav.Link as={Link} to="/wishlist" className="mobile-nav-item"><FaHeart size={22} /><div>Wishlist</div></Nav.Link>
          <Nav.Link as={Link} to="/AccountSettings" className="mobile-nav-item"><FaSignInAlt size={22} /><div>Account</div></Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default NavbarComponent;
