import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; 

const ImageSlider = () => {
 
  const images = [
    "https://digitalsolutions.a1.bg/wp-content/uploads/2024/09/imageslide3.jpg",
    "https://digitalsolutions.a1.bg/wp-content/uploads/2024/09/imageslider1.jpg",
    "https://digitalsolutions.a1.bg/wp-content/uploads/2024/09/imageslide2.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  
  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-container">
      <FaArrowLeft className="arrow left-arrow" onClick={handlePrevious} />

      <div className="slider-content">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="slider-image"
        />
      </div>

      <FaArrowRight className="arrow right-arrow" onClick={handleNext} />
    </div>
  );
};

export default ImageSlider;
