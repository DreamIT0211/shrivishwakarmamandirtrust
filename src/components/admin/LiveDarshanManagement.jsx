import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { GrFormEdit, GrFormTrash, GrFormAdd } from "react-icons/gr";
import { apiConfig } from "../../Services/GlobalApi";

const LiveDarshanManagement = () => {
  const [liveDarshan, setLiveDarshan] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVideoLink, setNewVideoLink] = useState("");

  useEffect(() => {
    fetchLiveDarshan();
  }, []);

  const fetchLiveDarshan = async () => {
    try {
      const response = await axios.get(`${apiConfig.Base_Url}api/live-darshan`);
      setLiveDarshan(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddLiveDarshan = async () => {
    try {
      await axios.post(`${apiConfig.Base_Url}api/live-darshan`, {
        video_link: newVideoLink
      });
      fetchLiveDarshan();
      setShowAddModal(false);
      setNewVideoLink("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLiveDarshan = async () => {
    try {
      await axios.delete(`${apiConfig.Base_Url}api/live-darshan/${liveDarshan.id}`);
      setLiveDarshan(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 select-none">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mt-10 mb-10">
        <h2 className="text-xl font-bold mb-4">Live Darshan Management</h2>

        {liveDarshan ? (
          <div>
            <div className="mb-4">
              <ReactPlayer
                url={liveDarshan.video_link}
                playing={true}
                controls={true}
                width="100%"
                height="300px"
              />
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-4"
              onClick={handleDeleteLiveDarshan}
            >
              Delete Live Darshan
            </button>
          </div>
        ) : (
          <div>
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              onClick={() => setShowAddModal(true)}
            >
              Add Live Darshan <GrFormAdd size="2em" className="ml-1" />
            </button>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add Live Darshan</h2>
              <input
                type="text"
                value={newVideoLink}
                onChange={(e) => setNewVideoLink(e.target.value)}
                placeholder="Enter Video Link"
                className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
              />
              <div className="flex justify-between">
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={handleAddLiveDarshan}
                >
                  Add Live Darshan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveDarshanManagement;
