    
import React, { useState } from "react";
import videoLogo from "../assets/upload-file.png"
import { Card, Button, Label, Alert,Textarea, TextInput,Progress } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";

    
    function VideoUpload(){
      
        const [meta,setMeta] = useState({
          title:"",
          description:"",
        })
        const [selectedFile,setSelectedFile]=useState(null);
        const [progress,setProgress] = useState(0);
        const [uploading,setUploading] = useState(false);
        const [message,setMessage] = useState("");


      
       
    
        function handleFileChange(event){
                console.log(event.target.files[0]);
                setSelectedFile(event.target.files[0]);
        }

        function formFieldChange(event){
          // console.log(event.target.name);
          // console.log(event.target.value);
          
          setMeta({
            ...meta,
            [event.target.name]:event.target.value,
          })
        }
        function handleForm(formEvent){
            console.log('button clicked');
            formEvent.preventDefault();
            console.log(meta);
            if(!selectedFile){
              alert('Please select the file...');
            } 
            saveVideoToServer(selectedFile,meta);
        }

        
        function resetForm(){

          setMeta({
            title:"",
            description:"",
          });
          setSelectedFile(null);
          setUploading(false);
          setMessage("");
        }

         //Submit file to server
         async function  saveVideoToServer(video,videoMetaData){
          setUploading(true);

          
          try{

            let formData = new FormData();
            formData.append("file",selectedFile);
            formData.append("title",videoMetaData.title);
            formData.append("description",videoMetaData.description);
            
            let response =  await axios.post(`http://localhost:8080/api/v1/videos`,formData, {
              headers: {
                  'Content-Type': 'multipart/form-data', // Set the content type for file upload
              },
              onUploadProgress: (progressEvent) => {

                const progress = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
              );
                    console.log(progressEvent)
                    setProgress(progress);
              }
            })

            console.log(response);
            setMessage("File Uploaded");
            toast.success("File Uploaded Successfully!!!")
            resetForm();
          }catch(error){
              console.log(error);
              setUploading(false);
              toast.error("Files Not uploaded...");
          }
        }
        return <div className="text-white">
            <Card className="bg-dark">
   
    <form noValidate className="flex flex-col space-y-6" onSubmit={handleForm} class="flex items-center space-x-6">
      <div>
        <div >
            <div className="mb-2 block ">
            <Label htmlFor="file-upload" value="Video Title" />
            </div>
            <TextInput value={meta.title} onChange={formFieldChange} name="title" placeholder="Enter title here" />
        </div>

    <div className="">
      <div className="mb-2 block">
        <Label htmlFor="comment" value="Description" />
      </div>
      <Textarea value={meta.description} onChange={formFieldChange} id="comment" name="description"
       placeholder="Leave a comment..." required rows={4} />
    </div>
<hr/>

  <div className="">
        
      <img className="h-16 w-16 object-cover" src={videoLogo} />
    
  <label className="block">
   
    <input onChange={handleFileChange} type="file" class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
  </label>
 
  </div>

  </div>
</form>

        <div className="">
          {uploading && (
            <Progress progress={progress} textLabel="Uploading..." size="lg" labelProgress labelText />
          )}
        </div>

        <div className="">
          {message && (
            <Alert color="success">
            <span className="font-medium">Success alert!</span> {message}
            </Alert>
          )}
        
      </div>


            <div className="flex justify-center">
            <Button disabled={uploading} onClick={handleForm}>Upload</Button>
            </div>

  
</Card>
        </div>
    }


    export default VideoUpload