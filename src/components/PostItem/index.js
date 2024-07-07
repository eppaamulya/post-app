import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import './index.css'

const PostItem = ({onDelete, post, index }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-post/${index}`);
  };

  const deletePost = () => {
    onDelete(index)
  };

  return ( 
    <div key={index} className='post-item-container'>
      {post.type === 'image' ? (
        <li className='list-post-image'>
        <div className='post-image'>
          <img src={post.content} alt="Uploaded" style={{ maxWidth: '100%', height: '200px' }} />
          <p className='post-description'>{post.description}</p>
        </div>
        <div className='edit-button-container'>
          <button type="button" className='edit-button' onClick={handleEdit}><MdEdit className='edit-icon'/></button>
          <button type="button" className='edit-button' onClick={deletePost}><MdDelete className='edit-icon'/></button>
        </div>
      </li>
      ) : (
      <li className='list-post-image'>
        <div className='post-text'>
          <p className='post-content'>{post.content}</p>
          <p className='post-description'>{post.description}</p>
        </div>
        <div className='edit-button-container'>
          <button type="button" className='edit-button' onClick={handleEdit}><MdEdit className='edit-icon'/></button>
          <button type="button" className='edit-button' onClick={deletePost}><MdDelete className='edit-icon'/></button>
        </div>
      </li>
      )}  
    </div>  
  );
};

export default PostItem;
