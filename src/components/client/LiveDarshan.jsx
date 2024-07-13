// LiveDarshan.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { dakor } from "../../assets";
import { apiConfig } from "../../Services/GlobalApi";

const LiveDarshan = () => {
  const [videoLink, setVideoLink] = useState("");
  const [isServerDown, setIsServerDown] = useState(false);
  const staticVideoLink = "https://www.youtube.com/watch?v=F138ZOPITJE&ab_channel=ShriVishwakarmaMandirTrust";

  useEffect(() => {
    // Fetch the current video link from the database when the component mounts
    const fetchVideoLink = async () => {
      try {
        const response = await axios.get(
          `${apiConfig.Base_Url}ap/live-darshan`
        );
        setVideoLink(response.data.video_link);
      } catch (error) {
        console.error("Error fetching video link:", error);
        setIsServerDown(true);
      }
    };

    fetchVideoLink();
  }, []);

  return (
    <>
      <div className="relative mb-1 overflow-hidden">
        <img
          src={dakor}
          alt="background image"
          className="w-full h-24 object-cover rounded-xl filter blur-sm"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">Live Darshan</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-amber-200 to-transparent">
        </div>
      </div>
      <div className="flex flex-col items-center justify-center select-none -mb-60">
        <div className="flex justify-center item center w-full h-screen">
          <div className="flex justify-center items-center bg-white rounded-lg hover:shadow-2xl w-full h-4/6 max-w-4xl overflow-hidden m-4">
            {isServerDown || !videoLink ? (
              <ReactPlayer
                url={staticVideoLink}
                className="react-player"
                playing
                controls
                width="100%"
                height="100%"
              />
            ) : (
              <ReactPlayer
                url={videoLink}
                className="react-player"
                playing
                controls
                width="100%"
                height="100%"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveDarshan;