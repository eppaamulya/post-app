import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";

import PostItem from '../PostItem';
import './index.css'

const PostsDisplay = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, []);

  const handleNewPost = () => {
    navigate('/create-post');
  };

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  return (
    <div className='display-post-container'>
      <h1 className='display-post-heading'>Your Posts</h1>
      <ul className='post-list'>
        {posts.length === 0 ? (
          <div>
          <h1 className='no-post-text'>No Posts Available</h1>
          </div>

        ) : (
        posts.map((post, index) => (
          <PostItem
            key={index}
            post={post}
            index={index}
            onDelete={handleDelete}
          />
          ))
        )}  
      </ul>
      <button onClick={handleNewPost} className='new-post-button tooltip'><FiPlus className='new-post-icon'/><span className='tooltiptext'>Click Here to new post</span></button>
    </div>
  );
};

export default PostsDisplay;
