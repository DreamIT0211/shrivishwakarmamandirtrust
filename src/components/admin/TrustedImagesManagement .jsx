import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrFormEdit, GrFormTrash, GrFormAdd } from "react-icons/gr";
import { apiConfig } from "../../Services/GlobalApi";

const TrustedImagesManagement = () => {
  const [trustees, setTrustees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentTrustee, setCurrentTrustee] = useState(null);
  const [newTrustee, setNewTrustee] = useState({
    trustee_image: null,
    trustee_name: "",
    trustee_mobileNo: "",
    trustee_description: "",
    trustee_title: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTrustees = async () => {
    try {
      const response = await axios.get(
        `${apiConfig.Base_Url}api/trustees?page=${currentPage}&limit=5`
      );
      setTrustees(response.data.trustees);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrustees();
  }, [currentPage]);

  const handleDelete = async (trusteeId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this trustee?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${apiConfig.Base_Url}api/trustees/${trusteeId}`);
        fetchTrustees();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (trustee) => {
    setCurrentTrustee(trustee);
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
      formDataToSend.append("trustee_name", newTrustee.trustee_name);
      formDataToSend.append("trustee_mobileNo", newTrustee.trustee_mobileNo);
      formDataToSend.append("trustee_description", newTrustee.trustee_description);
      formDataToSend.append("trustee_title", newTrustee.trustee_title);

      if (newTrustee.trustee_image) {
        formDataToSend.append("trustee_image", newTrustee.trustee_image);
      } else {
        formDataToSend.append("trustee_image", currentTrustee.trustee_image);
      }

      await axios.put(
        `${apiConfig.Base_Url}api/trustees/${currentTrustee.trustee_id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchTrustees();
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTrusteeChange = (e) => {
    setNewTrustee({
      ...newTrustee,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTrustee = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", newTrustee.trustee_image);
      formData.append("trustee_name", newTrustee.trustee_name);
      formData.append("trustee_mobileNo", newTrustee.trustee_mobileNo);
      formData.append("trustee_description", newTrustee.trustee_description);
      formData.append("trustee_title", newTrustee.trustee_title);

      await axios.post(`${apiConfig.Base_Url}api/trustees/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNewTrustee({
        trustee_image: null,
        trustee_name: "",
        trustee_mobileNo: "",
        trustee_description: "",
        trustee_title: "",
      });
      fetchTrustees();
      handleCloseAddModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileInputChange = (e) => {
    setNewTrustee({
      ...newTrustee,
      trustee_image: e.target.files[0],
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
        <h2 className="text-xl font-bold mb-4">Trustees Management</h2>

        <button
          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4"
          onClick={() => setShowAddModal(true)}
        >
          Add New Trustee <GrFormAdd size="2em" className="ml-1" />
        </button>

        {showAddModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add New Trustee</h2>
              <form onSubmit={handleAddTrustee}>
                <div className="mb-4">
                  <label htmlFor="new_trustee_image" className="block mb-1">
                    Trustee Image
                  </label>
                  <input
                    type="file"
                    name="trustee_image"
                    onChange={handleFileInputChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="trustee_name" className="block mb-1">
                    Trustee Name
                  </label>
                  <input
                    type="text"
                    name="trustee_name"
                    value={newTrustee.trustee_name}
                    onChange={handleAddTrusteeChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="trustee_mobileNo" className="block mb-1">
                    Trustee Mobile No
                  </label>
                  <input
                    type="text"
                    name="trustee_mobileNo"
                    value={newTrustee.trustee_mobileNo}
                    onChange={handleAddTrusteeChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="trustee_description" className="block mb-1">
                    Trustee Description
                  </label>
                  <input
                    type="text"
                    name="trustee_description"
                    value={newTrustee.trustee_description}
                    onChange={handleAddTrusteeChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="trustee_title" className="block mb-1">
                    Trustee Title
                  </label>
                  <input
                    type="text"
                    name="trustee_title"
                    value={newTrustee.trustee_title}
                    onChange={handleAddTrusteeChange}
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
                    Add Trustee
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-3 border border-gray-300">Trustee Image</th>
              <th className="p-3 border border-gray-300">Trustee Name</th>
              <th className="p-3 border border-gray-300">Trustee Mobile No</th>
              <th className="p-3 border border-gray-300">Trustee Description</th>
              <th className="p-3 border border-gray-300">Trustee Title</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trustees.map((trustee) => (
              <tr key={trustee.trustee_id}>
                <td className="p-3 border border-gray-300">
                  <img
                    src={trustee.trustee_image}
                    alt={`trustee ${trustee.trustee_id}`}
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="p-3 border border-gray-300">{trustee.trustee_name}</td>
                <td className="p-3 border border-gray-300">{trustee.trustee_mobileNo}</td>
                <td className="p-3 border border-gray-300">{trustee.trustee_description}</td>
                <td className="p-3 border border-gray-300">{trustee.trustee_title}</td>
                <td className="p-3 border border-gray-300">
                  <button
                    className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(trustee)}
                  >
                    <GrFormEdit size="1.5em" />
                  </button>
                  <button
                    className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                    onClick={() => handleDelete(trustee.trustee_id)}
                  >
                    <GrFormTrash size="1.5em" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit Trustee</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="trustee_image" className="block mb-1">
                    Trustee Image
                  </label>
                  <input
                    type="file"
                    name="trustee_image"
                    onChange={handleFileInputChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="trustee_name" className="block mb-1">
                    Trustee Name
                  </label>
                  <input
                    type="text"
                    name="trustee_name"
                    value={newTrustee.trustee_name}
                    onChange={handleAddTrusteeChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="trustee_mobileNo" className="block mb-1">
                    Trustee Mobile No
                  </label>
                  <input
                    type="text"
                    name="trustee_mobileNo"
                    value={newTrustee.trustee_mobileNo}
                    onChange={handleAddTrusteeChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="trustee_description" className="block mb-1">
                    Trustee Description
                  </label>
                  <input
                    type="text"
                    name="trustee_description"
                    value={newTrustee.trustee_description}
                    onChange={handleAddTrusteeChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="trustee_title" className="block mb-1">
                    Trustee Title
                  </label>
                  <input
                    type="text"
                    name="trustee_title"
                    value={newTrustee.trustee_title}
                    onChange={handleAddTrusteeChange}
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
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            className={`bg-gray-500 text-white py-2 px-4 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`bg-gray-500 text-white py-2 px-4 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustedImagesManagement;
