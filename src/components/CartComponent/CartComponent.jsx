import React from 'react';
import { Card, Button, ListGroup, Row, Col } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';

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
                  <Col xs={1} md={1}>
                    {/* <img src={item.image} alt={item.name} className="cart-item-image" /> */}
                  </Col>
                  <Col xs={8} md={6}>
                    <div className="cart-item-details">
                      <h6>{item.name}</h6>
                      <p><strong>Current Offer:</strong> <span style={{ color: "orange" }}>{item.currentOffer}</span></p>
                      <p><strong>Discounted Price:</strong> <span style={{ color: "red" }}>₹{item.discountPrice}</span></p>
                      <p><strong>Selling Price:</strong> <span style={{ color: "green" }}>₹{item.price}</span></p>
                      <p><strong>Offer Expiry:</strong> <span style={{ color: "grey" }}>{item.offerExpiry}</span></p>
                    </div>
                  </Col>

                  <Col xs={6} md={2} className="d-flex justify-content-end cart-item-controls">
                    <Button
                      variant="outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="quantity-btn"
                    >
                      -
                    </Button>
                    <span className="quantity-display" style={{ padding: '0 10px', marginTop: "7px" }}>
                      {item.quantity}
                    </span>

                    <Button
                      variant="outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn ms-2"
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

                <Row className="mt-2 justify-content-center">
  <Col xs={12} md={6} className="text-center">
    <p><strong>Delivery By:</strong> <span style={{ color: "blue" }}>{item.deliveryDate}</span></p>
  </Col>
  <Col xs={12} md={6} className="text-center">
    <p><strong>Stocks Left:</strong> <span style={{ color: "brown" }}>{item.stockLeft}</span></p>
  </Col>
</Row>


                <div className="d-flex justify-content-center mt-3">
                  <h6>Total: ₹{item.discountPrice * item.quantity}</h6>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-center">
              Your cart is empty. Add some items to your cart!
            </ListGroup.Item>
          )}
        </ListGroup>

        {cartItems.length > 0 && (
    <Card.Footer className="d-flex justify-content-end sticky-footer">
    <h5 className="me-5">Total: ₹{calculateTotal()}</h5>
    <Button variant="success" className="checkout-btn">Proceed to Checkout</Button>
  </Card.Footer>


        )}
      </Card>
    </div>
  );
};

export default CartComponent;
