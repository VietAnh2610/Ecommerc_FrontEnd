import React from "react";
import "./HomeSlider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomeSlider = () => {
  const bannerImages = [
    "https://theme.hstatic.net/200000690725/1001078549/14/slide_1_img.jpg?v=415",
    "https://theme.hstatic.net/200000696635/1001199686/14/slider_1.jpg?v=8",
    "https://theme.hstatic.net/200000696635/1001199686/14/slider_2.jpg?v=8",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <div className="custom-dot-container">
        <div className="custom-dot"></div>
      </div>
    ),
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <div>
      <div className="Home-banner container">
        <Slider {...settings}>
          {bannerImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                style={{ maxHeight: "500px", width: "100%" }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px", zIndex: "1" }}
      onClick={onClick}
    >
      <i className="fa fa-chevron-right" style={{ fontSize: "30px" }} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: "1" }}
      onClick={onClick}
    >
      <i className="fa fa-chevron-left" style={{ fontSize: "30px" }} />
    </div>
  );
};

export default HomeSlider;
