import React from "react";
import VideoPlayer from "../components/VideoPlayer";

const Video = () => {
  return (
    <div>
      <h1 className="text-center text-2xl my-16 font-bold">Sample Video</h1>
      <VideoPlayer videoSrc="https://res.cloudinary.com/dsnsi0ioz/video/upload/v1742040619/Ska/course_video/qcqm6fuj6g9nx6sozotp.mp4" />
    </div>
  );
};

export default Video;

