import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ImageSlider = ({ data }) => {
  const [activeImageNum, setActiveImageNum] = useState(0);
  const length = data.imgpath.length;

  const nextSlide = () => {
    setActiveImageNum((prevNum) => (prevNum + 1) % length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const prevSlide = () => {
    setActiveImageNum((prevNum) => (prevNum + length - 1) % length);
  };

  if (!Array.isArray(data.imgpath) || data.imgpath.length <= 0) {
    return null;
  }

  return (
    <section className="image-slider">
      <div className="left">
        <FaArrowAltCircleLeft onClick={prevSlide} />
      </div>
      <div className="right">
        <FaArrowAltCircleRight onClick={nextSlide} />
      </div>
      {data.imgpath.map((currentSlide, ind) => (
        <div className={ind === activeImageNum ? "currentSlide active" : "currentSlide"} key={ind}>
          {ind === activeImageNum && <img src={currentSlide} className="image" alt="" />}
        </div>
      ))}
    </section>
  );
};

export default ImageSlider;
