import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import VideoUpload from './components/VideoUpload'
import { Toaster } from 'react-hot-toast'
import VideoPlayer from "./components/VideoPlayer"
import FetchData from "./components/FetchData"
import { Button, TextInput } from "flowbite-react"


function App() {
  const [count, setCount] = useState(0);
  const [fieldValue, setFieldValue] = useState(null);
  const [videoId, setVideoId] =useState("03eb135a-3516-4e4a-8c2c-521df3b33279");


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
          <video style={{
                width: "100%",
              }}
          src={`http://localhost:8080/api/v1/videos/stream/${videoId}`}
          controls>
        </video> 
      </div>
          {/* <div>
            <VideoPlayer
              src="{`http://localhost:8080/api/v1/videos/${videoId}`}"
            ></VideoPlayer>
          </div> */}

  
        </div>

        <div className="w-fit">
          <VideoUpload />
        </div>
      </div>

      <div className="my-4 flex  space-x-4">
        <TextInput
          onClick={(event) => {
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
    </div>
  </>
  )
}

export default App
