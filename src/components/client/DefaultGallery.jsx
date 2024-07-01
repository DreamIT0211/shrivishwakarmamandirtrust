import React, { useState, useEffect } from "react";
import axios from "axios";
import { dakor } from "../../assets";

export function DefaultGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/gallery/cli");
        setImages(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch images");
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

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
      <div className="m-4 p-4">
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 md:grid-cols-3">
          {images.map((image, index) => (
            <div key={index} onClick={() => openModal(image.image_url)}>
              <img
                className="h-80 w-full max-w-full rounded-lg object-cover object-center hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                src={image.image_url}
                alt={`gallery-photo-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="relative">
            <button className="absolute top-2 right-2 text-white text-3xl" onClick={closeModal}>&times;</button>
            <img src={selectedImage} alt="Selected" className="max-h-screen max-w-full object-contain" />
          </div>
        </div>
      )}
    </>
  );
}

export default DefaultGallery;
