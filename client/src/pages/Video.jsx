import React from "react";
import { useLocation, useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";

const Video = () => {
  const location = useLocation();
  const video = location.state;
  return (
    <div>
      <h1 className="text-center font-header tracking-wide text-2xl my-16 font-bold">
        {" "}
        Chapter {video.moduleNumber} : {video.title}
      </h1>
      <VideoPlayer videoSrc={video.src} />
    </div>
  );
};

export default Video;
