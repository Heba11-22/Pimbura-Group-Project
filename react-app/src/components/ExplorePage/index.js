import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink} from "react-router-dom";
import { Modal } from '../../context/Modal';
import Comments from '../PhotoFeed/Comments'
import { getAllPosts } from '../../store/posts'

import './ExplorePage.css';
import '../../context/Modal.css';

const ExplorePage = () => {
    const allPosts = useSelector(state => state.posts.posts) || {};
    const [showModal, setShowModal] = useState(false);
    const [targetedPhoto, setTargetedPhoto] = useState()
    const [ targetimg, setTargetimg] = useState()
    const [ comments, setComments] = useState([])
    const [ post_id, setPost_id ] = useState()
    const [userProfile, setUserProfile] = useState()
    const [postUser, setPostUser] = useState()
    const dispatch= useDispatch()

    useEffect( () => {
       dispatch(getAllPosts())
    }, [dispatch])


    let thePost
    let ee
    let targetPost
    const onClick = async (e) => {
        setShowModal(true)
        thePost = Object.values(e.target)[1]
        ee = thePost.src
        targetPost = Object.values(e.target)
        targetPost = targetPost[1].value
        setPost_id(targetPost.id)
        setTargetedPhoto(ee)
        setTargetimg(targetPost)
        setComments(targetPost.post_comments)
        setPostUser(targetPost.user)
        setUserProfile(targetPost.user_id)

    }

   if (!allPosts) return null;

    return (
        <>
        <div className="posts-list">
            <ul>
                <div className="post-image-div2">
                    {Object.values(allPosts).map((post, i) => (
                            <li  key={i}>
                                <button className="post-image-button" onClick={onClick} value={post.id}>
                                    <div className="explore-tile">
                                        <img  className="explore-tile" src={post.photo_url} value={post}/>
                                    </div>
                                </button>
                            </li>
                    ))}
                </div>
            </ul>
            {showModal && (
                <Modal  onClose={() => setShowModal(false)} className="modal1">
                    <div className="modal">
                        <div className="post-image-div"><img className="post-image" src={targetedPhoto} /></div>
                        <div className="post-content">
                            <div className="first">
                                <NavLink to={`/user/${userProfile}`} className="first-nav">
                                    <div className="first-img"><img className="user-avatar" src={postUser.avatar_url}></img></div>
                                    <div className="user-follow">
                                        <div className="username-bold">{postUser.username}</div>
                                        <div className="follow"><NavLink to="/follow">Follow</NavLink></div>
                                    </div>
                                </NavLink>
                            </div>
                            <div className=" second-div">
                                <NavLink to={`/user/${userProfile}`} className=" second">
                                    <div className=" second-img"><img className=" avatar2" src={postUser.avatar_url}></img></div>
                                    <div className="username-bold2">{postUser.username} </div>
                                </NavLink>
                            </div>
                            <div className="post-caption">{targetimg.caption}</div>
                            <div className="comments-div">
                                <ul className="comments"> {comments.map((comment,i) =>
                                    <li key={i}>
                                        <div className="comments-list">
                                            <NavLink to={`/user/${comment.user_id}`} className="user-comment-avatar-div">
                                                    <div className="user-comment-avatar2"><img className="user-comment-avatar" src={comment.user.avatar_url}/></div>
                                                    <div className="user-comment">{comment.user.username}</div>
                                            </NavLink>
                                            <div className="comment">
                                                {comment.comment}
                                            </div>
                                        </div>
                                    </li>
                                    )}
                                </ul>
                            </div>
                            <div className='icons2'>
                                <i className="heart outline icon" style={{fontSize: "17px"}}></i>
                                <i className="comment outline icon" style={{fontSize: "17px"}}></i>
                                <i className="paper plane outline icon" style={{fontSize: "17px"}}></i>
                            </div>
                            <div className="post-comment-div">
                                <Comments  className="post-comment" post_id={post_id}/>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
               <footer>
        <ul className="footer-links">
          <li><a href="/">About</a></li>
          <li><a href="/">Blog</a></li>
          <li><a href="/">Jobs</a></li>
          <li><a href="/">API</a></li>
          <li><a href="/">Privacy</a></li>
          <li><a href="/">Terms</a></li>
          <li><a href="/">Top Accounts</a></li>
          <li><a href="/">Hashtags</a></li>
          <li><a href="/">Locations</a></li>
        </ul>
      </footer>
      <div className="footer-copyright">
					<h6>© 2021 Overshare from Marc, Savannah, Heba & Mimi</h6>
	    </div>
        </div>
        </>
    )
}


export default ExplorePage;
