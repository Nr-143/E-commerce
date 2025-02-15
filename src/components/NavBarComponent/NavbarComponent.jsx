import React, { useState } from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import AnimatedTextArea from "../AnimatedTextArea/AnimateTextArea";
import { FaShoppingCart, FaHome, FaBoxOpen, FaSignInAlt, FaHeart } from "react-icons/fa";
import "./NavbarComponent.css";

const NavbarComponent = ({ cartItems = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="py-2 shadow-sm" >
        <Container className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
          {/* Logo */}
        <div className="me-auto">
      <Navbar.Brand 
        as={Link} 
        to="/" 
        className="text-white fw-bold fs-5  " 
        style={{ paddingLeft: "10px" }}
      >
        🛍 DailyMart
      </Navbar.Brand>
    </div>

          {/* Search Bar for Desktop */}
          <div className="d-none d-lg-block flex-grow-1 mx-7">
            <AnimatedTextArea
              value={searchQuery}
              setQuery={setSearchQuery}
              onEnterPress={handleSearch}
            />
          </div>

          {/* Navigation Links */}
          <Nav className="d-none d-lg-flex align-items-center">
            <Nav.Link as={Link} to="/" className="text-white mx-2">
              <FaHome size={15} color="#FF6B35" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="text-white position-relative mx-2">
              <FaShoppingCart size={20} color="#FF6B35" />
              {cartItems.length > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/orders" className="text-white mx-2">
              <FaBoxOpen size={15} color="#6A0DAD" /> Orders
            </Nav.Link>

            <Nav.Link as={Link} to="/wishlist" className="text-white mx-2">
              <FaHeart size={15} color="#E0BBE4" /> Wishlist
            </Nav.Link>
                        <Nav.Link as={Link} to="/wishlist" className="text-white mx-2">
              <FaHeart size={15} color="#E0BBE4" /> Became a Seller
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-white mx-2">
              <FaSignInAlt size={15} color="#F9F9F9" /> Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Search Bar for Mobile */}
      <div className="d-lg-none w-100 px-3 mt-2">
        <AnimatedTextArea
          value={searchQuery}
          setQuery={setSearchQuery}
          onEnterPress={handleSearch}
        />
      </div>

      {/* Bottom Navbar for Mobile */}
      <div className="mobile-bottom-nav d-lg-none">
        <Nav className="d-flex justify-content-around">
          <Nav.Link as={Link} to="/" className="text-white text-center">
            <FaHome size={22} color="#FF6B35" />
            <div>Home</div>
          </Nav.Link>
          <Nav.Link as={Link} to="/OrdersPage" className="text-white text-center">
            <FaBoxOpen size={22} color="#6A0DAD" />
            <div>Orders</div>
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" className="text-white text-center position-relative">
            <FaShoppingCart size={22} color="#FF6B35" />
            <div>Cart</div>
            {cartItems.length > 0 && (
              <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                {cartItems.length}
              </Badge>
            )}
          </Nav.Link>
          <Nav.Link as={Link} to="/wishlist" className="text-white text-center">
            <FaHeart size={22} color="#E0BBE4" />
            <div>Wishlist</div>
          </Nav.Link>
          <Nav.Link as={Link} to="/login" className="text-white text-center">
            <FaSignInAlt size={22} color="#F9F9F9" />
            <div>Login</div>
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default NavbarComponent;
