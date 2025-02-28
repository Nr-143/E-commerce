import React from "react";
import Slider from "react-slick";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import "./HeroSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import defaultImage from "../../assets/icons/06.jpg"
const HeroSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        arrows: false,
    };

    return (
        <section className="hero-section">
            <Slider {...settings}>
                {/* Slide 1 */}
                <div className="hero-slide">
                    <img src={defaultImage} alt="Mega Sale" className="hero-image" />
                    <div className="hero-overlay">
                        <h1><MdLocalOffer /> Mega Sale - Up to 50% Off!</h1>
                        <p>Exclusive discounts on groceries, clothing, and electronics.</p>
                        <button className="shop-now-btn">
                            <FaShoppingCart /> Shop Now
                        </button>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="hero-slide">
                    <img src={defaultImage} alt="Fresh Groceries" className="hero-image" />
                    <div className="hero-overlay">
                        <h1>🛒 Fresh Groceries Delivered to Your Doorstep</h1>
                        <p>Get the best organic and fresh products at great prices!</p>
                        <button className="shop-now-btn">
                            <FaShoppingCart /> Order Now
                        </button>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="hero-slide">
                    <img src={defaultImage} alt="Exclusive Deals" className="hero-image" />
                    <div className="hero-overlay">
                        <h1>💎 Exclusive Deals Just for You!</h1>
                        <p>Sign up and get special discounts on your first order.</p>
                        <button className="shop-now-btn">
                            <FaShoppingCart /> Grab Now
                        </button>
                    </div>
                </div>
            </Slider>
        </section>
    );
};

export default HeroSection;
