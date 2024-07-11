import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrFormEdit, GrFormTrash, GrFormAdd } from "react-icons/gr";
import { apiConfig } from "../../Services/GlobalApi";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    event_image: "",
    event_title: "",
    event_description: "",
  });
  const [newEvent, setNewEvent] = useState({
    event_image: "",
    event_title: "",
    event_description: "",
    event_image_file: null, // New state to store the file object
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${apiConfig.Base_Url}api/events?page=${currentPage}&limit=5`
      );
      setEvents(response.data.events);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentPage]);

  const handleDelete = async (eventId, eventTitle) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the event "${eventTitle}"?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${apiConfig.Base_Url}api/events/${eventId}`);
        fetchEvents();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setFormData({
      event_image: event.event_image,
      event_title: event.event_title,
      event_description: event.event_description,
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
      event_image: currentEvent.event_image,
      event_title: currentEvent.event_title,
      event_description: currentEvent.event_description,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("event_title", formData.event_title);
      formDataToSend.append("event_description", formData.event_description);

      // If a new image file is selected, append it; otherwise, use the existing image
      if (newEvent.event_image_file) {
        formDataToSend.append("event_image", newEvent.event_image_file);
      } else {
        formDataToSend.append("event_image", formData.event_image);
      }

      await axios.put(
        `${apiConfig.Base_Url}api/events/${currentEvent.event_id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchEvents();
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddEventChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      // Create a FormData object to handle file upload
      const formData = new FormData();
      formData.append("image", newEvent.event_image_file); // Append the file to the FormData object
      formData.append("event_title", newEvent.event_title);
      formData.append("event_description", newEvent.event_description);

      await axios.post(`${apiConfig.Base_Url}api/events/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
        },
      });
      setNewEvent({
        event_image: "",
        event_title: "",
        event_description: "",
        event_image_file: null,
      });
      fetchEvents();
      handleCloseAddModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileInputChange = (e) => {
    setNewEvent({
      ...newEvent,
      event_image_file: e.target.files[0], // Update the event_image_file state with the selected file
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
        <h2 className="text-xl font-bold mb-4">Event Management</h2>

        <button
          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4"
          onClick={() => setShowAddModal(true)}
        >
          Add New Event <GrFormAdd size="2em" className="ml-1" />
        </button>

        {showAddModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add New Event</h2>
              <form onSubmit={handleAddEvent}>
                <div className="mb-4">
                  <label htmlFor="new_event_image" className="block mb-1">
                    Event Image
                  </label>
                  <input
                    type="file"
                    name="event_image_file"
                    onChange={handleFileInputChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="new_event_title" className="block mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="event_title"
                    value={newEvent.event_title}
                    onChange={handleAddEventChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="new_event_description" className="block mb-1">
                    Event Description
                  </label>
                  <input
                    type="text"
                    name="event_description"
                    value={newEvent.event_description}
                    onChange={handleAddEventChange}
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
                    Add Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-3 border border-gray-300">Event Image</th>
              <th className="p-3 border border-gray-300">Event Title</th>
              <th className="p-3 border border-gray-300">Event Description</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.event_id}>
                <td className="p-3 border border-gray-300">
                  <div className="flex justify-center">
                    <img
                      src={event.event_image}
                      alt={event.event_title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                </td>
                <td className="p-3 border border-gray-300">
                  {event.event_title}
                </td>
                <td className="p-3 border border-gray-300">
                  {event.event_description}
                </td>
                <td className="p-3 border border-gray-300">
                  <button
                    className="flex items-center justify-between bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2 mb-1"
                    onClick={() => handleEdit(event)}
                  >
                    Edit <GrFormEdit className="ml-1" />
                  </button>
                  <button
                    className="flex items-center justify-between bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => handleDelete(event.event_id, event.event_title)}
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
              <h2 className="text-xl font-bold mb-4">Edit Event</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="event_image" className="block mb-1">
                    Event Image
                  </label>
                  {currentEvent && ( // Conditionally render the image if currentEvent is not null
                    <img
                      src={currentEvent.event_image}
                      alt={currentEvent.event_title}
                      className="w-20 h-20 object-cover rounded mt-2 mb-2"
                    />
                  )}
                  <input
                    type="file"
                    name="event_image_file"
                    onChange={handleFileInputChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    accept="image/*"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="event_title" className="block mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="event_title"
                    value={formData.event_title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="event_description" className="block mb-1">
                    Event Description
                  </label>
                  <input
                    type="text"
                    name="event_description"
                    value={formData.event_description}
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

export default EventManagement;
