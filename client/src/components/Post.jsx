import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

const Post = () => {
  const [data,setData]=useState(null);
  const {userInfo,setUserInfo}=useContext
  (UserContext);

  const {id}=useParams();
  useEffect(()=>{
    fetch(`http://localhost:3000/post/${id}`).then(response=>response.json().then(data=>setData(data)));
  },[])
  if(!data) return <p>No post</p>
  return (
     
      <div className="max-w-4xl mx-auto flex flex-col gap-4 mt-10 h-full">
        <div className="flex items-center justify-between">
         <h2 className="text-5xl font-bold">
           {data.title}
          </h2>
           {userInfo && data.author._id===userInfo.id &&
        <Link to={`/editPost/${data._id}`}>
         <div className="bg-black text-white w-fit px-5 py-3 rounded-sm shadow-lg cursor-pointer hover:bg-gray-700 transition"><p >Edit Post</p></div></Link>
        }</div>
         <div className="flex gap-3 text-sm text-gray-500">
          
            <span className="text-gray-800 font-medium">{data.author.user}</span>
            <time dateTime="2026-02-02T16:45">{format(new Date(data.createdAt),"dd MMM yyyy hh:mm")}</time>
          </div>
          <span className="font-semibold">
          {data.summary}
          </span>
         
       
        <div className="w-full h-[300px]">
          <img src={`http://localhost:3000/uploads/${data.cover}`} alt="" className="w-full h-full object-cover rounded-md"/>
        </div>
        <div className="flex flex-col gap-2">
          
          <div dangerouslySetInnerHTML={{__html: data.content.replace(/&nbsp;/g, " ")}} 
          className="leading-8"/>
            
        </div>

      </div>
  
  );
};

export default Post;
