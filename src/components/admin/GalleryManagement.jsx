import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrFormEdit, GrFormTrash, GrFormAdd } from "react-icons/gr";

const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [newImage, setNewImage] = useState({
    image_file: null, // New state to store the file object
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/gallery?page=${currentPage}&limit=5`
      );
      setImages(response.data.images);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [currentPage]);

  const handleDelete = async (imageId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this image?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/gallery/${imageId}`);
        fetchImages();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (image) => {
    setCurrentImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleCancelEdit = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // If a new image file is selected, append it; otherwise, use the existing image
      if (newImage.image_file) {
        formDataToSend.append("image", newImage.image_file);
      } else {
        formDataToSend.append("image", currentImage.image_url);
      }

      await axios.put(
        `http://localhost:3000/api/gallery/${currentImage.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchImages();
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddImageChange = (e) => {
    setNewImage({
      ...newImage,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    try {
      // Create a FormData object to handle file upload
      const formData = new FormData();
      formData.append("image", newImage.image_file); // Append the file to the FormData object

      await axios.post("http://localhost:3000/api/gallery/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
        },
      });
      setNewImage({
        image_file: null,
      });
      fetchImages();
      handleCloseAddModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileInputChange = (e) => {
    setNewImage({
      ...newImage,
      image_file: e.target.files[0], // Update the image_file state with the selected file
    });
  };

  const handleCloseAddModal = () => setShowAddModal(false);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 select-none">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mt-10 mb-10">
        <h2 className="text-xl font-bold mb-4">Gallery Management</h2>

        <button
          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4"
          onClick={() => setShowAddModal(true)}
        >
          Add New Image <GrFormAdd size="2em" className="ml-1" />
        </button>

        {showAddModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add New Image</h2>
              <form onSubmit={handleAddImage}>
                <div className="mb-4">
                  <label htmlFor="new_image" className="block mb-1">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image_file"
                    onChange={handleFileInputChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                    onClick={handleCloseAddModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  >
                    Add Image
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-3 border border-gray-300">Image</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.id}>
                <td className="p-3 border border-gray-300">
                  <div className="flex justify-center">
                    <img
                      src={image.image_url}
                      alt="Gallery Image"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                </td>
                <td className="p-3 border border-gray-300">
                  <button
                    className="flex items-center justify-between bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2 mb-1"
                    onClick={() => handleEdit(image)}
                  >
                    Edit <GrFormEdit className="ml-1" />
                  </button>
                  <button
                    className="flex items-center justify-between bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => handleDelete(image.id)}
                  >
                    Delete <GrFormTrash className="ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit Image</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="image_file" className="block mb-1">
                    Image
                  </label>
                  {currentImage && (
                    <img
                      src={currentImage.image_url}
                      alt="Gallery Image"
                      className="w-20 h-20 object-cover rounded mt-2 mb-2"
                    />
                  )}
                  <input
                    type="file"
                    name="image_file"
                    onChange={handleFileInputChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    accept="image/*"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end items-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryManagement;
