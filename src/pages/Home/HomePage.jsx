import "./HomePage.css";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../api/api"; // Import API function (optional)
import TermsModal from "../../components/TermsModal/TermsModal.jsx"; // Import TermsModal
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // FIXED: Undefined state

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        // Simulated API response
        let data = [
          {
            id: 1,
            name: "Organic Apples",
            brand: "Fresh Farm",
            image: "https://via.placeholder.com/150",
            oldPrice: 150,
            price: 120,
            discount: 20,
            ratings: 4.5,
            isInCart: false,
            category: "groceries",
          },
          {
            id: 101,
            name: "Casual Cotton Shirt",
            brand: "Urban Wear",
            image: "https://via.placeholder.com/150",
            oldPrice: 1200,
            price: 999,
            discount: 17,
            ratings: 4.3,
            size: ["S", "M", "L", "XL"],
            isInCart: false,
            category: "clothing",
          },
          {
            id: 201,
            name: "Wireless Bluetooth Headphones",
            brand: "SoundMax",
            image: "https://via.placeholder.com/150",
            oldPrice: 3500,
            price: 2999,
            discount: 14,
            ratings: 4.7,
            warranty: "1 Year",
            isInCart: false,
            category: "electronics",
          },
          {
            id: 2,
            name: "Fresh Bananas",
            brand: "Tropical Farms",
            image: "https://via.placeholder.com/150",
            oldPrice: 80,
            price: 60,
            discount: 25,
            ratings: 4.2,
            isInCart: false,
            category: "groceries",
          },
          {
            id: 102,
            name: "Denim Blue Jeans",
            brand: "Street Style",
            image: "https://via.placeholder.com/150",
            oldPrice: 1500,
            price: 1200,
            discount: 20,
            ratings: 4.6,
            size: ["30", "32", "34", "36"],
            isInCart: false,
            category: "clothing",
          },
          {
            id: 202,
            name: "Noise Cancelling Headphones",
            brand: "EchoSound",
            image: "https://via.placeholder.com/150",
            oldPrice: 5000,
            price: 3999,
            discount: 20,
            ratings: 4.8,
            warranty: "2 Years",
            isInCart: false,
            category: "electronics",
          },
          {
            id: 3,
            name: "Fresh Carrots",
            brand: "Green Valley",
            image: "https://via.placeholder.com/150",
            oldPrice: 100,
            price: 80,
            discount: 20,
            ratings: 4.3,
            isInCart: false,
            category: "groceries",
          },
          {
            id: 103,
            name: "Stylish Leather Jacket",
            brand: "Premium Wear",
            image: "https://via.placeholder.com/150",
            oldPrice: 3500,
            price: 2999,
            discount: 15,
            ratings: 4.5,
            size: ["M", "L", "XL"],
            isInCart: false,
            category: "clothing",
          },
          {
            id: 203,
            name: "Smartwatch",
            brand: "TechTime",
            image: "https://via.placeholder.com/150",
            oldPrice: 7000,
            price: 5999,
            discount: 15,
            ratings: 4.6,
            warranty: "6 Months",
            isInCart: false,
            category: "electronics",
          },
          {
            id: 4,
            name: "Organic Tomatoes",
            brand: "Nature's Bounty",
            image: "https://via.placeholder.com/150",
            oldPrice: 120,
            price: 95,
            discount: 20,
            ratings: 4.4,
            isInCart: false,
            category: "groceries",
          },
          {
            id: 104,
            name: "Cotton Summer Dress",
            brand: "BeachVibe",
            image: "https://via.placeholder.com/150",
            oldPrice: 1800,
            price: 1499,
            discount: 17,
            ratings: 4.7,
            size: ["S", "M", "L"],
            isInCart: false,
            category: "clothing",
          },
          {
            id: 204,
            name: "Portable Speaker",
            brand: "BoomBox",
            image: "https://via.placeholder.com/150",
            oldPrice: 2500,
            price: 1999,
            discount: 20,
            ratings: 4.5,
            warranty: "1 Year",
            isInCart: false,
            category: "electronics",
          },
          {
            id: 5,
            name: "Cucumber",
            brand: "Farm Fresh",
            image: "https://via.placeholder.com/150",
            oldPrice: 40,
            price: 30,
            discount: 25,
            ratings: 4.2,
            isInCart: false,
            category: "groceries",
          },
          {
            id: 105,
            name: "Men's Running Shoes",
            brand: "Speedster",
            image: "https://via.placeholder.com/150",
            oldPrice: 2500,
            price: 2200,
            discount: 12,
            ratings: 4.4,
            size: ["40", "41", "42", "43"],
            isInCart: false,
            category: "clothing",
          },
          {
            id: 205,
            name: "Smart LED TV",
            brand: "VisionPro",
            image: "https://via.placeholder.com/150",
            oldPrice: 35000,
            price: 29999,
            discount: 14,
            ratings: 4.9,
            warranty: "2 Years",
            isInCart: false,
            category: "electronics",
          },
        ];

        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products!");
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  const openTermsModal = () => setModalOpen(true);
  const closeTermsModal = () => setModalOpen(false);

  return (
    <div className="homepage-container">
      {/* Categories Section */}
      <section
        className="categories-section mt-5"
        style={{ border: "1px solid tomato " }}
      >
        <div className="categories-scroll-container">
          {[
            "Dress",
            "Groceries",
            "Electronics",
            "Mobiles",
            "Gifts",
            "Men",
            "Women",
            "Books",
            "Kids",
            "Service",
          ].map((category, index) => (
            <div className="category-card" key={index}>
              <h5 className="text-white">{category}</h5>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="products-section mt-1">
        <h2 className="section-title mb-4 text-center">
          <i className="fas fa-star text-warning"></i> Featured Products
        </h2>
        <div className="row">
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : products.length > 0 ? (
            products.map((product) => {
              // Choose the right card based on category

              return (
                <div className="col-6 col-md-3" key={product.id}>
                  <Link to={`/product/${product.id}`}>
                    <ProductCard product={product} />
                  </Link>
                </div>
              );
            })
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section mt-5">
        <h2 className="section-title">
          <i className="fas fa-info-circle"></i> About Us
        </h2>
        <p>
          We provide high-quality groceries and clothing at the best prices. Our
          mission is to bring convenience and quality to your doorstep. Shop
          with us for a seamless and enjoyable shopping experience.
        </p>
        <p>
          <a href="#!" onClick={openTermsModal} className="terms-link">
            📜 View Terms & Conditions
          </a>
        </p>
      </section>

      {/* Terms & Conditions Modal */}
      <TermsModal isOpen={isModalOpen} onClose={closeTermsModal} />
    </div>
  );
};

export default HomePage;
