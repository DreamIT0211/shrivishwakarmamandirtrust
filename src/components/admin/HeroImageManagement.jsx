import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrFormEdit, GrFormTrash, GrFormAdd } from "react-icons/gr";
import { apiConfig } from "../../Services/GlobalApi";

const HeroImageManagement = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `${apiConfig.Base_Url}api/hero-images/admin?page=${currentPage}&limit=5`
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
        await axios.delete(`${apiConfig.Base_Url}api/hero-images/${imageId}`);
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
    setCurrentImage(null);
  };

  const handleFileInputChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", newImage);

      await axios.put(
        `${apiConfig.Base_Url}api/hero-images/${currentImage.image_id}`,
        formData,
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

  const handleAddImage = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", newImage);

      await axios.post(`${apiConfig.Base_Url}api/hero-images/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNewImage(null);
      fetchImages();
      handleCloseAddModal();
    } catch (err) {
      console.error(err);
    }
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
        <h2 className="text-xl font-bold mb-4">Hero Image Management</h2>

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
                    name="image"
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
              <tr key={image.image_id}>
                <td className="p-3 border border-gray-300">
                  <div className="flex justify-center">
                    <img
                      src={image.image_link}
                      alt={`Image ${image.image_id}`}
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
                    onClick={() => handleDelete(image.image_id)}
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
                  <label htmlFor="image" className="block mb-1">
                    Image
                  </label>
                  {currentImage && (
                    <img
                      src={currentImage.image_link}
                      alt="Current Image"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
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
                    Update Image
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroImageManagement;
