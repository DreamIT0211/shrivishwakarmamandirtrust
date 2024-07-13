import React, { useState, useEffect } from "react";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";
import { dakor, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10 } from "../../assets";
import { apiConfig } from "../../Services/GlobalApi";

export function DefaultGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const defaultImages = [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${apiConfig.Base_Url}api/gallery/cli`);
        setImages(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch images");
        setImages(defaultImages.map((image, index) => ({ image_url: image })));
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
        <div className="text-amber-400 animate-spin">
          <ImSpinner9 className="h-12 w-12" />
        </div>
      </div>
    );
  }

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
        {error && <div className="text-center text-red-500"></div>}
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
