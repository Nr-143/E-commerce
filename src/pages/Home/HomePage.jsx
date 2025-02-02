import "./HomePage.css";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../api/api";
import defaultImage from "../../assets/icons/06.jpg"; 


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // const data = await fetchProducts();
        let data=[
          {
            "id": 1,
            "name": "Organic Apples",
            "brand": "Fresh Farm",
            "image": "https://via.placeholder.com/150",
            "oldPrice": 150,
            "price": 120,
            "discount": 20,
            "ratings": 4.5
          },
          {
            "id": 2,
            "name": "Whole Wheat Bread",
            "brand": "Healthy Bakes",
            "image": "https://via.placeholder.com/150",
            "oldPrice": 80,
            "price": 70,
            "discount": 12,
            "ratings": 4.2
          },
          {
            "id": 3,
            "name": "Whole Wheat Bread",
            "brand": "Healthy Bakes",
            "image": "https://via.placeholder.com/150",
            "oldPrice": 80,
            "price": 70,
            "discount": 12,
            "ratings": 4.2
          },
          {
            "id": 4,
            "name": "Whole Wheat Bread",
            "brand": "Healthy Bakes",
            "image": "https://via.placeholder.com/150",
            "oldPrice": 80,
            "price": 70,
            "discount": 12,
            "ratings": 4.2
          },
          {
            "id": 5,
            "name": "Whole Wheat Bread",
            "brand": "Healthy Bakes",
            "image": "https://via.placeholder.com/150",
            "oldPrice": 80,
            "price": 70,
            "discount": 12,
            "ratings": 4.2
          }
        ]  

        setProducts(data);
        setError(null); 

      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="homepage-container">
      {/* Carousel Section */}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/assets/banner1.jpg" className="d-block w-100" alt="Banner 1" />
          </div>
          <div className="carousel-item">
            <img src="/assets/banner2.jpg" className="d-block w-100" alt="Banner 2" />
          </div>
          <div className="carousel-item">
            <img src="/assets/banner3.jpg" className="d-block w-100" alt="Banner 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Categories Section */}
      <section className="categories-section mt-18">
        <h2 className="section-title"><i className="fas fa-th-large"></i> Explore Categories</h2>
        <div className="categories-scroll-container">
          <div className="category-card">
            <h5 className="text-white">Dress</h5>
          </div>
          <div className="category-card">
            <h5 className="text-white">Groceries</h5>
          </div>
          <div className="category-card">
            <h5 className="text-white">Electronics</h5>
          </div>
          <div className="category-card">
            <h5 className="text-white">Mobiles</h5>
          </div>
          <div className="category-card">
            <h5 className="text-white">Gifts</h5>
          </div>
          <div className="category-card">
            <h5 className="text-white">Men</h5>
          </div>
          <div className="category-card">
            <h5 className="text-white">Women</h5>
          </div>
          <div className="category-card">
            <h5 className="text-white">Books</h5>
          </div>
          <div className="category-card">
            <h5 className="text-white">Kids</h5>
          </div>
          <div className="category-card">
            <h5 className="text-white">Service</h5>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {/* <section className="products-section mt-5">
  <h2 className="section-title">
    <i className="fas fa-star"></i> Featured Products
  </h2>
  <div className="row">
    {loading ? (
      <p className="text-center">Loading products...</p>
    ) : error ? (
      <p className="text-center text-danger">{error}</p>
    ) : products.length > 0 ? (
      products.map((product) => (
        <div className="col-6 col-md-3 mb-4" key={product.id}>
          <div className="product-card text-center p-3 shadow-sm">
            <img
              src={ defaultImage}
              alt={product.name}
              className="product-image mb-2"
            />
            <h4 className="product-name">{product.name}</h4>
            <p className="product-brand">
              <i className="fas fa-tag"></i> Brand: {product.brand || "N/A"}
            </p>
            <p className="product-desc">
              {product.description
                ? product.description.length > 50
                  ? product.description.substring(0, 50) + "..."
                  : product.description
                : "No description available."}
            </p>
            <p className="product-price">
              {product.oldPrice && (
                <span className="old-price">₹{product.oldPrice}</span>
              )}{" "}
              <strong>₹{product.price}</strong>
            </p>
            {product.discount > 0 && (
              <p className="discount">
                <i className="fas fa-percentage"></i> {product.discount}% OFF
              </p>
            )}
            {product.ratings && (
              <p className="ratings" style={{color:"black"}}>
                <i className="fas fa-star text-warning"></i> {product.ratings}/5
              </p>
            )}
            <p className={`stock-status ${product.stock > 0 ? "text-success" : "text-danger"}`}>
              <i className="fas fa-box"></i> {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <div className="d-flex justify-content-between">
              <button className="add-to-cart-btn btn btn-primary w-50 me-1">
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
              <button className="buy-now-btn btn btn-success w-50">
                <i className="fas fa-bolt"></i> Buy Now
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center">No products available.</p>
    )}
  </div>
</section> */}

