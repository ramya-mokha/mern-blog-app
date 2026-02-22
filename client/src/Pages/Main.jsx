import React from 'react'
import Post from '../components/Post'
import PostCard from '../components/PostCard'
import {useEffect} from 'react'
import { useState } from 'react'

const Main = () => {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
      fetch('http://localhost:3000/post')
      .then(response=>response.json())
      .then(fePosts=>setPosts(fePosts))

  },[])
  return (
    <div className="max-w-200 mx-auto flex flex-col gap-10 mt-5">
      {posts.length>0 && posts.map(post=>(
      
<PostCard {...post}/>
     

        
      ))
      }
    

    </div>
  )
}

export default Main
