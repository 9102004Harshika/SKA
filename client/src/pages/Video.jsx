import React from "react";
import VideoPlayer from "../components/VideoPlayer";

const Video = () => {
  return (
    <div>
      <h1 className="text-center text-2xl my-16 font-bold">Sample Video</h1>
      <VideoPlayer videoSrc="https://res.cloudinary.com/dsnsi0ioz/video/upload/v1741463268/Ska/course_video/g32ckxytj5x9h0h8jaav.mp4" />
    </div>
  );
};

export default Video;

