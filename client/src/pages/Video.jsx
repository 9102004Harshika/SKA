import React from "react";
import VideoPlayer from "../components/VideoPlayer";

const Video = () => {
  return (
    <div>
      <h1 className="text-center text-2xl my-16 font-bold">Sample Video</h1>
      <VideoPlayer videoSrc="https://cdn.pixabay.com/video/2020/01/05/30902-383991325_large.mp4" />
    </div>
  );
};

export default Video;
