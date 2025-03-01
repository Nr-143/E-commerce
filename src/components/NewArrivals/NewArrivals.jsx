import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../api/api";
import defaultImage from "../../assets/icons/06.jpg";
import "./NewArrivals.css";

const NewArrivals = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const products = [
                    { id: 1, name: "Wireless Bluetooth Headphones", price: 49.99, image: defaultImage, isNewArrival: true },
                    { id: 2, name: "Men's Casual Sneakers", price: 39.99, image: defaultImage, isNewArrival: true },
                    { id: 3, name: "Organic Green Tea - 500g", price: 14.99, image: defaultImage, isNewArrival: false },
                    { id: 4, name: "Smartphone X200 Pro", price: 699.99, image: defaultImage, isNewArrival: true },
                    { id: 5, name: "Stylish Women's Handbag", price: 59.99, image: defaultImage, isNewArrival: true },
                ];
                setNewArrivals(products.filter((p) => p.isNewArrival));
                setLoading(false);
            } catch (err) {
                setError("Failed to load new arrivals!");
                setLoading(false);
            }
        };
        fetchNewArrivals();
    }, []);

    // Function to handle click and navigate to product details page
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    // Function to detect center product
    const detectCenterProduct = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const children = Array.from(container.children);
        const containerCenter = container.offsetWidth / 3;

        let closestIndex = 0;
        let minDistance = Infinity;

        children.forEach((child, index) => {
            const childCenter = child.offsetLeft + child.offsetWidth / 2 - container.scrollLeft;
            const distance = Math.abs(containerCenter - childCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        children.forEach((child, index) => {
            child.classList.toggle("active", index === closestIndex);
        });
    };

    useEffect(() => {
        detectCenterProduct();
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", detectCenterProduct);
            return () => container.removeEventListener("scroll", detectCenterProduct);
        }
    }, [newArrivals]);

    return (
        <section className="new-arrivals-section">
            <div className="d-flex justify-content-center">
                <h2 className="fw-bold text-uppercase position-relative d-inline-block"
                style={{marginTop:"-30px"}}
                >
                    New Arrivals
                    <div className="position-absolute start-50 translate-middle-x bg-warning"
                        style={{
                            width: "120px",
                            height: "5px",
                            bottom: "-8px",
                            borderRadius: "2px"
                        }}>
                    </div>
                    <div className="position-absolute start-50 translate-middle-x bg-danger"
                        style={{
                            width: "60px",
                            height: "3px",
                            bottom: "-14px",
                            borderRadius: "2px"
                        }}>
                    </div>
                </h2>
            </div>
            <div ref={containerRef} className="new-arrivals-container">
                {loading ? (
                    <p className="loading-text">Loading new arrivals...</p>
                ) : error ? (
                    <p className="error-text">{error}</p>
                ) : newArrivals.length === 0 ? (
                    <p className="no-products-text">No new arrivals available.</p>
                ) : (
                    newArrivals.map((product) => (
                        <div key={product.id} className="arrival-card" onClick={() => handleProductClick(product.id)}>
                            <img src={product.image} alt={product.name} className="arrival-image" />
                            <div className="arrival-details">
                                <p className="arrival-name">{product.name}</p>
                                <p className="arrival-price">${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default NewArrivals;
