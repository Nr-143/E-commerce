import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBolt, FaStar } from "react-icons/fa";
import defaultImage from "../../assets/icons/06.jpg";
import "./DesktopListing.css";

const ProductCard = ({ product, addToCart, addToWishlist, wishlist }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [timeLeft, setTimeLeft] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);
    const productImageRef = useRef(null);

    useEffect(() => {
        setIsWishlisted(wishlist.some((item) => item.id === product.id));
    }, [wishlist, product.id]);

    const handleWishlist = (e) => {
        e.stopPropagation();
        addToWishlist(product);
        setIsWishlisted(!isWishlisted);
    };

    useEffect(() => {
        if (product.offerEndTime) {
            const interval = setInterval(() => {
                const now = Date.now();
                const endTime = new Date(product.offerEndTime).getTime();
                const remainingTime = endTime - now;

                setTimeLeft(
                    remainingTime <= 0
                        ? "Offer Ended"
                        : `${Math.floor(remainingTime / (1000 * 60 * 60))}h ` +
                        `${Math.floor((remainingTime / (1000 * 60)) % 60)}m ` +
                        `${Math.floor((remainingTime / 1000) % 60)}s`
                );

                if (remainingTime <= 0) clearInterval(interval);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [product.offerEndTime]);

    return (
        <div className="product-card">
            <div className="wishlist-icon" onClick={handleWishlist}>
                <FaHeart className={`wishlist-heart ${isWishlisted ? "active" : ""}`} size={20} />
            </div>
            <Link to={`/product/${product.id}`} className="product-link">
                {product.discount > 0 && <span className="discount-badge">{product.discount}% OFF</span>}
                {timeLeft && <span className="timer-badge">{timeLeft}</span>}
                <img
                    ref={productImageRef}
                    src={defaultImage}
                    className={`product-card-img ${imageLoaded ? "fade-in" : ""}`}
                    alt={product.name}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="brand">Brand: {product.brand}</p>
                    <div className="price-info">
                        {product.oldPrice && <p className="original-price">₹{product.oldPrice}</p>}
                        <p className="selling-price">₹{product.price}</p>
                    </div>
                </div>
            </Link>
            <div className="hover-overlay">
                <p className="description">{product.description || "No description available"}</p>
                <div className="rating-sold">
                    <div className="rating-points">{product.ratings || 0} / 5</div>
                    <div className="rating-stars" style={{ color: "#FFD700" }}>
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(product.ratings) ? "filled-star" : "empty-star"} />
                        ))}
                    </div>
                    <div className="sold-info">{product.sold ? `${product.sold} sold` : "Not sold yet"}</div>
                </div>
            </div>
            <div className="action-buttons">
                <button
                    className="btn btn-cart"
                    style={{ backgroundColor: "#6A0DAD", color: "white" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                    }}
                >
                    <FaShoppingCart className="btn-icon" /> Add Cart
                </button>
                <button className="btn btn-buy" style={{ backgroundColor: "#FF6B35", color: "white" }}>
                    <FaBolt className="btn-icon" /> Buy Now
                </button>
            </div>
        </div>
    );
};

const DesktopListing = () => {
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const products = [
        {
            id: "12345",
            name: "Organic Almonds",
            brand: "Healthy Bites",
            price: 399,
            oldPrice: 499,
            discount: 20,
            ratings: 4.5,
            sold: 120,
            description: "High-quality organic almonds rich in nutrients.",
            offerEndTime: new Date(Date.now() + 3600000).toISOString(),
        },
        {
            id: "67890",
            name: "Organic Cashews",
            brand: "Healthy Bites",
            price: 499,
            oldPrice: 599,
            discount: 15,
            ratings: 4.2,
            sold: 90,
            description: "Premium organic cashews for a healthy snack.",
            offerEndTime: new Date(Date.now() + 7200000).toISOString(),
        },
        ,
        {
            id: "67890",
            name: "Organic Cashews",
            brand: "Healthy Bites",
            price: 499,
            oldPrice: 599,
            discount: 15,
            ratings: 4.2,
            sold: 90,
            description: "Premium organic cashews for a healthy snack.",
            offerEndTime: new Date(Date.now() + 7200000).toISOString(),
        },
        ,
        {
            id: "67890",
            name: "Organic Cashews",
            brand: "Healthy Bites",
            price: 499,
            oldPrice: 599,
            discount: 15,
            ratings: 4.2,
            sold: 90,
            description: "Premium organic cashews for a healthy snack.",
            offerEndTime: new Date(Date.now() + 7200000).toISOString(),
        },
        ,
        {
            id: "67890",
            name: "Organic Cashews",
            brand: "Healthy Bites",
            price: 499,
            oldPrice: 599,
            discount: 15,
            ratings: 4.2,
            sold: 90,
            description: "Premium organic cashews for a healthy snack.",
            offerEndTime: new Date(Date.now() + 7200000).toISOString(),
        },
    ];

    const addToWishlist = (product) => {
        setWishlist((prev) =>
            prev.some((item) => item.id === product.id)
                ? prev.filter((item) => item.id !== product.id)
                : [...prev, product]
        );
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const isInCart = prev.find((item) => item.id === product.id);
            return isInCart
                ? prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
                : [...prev, { ...product, quantity: 1 }];
        });
    };

    return (
        <div className="desktop-listing">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} addToWishlist={addToWishlist} wishlist={wishlist} />
            ))}
        </div>
    );
};

export default DesktopListing;
