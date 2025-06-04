
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
import { TbMultiplier05X, TbMultiplier1X, TbMultiplier15X, TbMultiplier2X } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
const VideoPlayer = ({ videoSrc }) => {
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [buffering, setBuffering] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
const [settingsView, setSettingsView] = useState("main"); // "main" or "speed"
const [flashIcon, setFlashIcon] = useState(null); // 'play' | 'pause' | null
const [quality, setQuality] = useState("Auto (720p)");

  const togglePlayPause = () => {
    setPlaying((prev) => !prev);
    setControlsVisible(true);
  };

  const toggleMute = () => setMuted((prev) => !prev);

  const skipForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10, "seconds");
    }
  };

  const skipBackward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10, "seconds");
    }
  };

  const handleProgress = (state) => {
    setPlayed(state.playedSeconds);
    setBuffering(state.seeking);
  };

  const handleDuration = (duration) => setDuration(duration);

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(playerContainerRef.current);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById("settings-menu");
      if (menu && !menu.contains(event.target)) {
        setShowSettingsMenu(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

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

  // Auto-hide controls after 3 seconds of inactivity (mouse move resets timer)
  useEffect(() => {
    if (!playing) {
      setControlsVisible(true);
      return;
    }
    let timer;
    const handleMouseMove = () => {
      setControlsVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setControlsVisible(false), 3000);
    };
    window.addEventListener("mousemove", handleMouseMove);
    timer = setTimeout(() => setControlsVisible(false), 3000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [playing]);

  const handleKeyboardEvents = (event) => {
    switch (event.key) {
      case "m":
        setMuted((prevMuted) => !prevMuted);
        break;
        case " ":
          event.preventDefault();
          setPlaying((prevPlaying) => {
            const newState = !prevPlaying;
            setFlashIcon(newState ? "play" : "pause");
            return newState;
          });
          setControlsVisible(true);
          break;
      case "f":
        toggleFullScreen();
        break;
      case "ArrowLeft":
        skipBackward();
        break;
      case "ArrowRight":
        skipForward();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (flashIcon) {
      const timer = setTimeout(() => setFlashIcon(null), 600); // show for 600ms
      return () => clearTimeout(timer);
    }
  }, [flashIcon]);
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardEvents);
    return () => {
      window.removeEventListener("keydown", handleKeyboardEvents);
    };
  }, []);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlaybackSpeedChange = () => {
    const speeds = [0.5, 1, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    setControlsVisible(true);
  };

  return (
    <div
      ref={playerContainerRef}
      className={`relative flex flex-col bg-black rounded-lg shadow-lg w-[45%] mx-auto mt-10 ${
        isFullScreen ? "fixed inset-0 w-full h-full z-50" : ""
      }`}
      onClick={() => setControlsVisible(true)} // clicking anywhere shows controls
    >
      {/* Title Overlay */}
      <div className="absolute top-2 left-4 z-20 text-white font-semibold text-lg select-none">
        Shree Kalam Academy
      </div>
      {flashIcon && (
  <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
    <div className="bg-yellow-400 bg-opacity-30 rounded-full p-6 animate-ping-fast flex items-center justify-center">
      {flashIcon === "play" ? (
        <FaPlay className="text-white text-xl" />
      ) : (
        <FaPause className="text-white text-xl" />
      )}
    </div>
  </div>
)}
<style jsx>{`
  @keyframes ping-fast {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.5);
    }
  }
  .animate-ping-fast {
    animation: ping-fast 0.6s ease-out;
  }
`}</style>



      {/* ReactPlayer */}
      <div className="relative w-full pt-[56.25%] max-h-[500px]">
        <ReactPlayer
          ref={playerRef}
          url={videoSrc}
          playing={playing}
          muted={muted}
          controls={false}
          playbackRate={playbackSpeed}
          onProgress={handleProgress}
          onDuration={handleDuration}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
          onBuffer={() => setBuffering(true)}
          onBufferEnd={() => setBuffering(false)}
        />
        {/* Buffering Spinner */}
        {buffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-30">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div
         className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 pb-2 pt-1 transition-opacity duration-300 gap-2 flex flex-col ${
          controlsVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        

        {/* Progress Bar */}
        <div className="relative w-full h-[3px] bg-tertiary  rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-tertiary rounded-full"
            style={{ width: `${(played / duration) * 100}%` }}
          ></div>
          <input
            type="range"
            min={0}
            max={duration}
            value={played}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              playerRef.current.seekTo(newValue, "seconds");
            }}
            className="absolute top-0 left-0 w-full h-[6px] bg-transparent rounded-full appearance-none cursor-pointer z-20"
            style={{
              appearance: "none",
              background: "transparent",
            }}
            // To ensure it doesn't exceed the played time
            step="any"
          />
          <div
            className="absolute top-0 left-0 h-full bg-accent rounded-full z-10"
            style={{ width: `${(played / duration) * 100}%` }}
          ></div>
        </div>

        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            background-color: hsl(41, 100%, 62%);
            border-radius: 50%;
            cursor: pointer;
            z-index: 10;
            transition: background-color 0.3s ease;
          }

          input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background-color: hsl(41, 100%, 62%);
            border-radius: 50%;
            cursor: pointer;
            z-index: 10;
          }
        `}</style>
        <div className="flex items-center justify-between gap-2 mt-1">
           {/* Left Controls */}
      <div className="flex items-center gap-4">
      <button onClick={togglePlayPause} className="text-white hover:text-gray-300">
        {playing ? <FaPause className="text-2xl" /> : <FaPlay className="text-xl" />}
      </button>
      <button onClick={toggleMute} className="text-white hover:text-gray-300">
        {muted ? <FaVolumeMute className="text-2xl" /> : <FaVolumeUp className="text-2xl" />}
      </button>
     
      <span className="text-white text-sm select-none">
        {formatTime(played)} / {formatTime(duration)}
      </span>
    </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
      <div className="relative" >
  <button
    onClick={() => {
      setShowSettingsMenu((prev) => !prev);
      setSettingsView("main");
    }}
    className="text-white hover:text-gray-300"
    title="Settings"
  >
    <span className="flex items-center justify-center">
  <IoSettingsSharp className="text-2xl mt-1.5" />
</span>

  </button>

  {showSettingsMenu && (
    <div  id="settings-menu" className="absolute bottom-full mb-2 right-0 bg-black border border-gray-700 rounded-md shadow-lg w-44 z-50 transition-all duration-200">
      {settingsView === "main" ? (
        <>
          <button
            onClick={() => setSettingsView("subtitles")}
            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
          >
            Subtitles
          </button>
          <button
            onClick={() => setSettingsView("speed")}
            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
          >
            Playback Speed
          </button>
          <button
            onClick={() => setSettingsView("quality")}
            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
          >
            Quality
          </button>
        </>
      ) : settingsView === "speed" ? (
        <div>
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
            <span className="text-white font-semibold text-sm">Speed</span>
            <button
              onClick={() => setSettingsView("main")}
              className="text-sm text-gray-400 hover:text-white"
            >
              Back
            </button>
          </div>
          {[0.5, 1, 1.5, 2].map((speed) => (
            <button
              key={speed}
              onClick={() => {
                setPlaybackSpeed(speed);
                setShowSettingsMenu(false);
                setControlsVisible(true);
              }}
              className={`block w-full text-left px-4 py-2 text-white hover:bg-gray-700 ${
                playbackSpeed === speed ? "bg-gray-800 font-bold" : ""
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      ) : settingsView === "subtitles" ? (
        <div>
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
            <span className="text-white font-semibold text-sm">Subtitles</span>
            <button
              onClick={() => setSettingsView("main")}
              className="text-sm text-gray-400 hover:text-white"
            >
              Back
            </button>
          </div>
          <button className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700">
            Off
          </button>
          <button className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700">
            English (auto)
          </button>
        </div>
      ) : settingsView === "quality" ? (
        <div>
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
          <span className="text-white font-semibold text-sm">Quality</span>
          <button
            onClick={() => setSettingsView("main")}
            className="text-sm text-gray-400 hover:text-white"
          >
            Back
          </button>
        </div>
        {["Auto (720p)", "480p", "360p"].map((q) => (
          <button
            key={q}
            onClick={() => {
              setQuality(q);
              setShowSettingsMenu(false);
              setControlsVisible(true);
              setSettingsView("main");
            }}
            className={`block w-full text-left px-4 py-2 text-white hover:bg-gray-700 ${
              quality === q ? "bg-gray-800 font-bold" : ""
            }`}
          >
            {q}
          </button>
        ))}
      </div>
      ) : null}
    </div>
  )}
</div>

      <button onClick={toggleFullScreen} className="text-white hover:text-gray-300" title="Toggle Fullscreen">
        {isFullScreen ? <FaCompress className="text-2xl" /> : <FaExpand className="text-xl" />}
      </button>
    </div>
    </div>

      </div>
    
    </div>
  );
};

export default VideoPlayer;
