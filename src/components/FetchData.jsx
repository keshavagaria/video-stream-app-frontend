import axios from "axios";
import { Button } from "flowbite-react";
import React,{ useEffect } from "react"
import { useState } from 'react'




function FetchData(){

    const [data,setData]=useState([]);
  
        useEffect(()=>{
                axios.get('http://localhost:8080/api/v1/videos')
                //axios.get('https://video-streaming-app-backend-production-50f7.up.railway.app/api/v1/videos')
                .then(res=>setData(res.data))
                .catch(err=>console.log(err));
        },[]);

         // Function to delete a post using Axios
  const deletePost = async (videoId) => {
    try {
      //await axios.delete(`http://localhost:8080/api/v1/videos/${videoId}`);
      await axios.delete(`http://localhost:8080/api/v1/videos/${videoId}`);
      console.log("Post deleted:", id);
      setData(data.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
        
    return (

        <div>

<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Video ID</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody> 
   { 
    data.map((user,index)=>{
        return <tr key={index}>
                    <td>{user.videoId}</td>
                    <td>{user.title}</td>
                    <td>{user.description}</td>
                    <td><Button class="btn btn-danger" 
                    onClick={() => deletePost(user.videoId)}>Delete</Button></td>
                </tr>
    })
   }
  </tbody>
</table>
        </div>
    )
}


export default FetchData