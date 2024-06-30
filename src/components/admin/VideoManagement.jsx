import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrFormEdit, GrFormTrash, GrFormAdd } from "react-icons/gr";

const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [formData, setFormData] = useState({
    video_link: "",
    video_title: "",
    video_description: "",
  });
  const [newVideo, setNewVideo] = useState({
    video_link: "",
    video_title: "",
    video_description: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/youtube-videos/admin?page=${currentPage}&limit=5`
      );
      setVideos(response.data.videos);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [currentPage]);

  const handleDelete = async (videoId, videoTitle) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the video "${videoTitle}"?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:3000/api/youtube-videos/${videoId}`
        );
        fetchVideos();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (video) => {
    setCurrentVideo(video);
    setFormData({
      video_link: video.video_link,
      video_title: video.video_title,
      video_description: video.video_description,
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
      video_link: currentVideo.video_link,
      video_title: currentVideo.video_title,
      video_description: currentVideo.video_description,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/youtube-videos/${currentVideo.video_id}`,
        formData
      );
      fetchVideos();
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddVideoChange = (e) => {
    setNewVideo({
      ...newVideo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/youtube-videos", newVideo);
      setNewVideo({
        video_link: "",
        video_title: "",
        video_description: "",
      });
      fetchVideos();
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
        <h2 className="text-xl font-bold mb-4">Video Management</h2>

        <button
          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-4"
          onClick={() => setShowAddModal(true)}
        >
          Add New Video <GrFormAdd size="2em" className="ml-1" />
        </button>

        {showAddModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add New Video</h2>
              <form onSubmit={handleAddVideo}>
                <div className="mb-4">
                  <label htmlFor="new_video_link" className="block mb-1">
                    Video Link
                  </label>
                  <input
                    type="text"
                    name="video_link"
                    value={newVideo.video_link}
                    onChange={handleAddVideoChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="new_video_title" className="block mb-1">
                    Video Title
                  </label>
                  <input
                    type="text"
                    name="video_title"
                    value={newVideo.video_title}
                    onChange={handleAddVideoChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="new_video_description" className="block mb-1">
                    Video Description
                  </label>
                  <input
                    type="text"
                    name="video_description"
                    value={newVideo.video_description}
                    onChange={handleAddVideoChange}
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
                    Add Video
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-3 border border-gray-300">Video</th>
              <th className="p-3 border border-gray-300">Video Title</th>
              <th className="p-3 border border-gray-300">Video Description</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.video_id}>
                <td className="p-3 border border-gray-300">
                  <div className="flex justify-center">
                    <iframe
                      width="200"
                      height="113"
                      src={`https://www.youtube.com/embed/${new URL(
                        video.video_link
                      ).searchParams.get("v")}`}
                      title={video.video_title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </td>
                <td className="p-3 border border-gray-300">
                  {video.video_title}
                </td>
                <td className="p-3 border border-gray-300">
                  {video.video_description}
                </td>
                <td className="p-3 border border-gray-300">
                  <button
                    className="flex items-center justify-between bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2 mb-1"
                    onClick={() => handleEdit(video)}
                  >
                    Edit <GrFormEdit className="ml-1" />
                  </button>
                  <button
                    className="flex items-center justify-between bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() =>
                      handleDelete(video.video_id, video.video_title)
                    }
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
              <h2 className="text-xl font-bold mb-4">Edit Video</h2>
              {/* Add iframe for video preview */}
              <div className="mb-4">
                <label htmlFor="video_preview" className="block mb-1"></label>
                <div className="flex justify-center mb-2">
                  <iframe
                    width="200"
                    height="113"
                    src={`https://www.youtube.com/embed/${new URL(
                      formData.video_link
                    ).searchParams.get("v")}`}
                    title={formData.video_title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              {/* End of video preview */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="video_link" className="block mb-1">
                    Video Link
                  </label>
                  <input
                    type="text"
                    name="video_link"
                    value={formData.video_link}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="video_title" className="block mb-1">
                    Video Title
                  </label>
                  <input
                    type="text"
                    name="video_title"
                    value={formData.video_title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="video_description" className="block mb-1">
                    Video Description
                  </label>
                  <input
                    type="text"
                    name="video_description"
                    value={formData.video_description}
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

export default VideoManagement;
