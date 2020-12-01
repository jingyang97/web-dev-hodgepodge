import React, {useContext} from 'react';
import {StateContext} from './App';
function PostCard({post}){
    const context = useContext(StateContext);
    const handleClick = () => {
        context.fetchPostDetail(post.username, post.postId);
    }
    return(
        <div className = 'posts-card'>
        <img src= {post.img} alt="Avatar"/>
            <div className = 'container'>
                <h4><b>{post.title}</b></h4>
                <p>Author:{post.username}</p>
                <p>Category: {post.category}</p>
                <p>Date:{post.timeStamp}</p>
                <button onClick = {handleClick} className = 'anchorTag'>see more...</button>
            </div>
        </div>
    )
}


export default PostCard;