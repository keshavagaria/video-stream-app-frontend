import axios from "axios";
import React,{ useEffect } from "react"
import { useState } from 'react'




function FetchData(){

    const [data,setData]=useState([]);
  
        useEffect(()=>{
                axios.get('http://localhost:8080/api/v1/videos')
                .then(res=>setData(res.data))
                .catch(err=>console.log(err));
        },[]);
        
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
                </tr>
    })
   }
  </tbody>
</table>
        </div>
    )
}


export default FetchData