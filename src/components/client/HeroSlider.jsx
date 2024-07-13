
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useTransition, animated } from "@react-spring/web";
import "../../slick-styles.css";
import { apiConfig } from "../../Services/GlobalApi";
import { h1, h2, h3 } from "../../assets";


const HeroSlider = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const staticImages = [
    { image_link: h1 },
    { image_link: h2 },
    { image_link: h3 },
  ];

  useEffect(() => {
    // Fetch the images from the database when the component mounts
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${apiConfig.Base_Url}api/hero-images`);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages(staticImages); // Use static images as fallback
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      3000 // Change slide every 3 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [index, images]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const transitions = useTransition(images[index], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {/* Constant background layer */}
      <div className="absolute inset-0 bg-gray-900"></div>
      {transitions((style, item) => (
        <animated.div
          className="absolute inset-0 animated-div"
          style={{
            ...style,
            backgroundImage: `url(${item.image_link})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={item.image_link}
            alt="Hero"
            className="w-full h-screen object-cover opacity-0"
          />
        </animated.div>
      ))}
    </div>
  );
};

export default HeroSlider;