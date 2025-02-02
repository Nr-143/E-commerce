import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import AnimatedTextArea from "../components/AnimatedTextArea/AnimateTextArea"; // Import Search Component

const NavbarComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Add API call or routing logic here
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{color:"white"}}> 🛍 E-Shop</Navbar.Brand>
        <Nav className="mx-auto">
          {/* Search Bar Integrated in Navbar */}
          <AnimatedTextArea setQuery={setSearchQuery} onEnterPress={handleSearch} />
        </Nav>
        <Nav>
           <Nav.Link href="/cart" className="mx-3" style={{color:"white"}}>🛒 Cart</Nav.Link>
           <Nav.Link href="/orders" className="mx-3" style={{color:"white"}}>📦 Orders</Nav.Link>
           <Nav.Link href="/login" className="mx-3" style={{color:"white"}}>🔑 Login</Nav.Link>
       </Nav>

      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
