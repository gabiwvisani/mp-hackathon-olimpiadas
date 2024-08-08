// src/components/ImageCarousel.js
import React from 'react';
import Slider from 'react-slick';
import './ImageCarousel.css'; // Opcional: Para estilos adicionais

const ImageCarousel = () => {
    const isMobile = window.innerWidth <= 768;
  
    const images = isMobile
      ? ['/assets/1c.png', '/assets/2c.png', '/assets/3c.png']
      : ['/assets/1.png', '/assets/2.png', '/assets/3.png'];
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
