import './index.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CiImageOn } from "react-icons/ci";
import { MdTextFields } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

const CreatePost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputCaption, setInputCaption] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = (event) => {
    event.preventDefault();
    if (!showImageUpload && !showTextInput) {
      setErrorMessage('Please select an image or text type to post*');
      return;
    }
    if (showImageUpload && !selectedImage) {
      setErrorMessage('Please upload an image*');
      return;
    }
    if (showTextInput && !inputText) {
      setErrorMessage('Please enter text*');
      return;
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    if (selectedImage) {
      posts.push({ type: 'image', content: selectedImage, description: inputCaption });
    } else if (inputText) {
      posts.push({ type: 'text', content: inputText, description: inputContent });
    }

    localStorage.setItem('posts', JSON.stringify(posts));
    setSuccessMessage('Post created successfully:)!');
    setErrorMessage('');

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="container-1">
      <div className='create-container'>
        <h1 className='post-heading'>Create A New Post</h1>
        <form className='form-container' onSubmit={handlePost}>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <div className='button-container'>
          <button type="button" onClick={() => {
            setShowImageUpload(true);
            setShowTextInput(false);
          }} className='image-button-1'><CiImageOn className='icon-size'/></button>
          <button type='button' onClick={() => {
            setShowImageUpload(false);
            setShowTextInput(true);
          }} className='image-button-2'><MdTextFields className='icon-size' /></button>
          </div>
          
          {showImageUpload && (
            <div>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageUpload}
                className='input-image'
                // style={{ display: 'flex', margin: '20px 0', flexDirection: 'column', justifyContent: 'center' }}
              />
              {selectedImage && (
                <div className='selected-image'>
                  <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', height: '200px' }} />
                  <label className='image-label' htmlFor="input-caption">Caption</label>
                  <input type="text" className='image-input' value={inputCaption} id="input-caption" onChange={(e) => setInputCaption(e.target.value)} />
                </div>
              )}
            </div>
          )}

          {showTextInput && (
            <div className='text-field'>
              <label htmlFor="title" className="input-label">Title</label>
              <input type="text" className="input-text" id="title" value={inputText} onChange={(e) => setInputText(e.target.value)} />
              <label htmlFor="content" className="input-label">Content/Description</label>
              <textarea cols="40" rows='8' className="input-text" id="content" value={inputContent} onChange={(e) => setInputContent(e.target.value)} />
            </div>
          )}

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <button type='submit' className='post-button'>Post<IoIosSend className='post-icon' /></button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
