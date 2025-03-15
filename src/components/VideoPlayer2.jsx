import React, { useEffect, useRef,useState } from "react"
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Hls from "hls.js";
import toast from "react-hot-toast";
import "videojs-quality-selector-hls";
import 'videojs-contrib-quality-levels';


function VideoPlayer2({ src }){

    const videoRef=useRef(null);
    const playerRef=useRef(null);

  

    useEffect(() => {
      //for init
  
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        muted: true,
        preload: "auto",
        download: true,
        playbackRates: [0.5, 1, 1.5, 2],
      
      });
  

     
            if (Hls.isSupported()) {
              const hls = new Hls();
              hls.loadSource(src);
              hls.attachMedia(videoRef.current);
              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play();
              });
            } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
              videoRef.current.src = src;
              videoRef.current.addEventListener("canplay", () => {
                videoRef.current.play();
              });
            } else {
              console.log("video format not supportted");
              toast.error("Video format not supporteds");
            }
          


          }, [src]);



  

    return (
        <div>
        <div data-vjs-player >
          <video
          id="player"
            ref={videoRef}
            style={{
              width: "100%",
              height: "500px",
            }}
            className="vjs-default-skin video-js "
            controls 
            >
              
          </video>

        </div>
      </div>
    )
}


export default VideoPlayer2
