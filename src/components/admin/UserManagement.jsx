import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrFormEdit, GrFormTrash } from "react-icons/gr";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    FullName: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users?page=${currentPage}&limit=5`
      );
      if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setUsers([]);
        setTotalPages(1);
        setError("Unexpected response format");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${userId}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
        setError("Failed to delete user");
      }
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      Username: user.Username,
      Email: user.Email,
      FullName: user.FullName,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelEdit = () => {
    setShowModal(false);
    setFormData({
      Username: currentUser.Username,
      Email: currentUser.Email,
      FullName: currentUser.FullName,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/users/${currentUser.UserID}`,
        formData
      );
      fetchUsers();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      setError("Failed to update user");
    }
  };

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
        <h2 className="text-xl font-bold mb-4">User Management</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-3 border border-gray-300">Username</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">Full Name</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.UserID}>
                  <td className="p-3 border border-gray-300">{user.Username}</td>
                  <td className="p-3 border border-gray-300">{user.Email}</td>
                  <td className="p-3 border border-gray-300">{user.FullName}</td>
                  <td className="p-3 border border-gray-300">
                    <button
                      className="flex items-center justify-between bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2 mb-1"
                      onClick={() => handleEdit(user)}
                    >
                      Edit <GrFormEdit className="ml-1" />
                    </button>
                    <button
                      className="flex items-center justify-between bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      onClick={() => handleDelete(user.UserID)}
                    >
                      Delete <GrFormTrash className="ml-1" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 border border-gray-300 text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded w-96">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="Username" className="block mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="Username"
                    value={formData.Username}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="Email" className="block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="FullName" className="block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="FullName"
                    value={formData.FullName}
                    onChange={handleChange}
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

export default UserManagement;
