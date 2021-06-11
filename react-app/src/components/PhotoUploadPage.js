// sunday MOCK
import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { photoUpload } from "../store/posts"  // may change name of this function and store location! curly braces from export const
import './PhotoUploadPage.css'
import {useHistory} from 'react-router-dom'
import { useAlert } from 'react-alert'
import igPic from "../images/ig-face.jpeg"
import igPic2 from "../images/igpic2.jpg"
import background from "../images/watercolor.jpeg"
import Footer from "./Footer";


function PhotoUploadPage() {
  const dispatch = useDispatch();
  let history = useHistory();
  const alert = useAlert();
  const sessionUser = useSelector(state => state.session.user);
  const [ caption, setCaption ] = useState("");
  const [ image, setImage ] = useState(null);
  const [photoCreated, setPhotoCreated] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = { caption, image }
    let createdPhoto = await dispatch(photoUpload(submission)) // line ~42 of session.js data return
    await alert.show('Post Created!')
    await history.push(`/user/${sessionUser.id}`)
  }

  return (
    <div className="upload-div">
      <div className="top-upload-container">

        <div className="left-ig">
          <div className="ig-pic">
            <img src={igPic} alt="cute hair"/>
          </div>

          <div>
            <div className="title-text">
              <h1>Bringing you closer to the people and things you
                <span className="love">
                  <button className="love2" tabIndex="0">
                    <span style={{WebKitBackgroundClip:"text"}}>
                    <span className="love-link">love</span>
                    </span>
                  </button>
                </span>
              </h1>
            </div>
          </div>

        </div>


        <div className="right-ig">
          <div className="ig-guy">
              <div className="ig-pic">
                <img src={igPic2} alt="instagram man"/>
              </div>
          </div>
        </div>

      </div>


      <div className="upload-container" style={{backgroundImage:`url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
        <div className="title-upload">
          <h4>Connect with friends, overshare what you’re up to or see what's new from others all over the world.</h4>
          <h4>Explore our community where you can feel free to be yourself and </h4>
          <h4>overshare everything from your daily moments to life's highlights.</h4>
          <div className="how-to">
          {/* <div className="upload-image-box">
          <label className="upload-label" htmlFor="file"><i class="fas fa-upload"></i></label>
            <input
              id = "file"
              className="input-file"
              name = "image"
              type = "file"
              onChange = { (e) => setImage(e.target.files[0])} // only accepts ONE photo if they try and upload multiple files

            />
          </div> */}
            <h4>Choose a file from your computer</h4>
            {/* <div className="upload-image-box">
          <label className="upload-label" htmlFor="file"><i class="fas fa-upload"></i></label>
            <input
              id = "file"
              className="input-file"
              name = "image"
              type = "file"
              onChange = { (e) => setImage(e.target.files[0])} // only accepts ONE photo if they try and upload multiple files

            />
          </div> */}
            <h4>Wait for it to upload</h4>
            <h4>Write a witty caption</h4>
          </div>


        </div>

        <form className="upload-form" onSubmit={handleSubmit} encType="multipart/form">
          <div className="caption-text-box">
            <textarea
              type="text"
              value = {caption}
              placeholder = "Caption it"
              onChange={ (e) => setCaption(e.target.value)}
            />
          </div>

          <div className="upload-image-box">
          <label className="upload-label" htmlFor="file">Upload <i className="fas fa-upload"></i></label>
            <input
              id = "file"
              className="input-file"
              name = "image"
              type = "file"
              onChange = { (e) => setImage(e.target.files[0])} // only accepts ONE photo if they try and upload multiple files

            />
          </div>

          <div className="submit-photo">
            <button
              type="submit"
            >Submit
            </button>
            {photoCreated ? <p>Posted!</p> :<p></p>}
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default PhotoUploadPage;
