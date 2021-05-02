// sunday MOCK
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { photoUpload } from "../store/posts"  // may change name of this function and store location! curly braces from export const
import './PhotoUploadPage.css'

function PhotoUploadPage() {
  let history = useHistory()

  const [ caption, setCaption ] = useState("")
  const [ image, setImage ] = useState(null)
  // const [errors, setErrors] = useState([]);
  // const history = useHistory();

  // useEffect(() => {
  //   const errors = [];
  //   if (!image) {
  //     errors.push("You must select a photo to create a post.");
  //   }

  //   setErrors(errors);
  // }, [img]);

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = { caption, image }
    let createdPhoto = await dispatch(photoUpload(submission)) // line ~42 of session.js data return
    console.log("------------")
    if(createdPhoto){            // if photo created, modal, redirect, etc.
      history.push('/')
    }
    else {
      history.push('/sign-up')
    }
  }

  return (
    <>
      <div className="upload-container">
        <div className="title-upload">
          <h1>Share your memories</h1>
          <h4>Choose a file from your computer</h4>
          <h4>Wait for it to upload</h4>
          <h4>Write a witty caption</h4>
          <h4>Share your experience with others</h4>
        </div>

        <form className="upload-form" onSubmit={handleSubmit} enctype="multipart/form">
          <div className="caption-text-box">
            <textarea
              type="text"
              value = {caption}
              placeholder = "Caption it"
              onChange={ (e) => setCaption(e.target.value)}
            />
          </div>

          <div className="upload-image-box">
          <label className="upload-label" htmlFor="file">Choose photo</label>
            <input
              id = "file"
              className="input-file"
              name = "image"
              type = "file"
              // placeholder = "Share your photo"
              onChange = { (e) => setImage(e.target.files[0])} // only accepts ONE photo if they try and upload multiple files

            />
          </div>

          <div className="submit-photo">
            <button
              type="submit"
            >Submit
            </button>
          </div>
        </form>
      </div>

    </>
  );
}

export default PhotoUploadPage;
