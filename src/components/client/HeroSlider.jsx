// // HeroSlider.js
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useTransition, animated } from "@react-spring/web";
// import "../../slick-styles.css";

// const HeroSlider = () => {
//   const [images, setImages] = useState([]);
//   const [index, setIndex] = useState(0);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     // Fetch the images from the database when the component mounts
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/hero-images"
//         ); // Replace with your API endpoint
//         setImages(response.data);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   useEffect(() => {
//     resetTimeout();
//     timeoutRef.current = setTimeout(
//       () =>
//         setIndex((prevIndex) =>
//           prevIndex === images.length - 1 ? 0 : prevIndex + 1
//         ),
//       3000 // Change slide every 3 seconds
//     );

//     return () => {
//       resetTimeout();
//     };
//   }, [index, images]);

//   const resetTimeout = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const transitions = useTransition(images[index], {
//     from: { opacity: 0 },
//     enter: { opacity: 1 },
//     leave: { opacity: 0 },
//     config: { duration: 1000 },
//   });

//   return (
//     <>
//       <div className="h-screen w-full overflow-hidden relative">
//         {transitions((style, item) => (
//           <animated.div
//             className="absolute inset-0 animated-div"
//             style={{
//               ...style,
//               backgroundImage: `url(${item.image_link})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               transform: style.opacity.interpolate((o) => `scale(${o}, ${o})`),
//             }}
//           >
//             <img
//               src={item.image_link}
//               alt="Hero"
//               className="w-full h-screen object-cover opacity-0"
//             />
//           </animated.div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default HeroSlider;


// HeroSlider.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useTransition, animated } from "@react-spring/web";
import "../../slick-styles.css";

const HeroSlider = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Fetch the images from the database when the component mounts
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/hero-images"
        );
        setImages(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching images:", error);
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
    <>
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
    </>
  );
};

export default HeroSlider;
