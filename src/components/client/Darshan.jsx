import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { dakor } from "../../assets";
import style from "../../style";
import { apiConfig } from "../../Services/GlobalApi";

const Darshan = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
         `${apiConfig.Base_Url}api/youtube-videos`
        );
        const formattedVideos = response.data.map((video) => {
          const videoId = new URL(video.video_link).searchParams.get("v");
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          return { ...video, embedUrl };
        });
        setVideos(formattedVideos);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchVideos();
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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="relative mb-4 overflow-hidden">
        <img
          src={dakor}
          alt="background image"
          className="w-full h-24 object-cover rounded-xl filter blur-sm"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">Darshan Videos</h1>
          {/* <p className="text-lg font-medium">Experience the divine</p> */}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-amber-200 to-transparent"></div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <Card
              key={video.video_link}
              className={`${style.colors.navbarbg} p-4 rounded-lg shadow-lg`}
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <iframe
                  width="100%"
                  height="200"
                  src={video.embedUrl}
                  title={video.video_title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </CardHeader>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mt-2">
                  {video.video_title}
                </Typography>
                <Typography variant="paragraph" color="gray" className="mt-2">
                  {video.video_description}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Darshan;
