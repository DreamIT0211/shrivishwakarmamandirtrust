import React, { useState, useEffect } from "react";
import axios from "axios";
import { dakor } from "../../assets";

export function DefaultGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/gallery/cli");
        setImages(response.data);
      } catch (err) {
        console.error("Failed to fetch images", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
      <div className="relative mb-4 overflow-hidden">
        <img
          src={dakor}
          alt="background image"
          className="w-full h-24 object-cover rounded-xl filter blur-sm"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">Gallery</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-amber-200 to-transparent"></div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 md:grid-cols-3 m-4 p-4">
        {images.map((image, index) => (
          <div key={index}>
            <img
              className="h-80 w-full max-w-full rounded-lg object-cover object-center hover:shadow-xl hover:scale-105"
              src={image.image_url}
              alt={`gallery-photo-${index}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default DefaultGallery;