<section className="products-section mt-5">
  <h2 className="section-title mb-4 text-center">
    <i className="fas fa-star text-warning"></i> Featured Products
  </h2>
  <div className="row">
    {loading ? (
      <p className="text-center">Loading products...</p>
    ) : error ? (
      <p className="text-center text-danger">{error}</p>
    ) : products.length > 0 ? (
      products.map((product) => (
        <div className="col-6 col-md-3 mb-4" key={product.id}>
          <div className="product-card text-center shadow-sm p-3 rounded">
            {/* Product Badge */}
            {product.tag && (
              <span className="product-badge badge bg-warning text-dark mb-2">
                {product.tag}
              </span>
            )}
            {/* Product Image */}
            <img
              src={defaultImage}
              alt={product.name}
              className="product-image img-fluid mb-3"
              style={{ maxHeight: "150px", objectFit: "cover" }}
            />
            {/* Product Details */}
            <div className="product-details">
              <h4 className="product-name text-truncate">{product.name}</h4>
              <p className="product-price mb-2">
                {product.oldPrice && (
                  <span className="old-price text-muted me-2 text-decoration-line-through">
                    ₹{product.oldPrice}
                  </span>
                )}
                <strong className="text-success">₹{product.price}</strong>
              </p>
              {product.discount > 0 && (
                <p className="discount text-danger mb-2">
                  {product.discount}% OFF
                </p>
              )}
              {/* Ratings */}
              <div className="ratings mb-2">
                {Array.from({ length: 5 }).map((_, index) => {
                  const ratingValue = product.ratings - index;
                  return (
                    <i
                      key={index}
                      className={`fas ${
                        ratingValue >= 1
                          ? "fa-star" // Full star
                          : ratingValue > 0
                          ? "fa-star-half-alt" // Half star
                          : "fa-star-o" // Empty star
                      }`}
                      style={{
                        color: ratingValue >= 1 || ratingValue > 0 ? "#FF6B35" : "#ccc",
                        textShadow: ratingValue >= 1 ? "0 0 6px rgba(255, 107, 53, 0.5)" : "none",
                      }}
                    ></i>
                  );
                })}
                <span className="rating-text ms-1 text-muted">
                  ({product.ratings}/5)
                </span>
              </div>
              {/* Members Bought */}
              <p className="members-bought mb-2">
                <i
                  className="fas fa-users"
                  style={{ color: "blue", marginRight: "5px" }}
                ></i>
                <span style={{ color: "green" }}>
                  {product.membersBought || 0} Buys
                </span>
              </p>
              {/* Stock Status */}
              <p
                className={`stock-status mb-2 ${
                  product.stock > 0 ? "text-success" : "text-danger"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            {/* Actions */}
            <div className="actions d-flex justify-content-between">
              {product.isInCart ? (
                <button className="btn btn-secondary w-100" disabled>
                  <i className="fas fa-check-circle"></i> Already in Cart
                </button>
              ) : (
                <button
                  className="btn btn-primary w-50 me-1"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <i className="fas fa-shopping-cart"></i> Add
                </button>
              )}
              <button className="btn btn-success w-50">
                <i className="fas fa-bolt"></i> Buy
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center">No products available.</p>
    )}
  </div>
</section>




      {/* About Us Section */}
      <section className="about-us-section mt-5">
        <h2 className="section-title"><i className="fas fa-info-circle"></i> About Us</h2>
        <p>
          We provide high-quality groceries and clothing at the best prices. Our mission is to bring convenience and
          quality to your doorstep. Shop with us for a seamless and enjoyable shopping experience.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
