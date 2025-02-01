import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { PiCaretDoubleRightBold, PiCaretDoubleLeftBold } from "react-icons/pi";

const VideoPlayer = ({ videoSrc }) => {
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlayPause = () => setPlaying(!playing);
  const toggleMute = () => setMuted(!muted);
  const skipForward = () =>
    playerRef.current.seekTo(
      playerRef.current.getCurrentTime() + 10,
      "seconds"
    );
  const skipBackward = () =>
    playerRef.current.seekTo(
      playerRef.current.getCurrentTime() - 10,
      "seconds"
    );

  const handleProgress = (state) => setPlayed(state.playedSeconds);
  const handleDuration = (duration) => setDuration(duration);

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(playerContainerRef.current);
    }
  };

  useEffect(() => {
    if (screenfull.isEnabled) {
      const handleFullscreenChange = () => {
        setIsFullScreen(screenfull.isFullscreen);
      };
      screenfull.on("change", handleFullscreenChange);
      return () => {
        screenfull.off("change", handleFullscreenChange);
      };
    }
  }, []);

  const handleKeyboardEvents = (event) => {
    switch (event.key) {
      case "m": // Mute
        toggleMute();
        break;
      case " ":
        // Space: Play/Pause
        togglePlayPause();
        break;
      case "f":
        // Full-Screen
        toggleFullScreen();
        break;
      case "ArrowLeft":
        // Left Arrow: Skip Backward
        skipBackward();
        break;
      case "ArrowRight":
        // Right Arrow: Skip Forward
        skipForward();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyboardEvents);
    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener("keydown", handleKeyboardEvents);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      ref={playerContainerRef}
      className={`relative flex flex-col items-center bg-gray-900 rounded-lg shadow-lg w-[80%] mx-auto mt-10 ${
        isFullScreen ? "fixed inset-0 w-full h-full z-50 bg-black" : ""
      }`}
    >
      {/* Video Player */}
      <ReactPlayer
        ref={playerRef}
        url={videoSrc}
        playing={playing}
        muted={muted}
        controls={false} // Custom Controls
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="100%"
        height={isFullScreen ? "100vh" : "450px"}
      />

      {/* Controls */}
      <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-between w-full px-6">
        {/* Play/Pause & Skip (Center) */}
        <div className="flex items-center gap-4">
          <button
            onClick={skipBackward}
            className="p-3 rounded-full hover:-translate-x-1 transition"
          >
            <PiCaretDoubleLeftBold className="text-background text-xl" />
          </button>

          <button
            onClick={togglePlayPause}
            className="bg-accent p-3 rounded-full hover:bg-secondary transition"
          >
            {playing ? (
              <FaPause className="text-background text-xl" />
            ) : (
              <FaPlay className="text-background text-xl" />
            )}
          </button>

          <button
            onClick={skipForward}
            className="p-3 rounded-full hover:translate-x-1 transition"
          >
            <PiCaretDoubleRightBold className="text-background text-xl" />
          </button>
        </div>
      </div>

      {/* Mute and Full-Screen Controls */}
      <div className="absolute top-6 flex items-center justify-between w-full px-6">
        {/* Mute Button (Left) */}
        <button
          onClick={toggleMute}
          className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition"
        >
          {muted ? (
            <FaVolumeMute className="text-background text-xl" />
          ) : (
            <FaVolumeUp className="text-background text-xl" />
          )}
        </button>

        {/* Full-Screen Button (Right) */}
        <button
          onClick={toggleFullScreen}
          className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition"
        >
          {isFullScreen ? (
            <FaCompress className="text-background text-xl" />
          ) : (
            <FaExpand className="text-background text-xl" />
          )}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full absolute bottom-2 px-6">
        <div className="flex justify-between text-background text-sm">
          <span>{formatTime(played)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="relative w-full h-2 bg-gray-700 rounded-lg">
          <div
            className="absolute top-0 left-0 h-full bg-accent rounded-lg z-10"
            style={{ width: `${(played / duration) * 100}%` }}
          ></div>
          <input
            type="range"
            min={0}
            max={duration}
            value={played}
            onChange={(e) =>
              playerRef.current.seekTo(parseFloat(e.target.value), "seconds")
            }
            className="absolute top-0 left-0 w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
