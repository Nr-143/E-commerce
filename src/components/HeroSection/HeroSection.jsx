import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroSection.css";

const HeroSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: true,
    };

    return (
        <div className="hero-container">
            <Slider {...settings}>
                <div className="hero-slide slide1">
                    <div className="hero-content">
                        <h1>Smart Shopping, Every Day!</h1>
                        <p>Exclusive Deals on Groceries, Clothes & More</p>
                        <button className="shop-now-btn">Shop Now</button>
                    </div>
                </div>
                <div className="hero-slide slide2">
                    <div className="hero-content">
                        <h1>Fresh & Organic Groceries</h1>
                        <p>Delivered to Your Doorstep in No Time</p>
                        <button className="shop-now-btn">Explore</button>
                    </div>
                </div>
                <div className="hero-slide slide3">
                    <div className="hero-content">
                        <h1>Trendy  Clothing</h1>
                        <p>Upgrade Your Style with the Latest Fashion</p>
                        <button className="shop-now-btn">Discover</button>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default HeroSection;