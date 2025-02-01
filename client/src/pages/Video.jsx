import React from "react";
import VideoPlayer from "../components/VideoPlayer";

const Video = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">React Video Player</h1>
      <VideoPlayer videoSrc="https://cdn.pixabay.com/video/2024/11/07/240330_large.mp4" />
    </div>
  );
};

export default Video;
