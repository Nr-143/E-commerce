import React from 'react';
import { Link } from "react-router-dom";
import defaultImage from '../../assets/icons/06.jpg';
import { Card, Button, ListGroup, Row, Col } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import "../CartComponent/CartComponent.css"

const CartComponent = ({ cartItems, removeItem, updateQuantity }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.discountPrice * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <Card className="cart-card">
        <Card.Header as="h5" className="text-center">
          🛒 Your Cart
        </Card.Header>
        <ListGroup variant="flush">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <ListGroup.Item key={index} className="cart-item">
                <Row className="align-items-center">

                  {/* Image Section */}
                  <Col xs={4} md={3} className="d-flex justify-content-center">
                    <Link to={`/product/${item.id}`} className="product-link">
                      <img
                        src={defaultImage}
                        alt={item.name}
                        className="cart-item-image"
                        style={{
                          width: "100%",
                          maxWidth: "120px",
                          height: "auto",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />
                    </Link>
                  </Col>

                  {/* Product Details */}
                  <Col xs={8} md={5} className="text-start">
                    <Link to={`/product/${item.id}`} className="product-link">

                      <div className="cart-item-details">
                        <h6 className="mb-1">{item.name}</h6>
                        <p className="mb-1"><strong>Current Offer:</strong> <span style={{ color: "orange" }}>{item.currentOffer}</span></p>
                        <p className="mb-1"><strong>Discounted Price:</strong> <span style={{ color: "red" }}>₹{item.discountPrice}</span></p>
                        <p className="mb-1"><strong>Selling Price:</strong> <span style={{ color: "green" }}>₹{item.price}</span></p>
                        <p className="mb-0"><strong>Offer Expiry:</strong> <span style={{ color: "grey" }}>{item.offerExpiry}</span></p>
                      </div>
                    </Link>

                  </Col>

                  {/* Quantity & Actions */}
                  <Col xs={12} md={4} className="d-flex justify-content-end align-items-center">
                    <Button
                      variant="outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="quantity-btn"
                    >
                      -
                    </Button>
                    <span className="quantity-display mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => removeItem(item.id)}
                      className="ms-3 delete-btn"
                    >
                      <FaTrashAlt />
                    </Button>
                  </Col>
                </Row>

                {/* Item Total */}
                <div className="text-center mt-3">
                  <h6 className="fw-bold">Total: ₹{item.discountPrice * item.quantity}</h6>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-center">
              Your cart is empty. Add some items to your cart!
            </ListGroup.Item>
          )}
        </ListGroup>

        {/* Footer with Total and Checkout Button */}
        {cartItems.length > 0 && (
          <Card.Footer className="d-flex justify-content-between align-items-center sticky-footer">
            <h5 className="mb-0">Total: ₹{calculateTotal()}</h5>
            <Button variant="success" className="checkout-btn">Proceed to Checkout</Button>
          </Card.Footer>
        )}
      </Card>
    </div>
  );
};

export default CartComponent;
