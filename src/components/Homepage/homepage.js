import React, { useState, useEffect, useRef } from "react";
import "./homepage.css";

const VideoPlayer = () => {
  const videoIds = [
    "7i8ARjIeM2k",
    "8i4s4TYcPC8",
    "A3GFqgPOauw",
    "lXzSU7ezjp8",
    "TRB3AyW20eY",
  ]; // Replace with your actual video IDs
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const playerRef = useRef(null);

  // Function to load the next video in the playlist
  const nextVideo = () => {
    const newIndex = (currentVideoIndex + 1) % videoIds.length;
    setCurrentVideoIndex(newIndex);

    if (playerRef.current) {
      playerRef.current.loadVideoById(videoIds[newIndex]);
    }
  };

  // Function to load the previous video in the playlist
  const previousVideo = () => {
    const newIndex =
      currentVideoIndex === 0 ? videoIds.length - 1 : currentVideoIndex - 1;
    setCurrentVideoIndex(newIndex);

    if (playerRef.current) {
      playerRef.current.loadVideoById(videoIds[newIndex]);
    }
  };

  useEffect(() => {
    // Dynamically create the YouTube IFrame API script tag
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // When the YouTube IFrame API is ready, create the player instance
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        height: "360",
        width: "640",
        videoId: videoIds[currentVideoIndex],
        events: {
          onReady: (event) => {
            // Once the player is ready, play the video
            event.target.playVideo();
          },
        },
      });
    };

    // Clean up the player instance when the component unmounts
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div id="player"></div>
      <br></br>
      {/* Button to go to the next video */}
      <button className="next" onClick={nextVideo}>
        Next
      </button>
      {/* Button to go to the previous video */}
      <button className="previous" onClick={previousVideo}>
        Previous
      </button>
    </div>
  );
};

export default VideoPlayer;
