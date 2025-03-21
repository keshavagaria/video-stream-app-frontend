import { useState,useRef } from 'react'
import VideoUpload from './components/VideoUpload'
import { Toaster } from 'react-hot-toast'
import VideoPlayer from "./components/VideoPlayer"
import FetchData from "./components/FetchData"
import { Button, TextInput } from "flowbite-react"



function App() {
  const [count, setCount] = useState(0);
  const [fieldValue, setFieldValue] = useState(null);
  const [videoId, setVideoId] =useState("3e70eabe-540a-441e-aa1e-d7bbe2c0bfd8");
  const [resolution, setResolution] =useState("360p");
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    muted: true,
    preload: "auto",
    download: true,
    playbackRates: [0.5, 1, 1.5, 2],
sources: [{
  src: `http://localhost:8080/api/v1/videos/${videoId}/${resolution}/master.m3u8`,
  type: 'application/x-mpegURL',
}]
};


const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };


  return (
    
    
    <>
    <Toaster />
    <div className="flex flex-col  items-center space-y-9 justify-center py-9">
      <h1 className="text-6xl font-bold text-gray-700 dark:text-gray-100">
        <u>Video Streaming App</u>
      </h1>

      <div className="flex mt-14 w-full space-x-2  justify-between">
        <div className="w-full">
          <h1 className="text-white text-center mt-3">Playing Video</h1>

           <div>
            <VideoPlayer
              options={videoJsOptions} onReady={handlePlayerReady}  
            >


            </VideoPlayer>
          </div>    
  <div className='flex flex-row'>
        <Button  onClick={() => { 
            setResolution('360p');
            
          }} color="success">360p</Button>
 
        {/* <Button  onClick={() => {
            setResolution('480p');
          }}>480p</Button> */}
  
        <Button onClick={() => {
          //resolution='720p';
            setResolution("720p");
          }} color="success">720p</Button>

      <Button  onClick={() => {
            setResolution('1080p');
          }} color="success">1080p</Button>
  </div>
        </div>

        <div className="w-fit">
          <VideoUpload />
        </div>
      </div>

      <div className="my-4 flex  space-x-4">
        <TextInput
          onClick={(event) => {
            console.log(event.target.value);
            setFieldValue(event.target.value);
          }}
          placeholder="Enter video id here"
          name="video_id_field"
        />
        <Button
          onClick={() => {
            setVideoId(fieldValue);
          }}
        >
          Play
        </Button>
      </div>

      <FetchData></FetchData>

        {/* <VideoPlayer2 
        src={`http://localhost:8080/api/v1/videos/${videoId}/${resolution}/master.m3u8`}></VideoPlayer2> */}
    </div>
  </>
  )
}

export default App
