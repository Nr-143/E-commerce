import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import defaultImage from "../../assets/icons/06.jpg";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import ProductReviews from "../ProductReviews/ProductReviews";

import "./ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [productData, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleOption, setVisibleOption] = useState("specifications");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setProduct(null); // Reset previous product to avoid stale data
      try {
        const productData = {
          id: 1,
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
          seller: "TechBrand Official Store",
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

        setProduct(productData);
        setRelatedProducts(relatedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load product details!");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);
  const getDiscountedPrice = (originalPrice, offerPercent) => {
    if (offerPercent > 0) {
      return originalPrice - (originalPrice * offerPercent) / 100;
    }
    return originalPrice; // No discount if offer percent is 0
  };

  if (!productData) return <div>Loading...</div>;

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
                <img src={imgSrc} alt={`${productData.name} ${index + 1}`} />
              </div>
            ))}
          </Slider>

          {/* Current Image Indicator */}
          <div className="current-image-indicator">
            <span>
              {currentImageIndex + 1} / {productData.image.length}
            </span>
          </div>

          {/* Total Images and Buy/Add to Cart Buttons */}
          <div className="image-counter-and-buttons">
            <div className="buy-add-buttons">
              <button className="buy-now-button">Buy Now</button>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="details-section">
          {/* Offer badge and end time at top right */}
          {productData.offerPercent > 0 && (
            <div className="offer-badge">
              <span className="offer-text">
                Offer: {productData.offerPercent}% OFF
              </span>
              <span className="offer-end-time">
                Ends in: {productData.offerEndTime}
              </span>
            </div>
          )}

          <div className="product-info">
            <h1>{productData.name}</h1>
            <p className="brand">{productData.brand}</p>
            <p className="description">{productData.description}</p>

            <div className="price-section">
              {productData.offerPercent > 0 ? (
                <div className="price">
                  <span className="original-price">
                    ${productData.originalPrice.toFixed(2)}
                  </span>
                  <span className="discounted-price">
                    ${discountedPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <div className="price">
                  <span className="price">
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
              Seller Details
            </button>
          </div>

          {/* Product Options */}
          <div className="product-options">
            {visibleOption === "specifications" && (
              <div className="specifications">
                <h3>Specifications</h3>
                {productData.specifications.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="spec-category">
                    <h4>{category.category}</h4>
                    <ul>
                      {category.specs.map((spec, specIndex) => (
                        <li key={specIndex}>
                          {Object.keys(spec)[0]}: {Object.values(spec)[0]}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {visibleOption === "reviews" && (
              <div className="reviews">
                {/* <h3>Reviews</h3> */}
                <ProductReviews reviews={productData.reviews} />
              </div>
            )}

            {visibleOption === "seller" && (
              <div className="seller-details">
                <h3>Seller Details</h3>
                <p>{productData.seller}</p>
              </div>
            )}
          </div>

          {/* Buy and Add to Cart buttons */}
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h3>Related Products</h3>
        <div className="row">
          {relatedProducts.map((relatedProduct) => (
            <div
              className="col-4"
              key={relatedProduct.id}
              onClick={() => {
                navigate(`/product/${relatedProduct.id}`);
              }}
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
