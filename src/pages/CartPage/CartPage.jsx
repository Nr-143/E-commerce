// src/pages/CartPage.js
// import defaultImage from "../../assets/icons/06.jpg"; 

import defaultImage from "../../assets/icons/06.jpg"; 

import React, { useState } from 'react';
import CartComponent from '../../components/CartComponent/CartComponent';

const CartPage = () => {
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    // Product with a discount
    {
      id: 1,
      name: 'Product 1',
      description: 'This is a great product!',
      price: 100, // Original price
      quantity: 2,
      category: 'Groceries',
      image: defaultImage,
      discount: 10, // 10% discount
      originalPrice: 100, // Actual price before discount
      discountPrice: 90, // Price after applying the discount (100 - 10%)
      currentOffer: '10% off',
    },
    
    // Product without a discount
    {
      id: 2,
      name: 'Product 2',
      description: 'Another amazing product!',
      price: 200,
      quantity: 1,
      category: 'Clothes',
      image: defaultImage,
      discount: 0, // No discount
      originalPrice: 200, // No change for original price
      discountPrice: 200, // Price remains the same as no discount
      currentOffer: 'No discount',
    },
    
    // Product with a higher discount
    {
      id: 3,
      name: 'Product 3',
      description: 'Luxury Item',
      price: 500,
      quantity: 3,
      category: 'Electronics',
      image: defaultImage,
      discount: 20, // 20% discount
      originalPrice: 500, // Original price
      discountPrice: 400, // Discounted price (500 - 100)
      currentOffer: '20% off',
    },
    
    // Product with a large quantity, without discount
    {
      id: 4,
      name: 'Product 4',
      description: 'Bulk product, no discount',
      price: 50,
      quantity: 10, // Large quantity
      category: 'Groceries',
      image: defaultImage,
      discount: 0, // No discount
      originalPrice: 50,
      discountPrice: 50, // No discount
      currentOffer: 'No discount',
    },
  ]);
  
  

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  return (
    <div className="cart-page">
      <CartComponent
        cartItems={cartItems}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
      />
    </div>
  );
};

export default CartPage;
