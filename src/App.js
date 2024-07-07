import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreatePost from './components/CreatePost';
import PostsDisplay from './components/PostsDisplay';
import EditPost  from './components/EditPost';



const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
        <Route path='/' element={<PostsDisplay />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/edit-post/:index' element={<EditPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
