import "./HomePage.css";
import React, { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../../api/api";
import TermsModal from "../../components/TermsModal/TermsModal.jsx";
import NewArrivals from "../../components/NewArrivals/NewArrivals.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import HeroSection from "../../components/HeroSection/HeroSection.jsx";
import RecentView from "../../components/RecentView/RecentView.jsx";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newArrivals, setNewArrivals] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const navigate = useNavigate();

  const categoryRefs = {
    Clothing: useRef(null),
    Groceries: useRef(null),
    Electronics: useRef(null),
    Mobiles: useRef(null),
    Gifts: useRef(null),
    Men: useRef(null),
    Women: useRef(null),
    Books: useRef(null),
    Kids: useRef(null),
    Service: useRef(null),
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        let data = [
          {
            id: 1,
            name: "Organic Apples",
            brand: "Fresh Farm",
            image: "https://via.placeholder.com/150",
            description: "The company reported a 5% growth in revenue for FY24, reaching ₹2,405 crore. Operating revenue stood at ₹2.39 lakh crore, up from ₹2.26 lakh crore in FY23. Although EBITDA improved to -₹9,344.29 crore, it still indicates challenges in achieving profitability compared to the previous year's -₹17,774.35 crore.",
            oldPrice: 150,
            price: 120,
            discount: 20,
            ratings: 4.5,
            isInCart: false,
            deliveryFee: 300,
            category: "groceries",
          },
          {
            "id": 101,
            "name": "Casual Cotton Shirt",
            "brand": "Urban Wear",
            "image": "https://via.placeholder.com/150",
            "oldPrice": 1200,
            "price": 999,
            "discount": 17,
            "ratings": 4.3,
            "deliveryFee": 0,
            "size": ["S", "M", "L", "XL"],
            "isInCart": false,
            "offerEndTime": "2025-03-12T23:59:59Z",
            "category": "clothing",
            deliveryFee: 30,

          },
          {
            "id": 101,
            "name": "Casual Cotton Shirt",
            "brand": "Urban Wear",
            "image": "https://via.placeholder.com/150",
            "oldPrice": 1200,
            "price": 999,
            "discount": 17,
            "ratings": 4.3,
            "deliveryFee": 0,
            "size": ["S", "M", "L", "XL"],
            "isInCart": false,
            "offerEndTime": "2025-03-12T23:59:59Z",
            "category": "clothing",
            deliveryFee: 30,

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
            deliveryFee: 300,
            warranty: "1 Year",
            isInCart: false,
            category: "electronics",
          },
          {
            id: 2,
            name: "Fresh Bananas",
            brand: "Tropical Farms",
            image: "https://via.placeholder.com/150",
            oldPrice: null,
            price: 60,
            discount: 0,
            ratings: null,
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
            deliveryFee: 30,

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
            category: "Clothing",
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
            category: "kids",
            deliveryFee: 30,

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
            category: "books",
            deliveryFee: 30,
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
            category: "women",
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
            category: "men",
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
            category: "gifts",
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
            category: "Groceries",
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
            category: "mobiles",
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
            category: "clothing",
          },
        ];
        setProducts(data);
        setNewArrivals(data.slice(0, 10));
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

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (categoryRefs[category]?.current) {
      categoryRefs[category].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewMore = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };


  const renderProductsByCategory = (category) => {
    const filteredProducts = products.filter(
      (product) => product.category?.toLowerCase() === category.toLowerCase()
    );

    if (filteredProducts.length === 0) {
      return <p className="text-center">No {category} products available.</p>;
    }

    return (
      <>
        {filteredProducts.length > 1 && (
          <div className="view-more-container">
            <button
              className="view-more-btn"
              onClick={() => handleViewMore(category)}
            >
              View More →
            </button>
          </div>
        )}
        <div className="products-scroll-container">
          {filteredProducts.slice(0, 5).map((product) => (
            <div className="product-card-wrapper" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="homepage-container">
      <section className="categories-section mt-5">
        <div className="categories-scroll-container">
          {Object.keys(categoryRefs).map((category, index) => (
            <div
              className={`category-card ${activeCategory === category ? "active" : ""}`}
              key={index}
              onClick={() => handleCategoryClick(category)}
            >
              <h5 className="text-white">{category}</h5>
            </div>
          ))}
        </div>
      </section>

      <HeroSection />
      <NewArrivals products={newArrivals} />
      <RecentView products={newArrivals} />

      {Object.keys(categoryRefs).map((category) => (
        <div className={`filter ${category}`} key={category}>
          <section className="products-section" ref={categoryRefs[category]}>
            <h2 className="section-title mb-2 text-center">
              <i className="fas fa-tshirt text-warning"></i> {category}
            </h2>
            {loading ? (
              <p className="text-center">Loading products...</p>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : (
              renderProductsByCategory(category)
            )}
          </section>
        </div>
      ))}

      <section className="about-us-section mt-5">
        <h2 className="section-title">
          <i className="fas fa-info-circle"></i> About Us
        </h2>
        <p>
          We provide high-quality groceries and clothing at the best prices.
          Our mission is to bring convenience and quality to your doorstep.
          Shop with us for a seamless and enjoyable shopping experience.
        </p>
        <p>
          <a href="#!" onClick={openTermsModal} className="terms-link">
            📜 View Terms & Conditions
          </a>
        </p>
      </section>

      <TermsModal isOpen={isModalOpen} onClose={closeTermsModal} />
    </div>
  );
};

export default HomePage;
