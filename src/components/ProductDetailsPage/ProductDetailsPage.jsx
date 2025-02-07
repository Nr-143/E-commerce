import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import defaultImage from "../../assets/icons/06.jpg";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductDetailsPage.css"; 

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleOption, setVisibleOption] = useState("specifications");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setProduct(null); // Reset previous product to avoid stale data
      try {
        const productData = {
          id,
          name: `Smartphone ${id}`,
          brand: "TechBrand",
          image: [defaultImage, defaultImage, defaultImage],
          description: "Latest model with cutting-edge features.",
          specifications: ["6.5-inch Display","6.5-inch Display","128GB Storage", "6GB RAM", "5000mAh Battery"],
          reviews: "4.5/5 (Excellent smartphone with great performance)",
          seller: "TechBrand Official Store",
        };
  
        const relatedData = [
          { id: 2, name: "Smartphone ABC", brand: "TechBrand", image: "https://via.placeholder.com/150", price: 6999 },
          { id: 3, name: "Smartphone DEF", brand: "TechBrand", image: "https://via.placeholder.com/150", price: 5999 },
          { id: 5, name: "Smartphone GHI", brand: "TechBrand", image: "https://via.placeholder.com/150", price: 7999 },
          { id: 6, name: "Smartphone GHI", brand: "TechBrand", image: "https://via.placeholder.com/150", price: 7999 },
          { id: 7, name: "Smartphone GHI", brand: "TechBrand", image: "https://via.placeholder.com/150", price: 7999 },
          { id: 8, name: "Smartphone GHI", brand: "TechBrand", image: "https://via.placeholder.com/150", price: 7999 },
          { id: 9, name: "Smartphone GHI", brand: "TechBrand", image: "https://via.placeholder.com/150", price: 7999 },
          { id: 10, name: "Smartphone GHI", brand: "TechBrand", image: "https://via.placeholder.com/150", price: 7999 },
          { id: 11, name: "Smartphone GHI", brand: "TechBrand", image: "https://via.placeholder.com/150", price: 7999 },
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
  }, [id]);  // Listen for `id` changes
  
  const handleOptionChange = (option) => {
    setVisibleOption(option);
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="product-details-container">
      <div className="product-layout">
        {/* Image Section */}
        <div className="image-section">
          {product.image.length >= 3 ? (
            <Slider {...sliderSettings} className="image-carousel">
              {product.image.map((imgSrc, index) => (
                <div key={index} className="carousel-image">
                  <img src={imgSrc} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="DetailedImage">
              {product.image.map((imgSrc, index) => (
                <img key={index} src={imgSrc} alt={`${product.name} ${index + 1}`} />
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="details-section">
          <div className="product-info">
            <h1>{product.name}</h1>
            <p>{product.brand}</p>
            <p>{product.description}</p>
          </div>

          <div className="option-buttons">
            <button onClick={() => handleOptionChange("specifications")}>Specifications</button>
            <button onClick={() => handleOptionChange("reviews")}>Reviews</button>
            <button onClick={() => handleOptionChange("seller")}>Seller Details</button>
          </div>

          {/* Product Options */}
          <div className="product-options">
            {visibleOption === "specifications" && (
              <div className="specifications">
                <h3>Specifications</h3>
                <ul>
                  {product.specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
            {visibleOption === "reviews" && (
              <div className="reviews">
                <h3>Reviews</h3>
                <p>{product.reviews}</p>
              </div>
            )}
            {visibleOption === "seller" && (
              <div className="seller-details">
                <h3>Seller Details</h3>
                <p>{product.seller}</p>
              </div>
            )}
          </div>
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
          setProduct(null);
          setLoading(true);
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
