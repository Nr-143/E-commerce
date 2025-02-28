import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../api/api";
import defaultImage from "../../assets/icons/06.jpg";
import "./NewArrivals.css";

const NewArrivals = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                // Simulated API response (Replace with `await fetchProducts();`)
                const products = [
                    {
                        id: 1,
                        name: "Wireless Bluetooth Headphones",
                        price: 49.99,
                        image: defaultImage,
                        isNewArrival: true,
                    },
                    {
                        id: 2,
                        name: "Men's Casual Sneakers",
                        price: 39.99,
                        image: defaultImage,
                        isNewArrival: true,
                    },
                    {
                        id: 3,
                        name: "Organic Green Tea - 500g",
                        price: 14.99,
                        image: defaultImage,
                        isNewArrival: false,
                    },
                    {
                        id: 4,
                        name: "Smartphone X200 Pro",
                        price: 699.99,
                        image: defaultImage,
                        isNewArrival: true,
                    },
                    {
                        id: 5,
                        name: "Stylish Women's Handbag",
                        price: 59.99,
                        image: defaultImage,
                        isNewArrival: true,
                    },
                ];

                const filteredArrivals = products.filter((product) => product.isNewArrival);
                setNewArrivals(filteredArrivals);
                setLoading(false);
            } catch (err) {
                setError("Failed to load new arrivals!");
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, []);

    return (
        <section className="new-arrivals-section">
            <h2 className="section-title">🆕 New Arrivals</h2>
            <div className="new-arrivals-container">
                {loading ? (
                    <p className="loading-text">Loading new arrivals...</p>
                ) : error ? (
                    <p className="error-text">{error}</p>
                ) : newArrivals.length === 0 ? (
                    <p className="no-products-text">No new arrivals available.</p>
                ) : (
                    newArrivals.map((product) => (
                        <div key={product.id} className="arrival-card">
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
