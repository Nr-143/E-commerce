import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import defaultImage from "../../assets/icons/06.jpg";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import ProductSpecifications from "../ProductSpecification/ProductSpecification";
import ProductSellerDetails from "../ProductSellerDetails/ProductSellerDetails";
import ProductReviews from "../ProductReviews/ProductReviews";
import "./ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [productData, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState("");

  const [visibleOption, setVisibleOption] = useState("specifications");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, New York, USA",
    deliverableDays: "3-5 Days",
  });
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setProduct(null);
 const response = await fetch(
   `https://world.openfoodfacts.org/api/v0/product/${3017620422003}.json`
 );
      const data = await response.json();
   console.log("data",data)
      try {
        const productData = {
          id: 101,
          name: "Smartphone 1",
          brand: "TechBrand",
          image: [defaultImage, defaultImage, defaultImage, defaultImage],
          description: "Latest model with cutting-edge features.",
          specifications: [
            {
              category: "General",
              specs: [
                {
                  "Sales Package":
                    "1 X Soundbar, 1 X Charging Cable, 1 X User Manual",
                },
                { "Model Number": "Aavante Bar 520" },
                {
                  "Model Name":
                    "Aavante Bar 520 w/ Dual Passive Radiators, 6 HRS Playback & Sleek Design",
                },
                { Type: "Soundbar" },
                { Bluetooth: "Yes" },
                { Configuration: "2.0" },
                { "Power Output (RMS)": "16 W" },
                { Color: "Black" },
              ],
            },
            {
              category: "Product Details",
              specs: [
                { Configuration: "2.0 Channel" },
                { Dimensions: "Width: 37 cm, Height: 6.7 cm, Depth: 6.7 cm" },
              ],
            },
            {
              category: "Warranty",
              specs: [
                {
                  "Warranty Service Type":
                    "If Any Query Customer Need to Reach Out Us at info@imaginemarketingindia.com or Call on 912269181920",
                },
                { "Warranty Summary": "1 Year Warranty" },
                { "Covered in Warranty": "Manufacturing Defects" },
                { "Not Covered in Warranty": "Physical Damages" },
                { "Domestic Warranty": "1 Year" },
              ],
            },
          ],
          reviews: [
            {
              author: "John Doe",
              comment: "Great product! Highly recommend it for everyday use.",
              rating: 5,
              date: "February 5, 2025",
            },
            {
              author: "Jane Smith",
              comment:
                "Not bad, but could use some improvements in build quality.",
              rating: 3,
              date: "February 6, 2025",
            },
            {
              author: "Alice Johnson",
              comment: "Amazing! Exceeded my expectations.",
              rating: 4,
              date: "February 7, 2025",
            },
          ],
          offerEndTime: "08/02/2025",
          seller: [
            {
              company: "TechBrand Official Store",
              location: "New York, USA",
              rating: 4.5,
            },
          ],
          originalPrice: 150.0, // The original price of the product
          offerPercent: 20, // Offer percentage if there is a discount
        };

        const relatedData = [
          {
            id: 1,
            name: "Smartphone ABC",
            brand: "TechBrand",
            image: "https://via.placeholder.com/150",
            price: 6999,
          },
          {
            id: 2,
            name: "Smartphone ABC",
            brand: "TechBrand",
            image: "https://via.placeholder.com/150",
            price: 6999,
          },
          {
            id: 3,
            name: "Smartphone ABC",
            brand: "TechBrand",
            image: "https://via.placeholder.com/150",
            price: 6999,
          },
          {
            id: 4,
            name: "Smartphone ABC",
            brand: "TechBrand",
            image: "https://via.placeholder.com/150",
            price: 6999,
          },
          {
            id: 5,
            name: "Smartphone ABC",
            brand: "TechBrand",
            image: "https://via.placeholder.com/150",
            price: 6999,
          },
          {
            id: 6,
            name: "Smartphone ABC",
            brand: "TechBrand",
            image: "https://via.placeholder.com/150",
            price: 6999,
          },
          {
            id: 7,
            name: "Smartphone ABC",
            brand: "TechBrand",
            image: "https://via.placeholder.com/150",
            price: 6999,
          },

          // Additional related products here
        ];

        setTimeout(() => {
          setProduct(productData); // Simulated product data
          setRelatedProducts(relatedData); // Simulated related products data
          setLoading(false); // Set loading to false after 2 seconds
        }, 1000);
      } catch (err) {
        setError("Failed to load product details!");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);
  useEffect(() => {
    if (!productData || !productData.offerEndTime) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const offerEnd = new Date(productData.offerEndTime).getTime();
      const timeLeft = offerEnd - now;

      if (timeLeft <= 0) {
        setCountdown("Offer expired");
        return;
      }

      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);

      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [productData]);

  const getDiscountedPrice = (originalPrice, offerPercent) => {
    if (offerPercent > 0) {
      return originalPrice - (originalPrice * offerPercent) / 100;
    }
    return originalPrice; // No discount if offer percent is 0
  };

  if (!productData) return <Loader />; // Show loader while loading

  const discountedPrice = getDiscountedPrice(
    productData.originalPrice,
    productData.offerPercent
  );

  const handleOptionChange = (option) => {
    setVisibleOption(option);
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  const sliderSettings = {
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentImageIndex(next), // Track the current image
  };

  return (
    <div className="product-details-container">
      <div className="product-layout">
        {/* Image Section */} 
        <div className="image-section">
          <Slider {...sliderSettings} className="image-carousel">
            {productData.image.map((imgSrc, index) => (
              <div key={index} className="carousel-image">
                <img src={defaultImage} alt={`${productData.name} ${index + 1}`} />
              </div>
            ))}
          </Slider>

          {/* Current Image Indicator */}
          <div className="current-image-indicator">
            <span>
              {currentImageIndex + 1} / {productData.image.length}
            </span>
          </div>
          
          <div className="image-counter-and-buttons">
            <div className="buy-add-buttons">
              <button className="buy-now-button">Buy Now</button>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>

          <div className="user-details">
            <h3>Delivery Address</h3>
            <div className="user-info">
              <span className="username">{user.name}</span>
              <span className="status">
                <span className="status-dot"></span> {user.status}
              </span>
            </div>
            <div className="contact-info">
              <span>{user.email}</span> | <span>{user.phone}</span>
            </div>
            <div className="address-info">{user.address}</div>
            <div className="delivery-days">
              🚚 Estimated Delivery:{" "}
              <strong style={{ color: "green" }}>{user.deliverableDays}</strong>
            </div>
          </div>

          {/* Total Images and Buy/Add to Cart Buttons */}
   
        </div>

        {/* Product Info Section */}
        <div className="details-section">
          {/* Offer badge and end time at top right */}
{productData.offerPercent > 0 && (
    <span className="offer-end-time">
      Ends in: {countdown}
    </span>
)}


          <div className="product-info">
            {/* Product Name */}
            <h1 className="product-title">{productData.name}</h1>

            {/* Brand Name */}
            <p className="brand-name">{productData.brand}</p>

            {/* Product Description */}
            <p className="product-description">{productData.description}</p>

            {/* Price Section */}
            <div className="price-section">
              {productData.offerPercent > 0 ? (
                <>
                  {/* Offer Badge */}
                  <span className="offer-badge">
                    -{productData.offerPercent}% OFF
                  </span>

                  {/* Original & Discounted Price */}
                  <div className="price">
                    <span className="original-price" style={{ color: "red" }}>
                      ${productData.originalPrice.toFixed(2)}
                    </span>
                    <span
                      className="discounted-price"
                      style={{ color: "green" }}
                    >
                      ${discountedPrice.toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="price">
                  <span className="regular-price">
                    ${productData.originalPrice.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="option-buttons">
            <button
              onClick={() => handleOptionChange("specifications")}
              className={visibleOption === "specifications" ? "active" : ""}
            >
              Specifications
            </button>
            <button
              onClick={() => handleOptionChange("reviews")}
              className={visibleOption === "reviews" ? "active" : ""}
            >
              Reviews
            </button>
            <button
              onClick={() => handleOptionChange("seller")}
              className={visibleOption === "seller" ? "active" : ""}
            >
              Seller
            </button>
          </div>

          {/* Product Options */}
          <div className="product-options">
            {visibleOption === "specifications" && (
              <ProductSpecifications
                specifications={productData.specifications}
              />
            )}
            {visibleOption === "reviews" && (
              <div className="reviews">
                {/* <h3>Reviews</h3> */}
                <ProductReviews reviews={productData.reviews} />
              </div>
            )}

            {visibleOption === "seller" && (
              <div className="seller-details">
                <ProductSellerDetails seller={productData.seller} />
              </div>
            )}
          </div>

          {/* Buy and Add to Cart buttons */}
        </div>
      </div>

          <div className="user-detailsMobileView">
            <h3>Delivery Address</h3>
            <div className="user-info">
              <span className="username">{user.name}</span>
              <span className="status">
                <span className="status-dot"></span> {user.status}
              </span>
            </div>
            <div className="contact-info">
              <span>{user.email}</span> | <span>{user.phone}</span>
            </div>
            <div className="address-info">{user.address}</div>
            <div className="delivery-days">
              🚚 Estimated Delivery:{" "}
              <strong style={{ color: "green" }}>{user.deliverableDays}</strong>
            </div>
          </div>
      {/* Related Products */}
      <div className="related-products">
        {/* <h3>Related Products</h3> */}

        <div className="row">
          {relatedProducts.map((relatedProduct) => (
            <div
              className="col-4"
              key={relatedProduct.id}
              onClick={() => navigate(`/product/${relatedProduct.id}`)} // Use navigate instead of Link
              style={{ cursor: "pointer" }}
            >
              <ProductCard product={relatedProduct} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
