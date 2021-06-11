import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, likeAPost, unlikeAPost, deleteAComment, likeAComment, unlikeAcomment } from '../../store/posts'
import Comments from './Comments'
import SuggestedUsers from '../SuggestedUsers/SuggestedUsers'
import './PhotoFeed.css';
import Footer from '../Footer';


function PhotoFeed() {
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.posts);
    const user = useSelector(state => state.session.user)
    const userId = user.id
    const history = useHistory()
    let followedPosts;


    const [likeID, setLikeID] = useState()
    const [postID, setPostID] = useState()
    const [commentId, setCommentId] = useState()
    const [commentLike, setCommentLikeId] = useState()
    

    useEffect(() => {
        dispatch(getAllPosts())
        
    }, [dispatch])

    const handleLike = async (e) => {
        const user_id = userId
        const post_id = postID
        const params = { user_id, post_id }
        dispatch(likeAPost(params))
        
    }

    const handleCommentLike = async (id) => {
        const user_id = userId
        const comment_id = id
        const params = { user_id, comment_id }
        dispatch(likeAComment(params))
        setCommentId(0)
    }

    const handleUnlike = async (e) => {
        const post_id = Object.values(e.target)[1].value.id
        const like_id = likeID
        const params = { post_id, like_id }
        dispatch(unlikeAPost(params))
    }

    const handleCommentUnlike = async (id) => {
        const comment_id = id
        const like_id = commentLike
        dispatch(unlikeAcomment(like_id, comment_id))
        setCommentId(0)
    }

    const handleDeleteAComment = async () => {
        dispatch(deleteAComment(commentId))
    }

    const userHasLiked = (post, userId) => {
       
        if (post.post_likes.length > 0) {
            for (let i = 0; i < post.post_likes.length; i++) {
                if (post.post_likes[i].user_id === userId) {
                    return (
                        // liked
                        <span value={post} onClick={handleUnlike} onMouseOver={() => setLikeID(post.post_likes[i].id)}><i value={post} className="heart icon"></i></span>
                    )
                }
            }
        }
        // not liked
        return <span value={post} onClick={handleLike} onMouseOver={() => setPostID(post.id)}><i value={post} className="heart outline icon"></i></span>
    }

    const userOwnsComment = (comment, userId) => {
        if (comment.user_id === userId) {
            let commentId = comment.id
            return (
                <div key={comment.id}><span className='user' >{comment.user.username}</span><span className='commentSpan'>{comment.comment}</span>
                    <button
                        value={commentId}
                        onMouseOver={() => setCommentId(comment.id)}
                        onClick={handleDeleteAComment}
                        className='editBtn'
                    ><i className="trash alternate icon"></i></button>
                    {userOwnsCommentLike(comment, userId)}
                </div>)
        } else {
            return <div key={comment.id}><span className='user'>{comment.user.username}</span><span className='commentSpan'>{comment.comment}</span>{userOwnsCommentLike(comment, userId)}</div>
        }
    }

    const userOwnsCommentLike = (comment, userId) => {
        if (comment.comment_likes.length) {
            for (let i = 0; i < comment.comment_likes.length; i++) {
                if (comment.comment_likes[i].user_id === userId) {
                    // liked
                    return <i key={comment.id} value={comment.id} onMouseOver={() => setCommentLikeId(comment.comment_likes[i].id)} onClick={()=> handleCommentUnlike(comment.id)} className="heart icon"></i>
                } else {
                    return <i key={comment.id} value={comment.id} onMouseOver={() => setCommentLikeId(comment.comment_likes[i].id)} onClick={() => handleCommentLike(comment.id)} className="heart outline icon"></i> 
                }
            }
        }
        else {
            // not liked
            return <i key={comment.id} value={comment.id} onMouseOver={() => setCommentId(comment.id)} onClick={() => handleCommentLike(comment.id)} className="heart outline icon"></i>
        }

    }

    const userProfile = async (e) => {
        let targetUser = Object.values(e.target)
        history.push({
            pathname: `/user/${targetUser[1].id}`
        })
    };

    if (!allPosts) return null;
    { followedPosts = Object.values(allPosts).filter(function (el) { return el.user.username !== user.username && user.following.some(obj => obj.username === el.user.username) }) }

    return (
        <>
            <div className='container'>
                <div className='postsDiv'>
                    {Object.values(followedPosts).map(post => (
                        <div key={post.id} className='individualPhotoDiv'>
                            <div className='userInfo'>
                                <img src={post.user.avatar_url} className="avatar" alt="" />
                                <span className='user' onClick={userProfile} id={`${post.user_id}`}>{post.user.username}</span>
                            </div>
                            <img className='individualImg' src={post.photo_url} alt="" />
                            <div className='icons'>
                                {
                                    userHasLiked(post, userId)
                                }
                                {/* <i className="comment outline icon"></i>
                                <i className="paper plane outline icon"></i> */}
                            </div>
                            {
                                post.post_likes.length
                                    ? <div className='commentsandlikesDiv'>{post.post_likes.length} Likes</div>
                                    : <div className='commentsandlikesDiv'>0 Likes</div>
                            }
                            <div className='commentsandlikesDiv'><span className='user' onClick={userProfile} id={`${post.user_id}`}>{post.user.username}</span> {post.caption}
                                {post.post_comments.map(comment => (
                                    userOwnsComment(comment, userId)

                                ))}
                            </div>
                            <div className="commentDiv">
                                <Comments post_id={post.id} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className='suggested-users-div'>
                    <SuggestedUsers />
                </div>
            </div>
            <Footer/>
        </>
    )


}

export default PhotoFeed
