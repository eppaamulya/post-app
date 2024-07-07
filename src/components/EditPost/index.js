import './index.css';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



const EditPost = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postToEdit = posts[index];
    if (postToEdit) {
      setPost(postToEdit);
      setContent(postToEdit.content);
      setDescription(postToEdit.description);
    }
  }, [index]);

  const handleSave = () => {
    if (post.type === 'image' && !content) {
      setErrorMessage('Please upload an image.');
      return;
    }
    if (post.type === 'text' && !content) {
      setErrorMessage('Please enter text.');
      return;
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts[index] = { ...post, content, description };
    localStorage.setItem('posts', JSON.stringify(posts));
    setSuccessMessage('Post edited successfully!');
    setErrorMessage('');

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='save-container'>
      <h1 className='post-heading'>Edit Post</h1>
      {post.type === 'image' ? (
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='input-text input-style'
            style={{ display: 'block' }}
          />
          {content && <img src={content} alt="Edited" style={{ maxWidth: '100%', height: '200px' }} />}
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='input-text input-style'
            style={{ display: 'block'}}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='input-text input-style'
            style={{ display: 'block'}}
          />
          {/* <p>{content}</p>
          <p>{description}</p> */}
        </div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className='save-button-container'>
        <button  className="save-button" onClick={handleSave}>Save</button>
        <button className='save-button' onClick={() => navigate('/')}>Cancel</button>
      </div>  
    </div>
  );
};

export default EditPost;
