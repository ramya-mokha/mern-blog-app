import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './Pages/Main';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Layout from './Pages/Layout';
import CreatePost from './Pages/CreatePost';
import Post from './components/Post';
import EditPost from './Pages/EditPost';

const RoutesFile = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path={"/editPost/:id"} element={<EditPost/>}/>
        <Route element={<Login/>} path={'/login'}/>
        <Route element={<Register/>} path={'/register'}/>
        
        <Route element={<CreatePost/>} path={'/create'} />
        <Route element={<Post/>} path={'/post/:id'} />
       </Route>
    </Routes>
  )
}

export default RoutesFile;
