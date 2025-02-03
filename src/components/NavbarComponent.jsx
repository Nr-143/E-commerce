import React, { useState } from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import AnimatedTextArea from "../components/AnimatedTextArea/AnimateTextArea"; // Import Search Component
import { FaShoppingCart } from "react-icons/fa"; // Cart Icon

const NavbarComponent = ({ openTermsModal, cartItems }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Add API call or routing logic here for searching
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ color: "white" }} className="mx-1">
          🛍 E-Shop
        </Navbar.Brand>

        <Nav className="mx-auto">
          <AnimatedTextArea
            value={searchQuery} // Bind searchQuery to AnimatedTextArea
            setQuery={setSearchQuery}
            onEnterPress={handleSearch}
          />
        </Nav>

        <Nav>
          <Nav.Link
            as="span"
            className="mx-1 terms-link"
            onClick={openTermsModal}
            style={{ color: "white", cursor: "pointer" }}
          >
            📜 Terms & Conditions
          </Nav.Link>

          {/* Cart Icon with Badge */}
          <Nav.Link
            href="/cart"
            className="mx-1 position-relative"  // Ensure position relative for the badge positioning
            style={{ color: "white" }}
          >
            <FaShoppingCart size={20} />
            {cartItems && cartItems.length > 0 && (
              <Badge
                pill
                bg="danger"
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                }}
              >
                {cartItems.length}
              </Badge>
            )}
          </Nav.Link>

          <Nav.Link href="/orders" className="mx-1" style={{ color: "white" }}>
            📦 Orders
          </Nav.Link>
          <Nav.Link href="/login" className="mx-1" style={{ color: "white" }}>
            🔑 Login
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
