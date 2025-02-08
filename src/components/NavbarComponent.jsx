import React, { useState } from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom"; // Use Link for better routing
import AnimatedTextArea from "../components/AnimatedTextArea/AnimateTextArea";
import { FaShoppingCart } from "react-icons/fa";

const NavbarComponent = ({ openTermsModal, cartItems }) => {
  const [searchQuery, setSearchQuery] = useState("");
  cartItems=["1","2","3"]
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold fs-9">
          🛍 DailyMart
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Center Search Bar */}
          <Nav className="mx-auto">
            <AnimatedTextArea
              value={searchQuery}
              setQuery={setSearchQuery}
              onEnterPress={handleSearch}
            />
          </Nav>

          {/* Right-Side Menu */}
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/" className="text-white fw-semibold mx-2">
              🏠 Home
            </Nav.Link>
            

            {/* Cart Icon with Badge */}
            <Nav.Link
              as={Link}
              to="/cart"
              className="text-white position-relative mx-2"
            >
              <FaShoppingCart size={22} /> Cart
              {cartItems && cartItems.length > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>

            <Nav.Link as={Link} to="/orders" className="text-white fw-semibold mx-2">
              📦 Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-white fw-semibold mx-2">
              🔑 Login
            </Nav.Link>
            <Nav.Link
              as="span"
              className="text-white fw-semibold mx-2"
              onClick={openTermsModal}
              style={{ cursor: "pointer" }}
            >
              📜 Terms & Conditions
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
