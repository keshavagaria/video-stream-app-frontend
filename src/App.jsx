import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoUpload from './components/VideoUpload'
import { Toaster } from 'react-hot-toast'


function App() {
  const [count, setCount] = useState(0)
  const [videoId, setVideoId] =useState("03eb135a-3516-4e4a-8c2c-521df3b33279");

  return (
    
    
      <div className='flex flex-col space-x-10 space-y-10' >
        
        <div className='text-center'>
          <h1 className='text-5xl font-extrabold dark:text-gray-100'>Video Streaming App</h1>
      </div>

 
      <div className='flex flex-row space-x-10 py-10'>
          <div className='items-start'>
            <h1 className='text-white'>Playing Video</h1>
            <video style={{width:500}} 
            src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`}
            controls></video>

{/* <video
    id="my-video"
    class="video-js"
    controls
    preload="auto"
    width="640"
    height="264"
    data-setup="{}"
  >
    <source src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`} type="video/mp4" />
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank"
        >supports HTML5 video</a
      >
    </p>
  </video> */}
        </div>
        
        <div className='items-end'>
          <VideoUpload />
         <Toaster></Toaster>
       </div>
    </div>  
    </div>
  )
}

export default App
