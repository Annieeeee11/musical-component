import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import "./musical-box.css";

const MusicCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <div className={`card ${isPlaying ? "active" : ""}`}>
      {isPlaying ? (
        <div className="video-box">
          <video
            ref={videoRef}
            className="video"
            loop
            onTimeUpdate={handleTimeUpdate}
          >
            <source src="/video1.mp4" type="video/mp4" />
          </video>
          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-line"></div>
            <div
              className="progress-dot"
              style={{ left: `${progress}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwsAn_T3aA0ZWjVoysDInUL7Aj0n3TZUamsQ&s"
          className="image"
          alt="Album"
        />
      )}
      <div className="details">
        <h3 className="title">Sugar</h3>
        <p className="artist">Maroon 5</p>
      </div>
      <button className="playButton" onClick={togglePlayPause}>
        {isPlaying ? (
          <FaPause className="playIcon" />
        ) : (
          <FaPlay className="playIcon" />
        )}
        <span className="playText">{isPlaying ? "Pause" : "Play"}</span>
      </button>
    </div>
  );
};

export default MusicCard;
