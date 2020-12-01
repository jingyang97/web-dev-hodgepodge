import React, {useContext, useState} from 'react';
import {StateContext} from './App';
import CommentPane from './CommentPane';
function PostDetail(){
    const context = useContext(StateContext);
    const [comment, setComment] = useState('');
    const handleOnChange = (e) => {
        setComment(e.target.value);
    }
    const handleClick = () => {
        context.addComment(
            context.state.selectedPost.userId,
            context.state.selectedPost.postId,
            context.state.userName,
            comment 
        );
    }
    return(
        <div className = 'post-detail'>
            <h2>{context.state.selectedPost.title}</h2>
            <h3>{context.state.selectedPost.username}</h3>
            <h3>{context.state.selectedPost.timeStamp}</h3>
            <img className = 'img-detail' src = {context.state.selectedPost.img} alt = 'img'></img>
            <p>{context.state.selectedPost.content}</p>
            <div>
                <label>Comment here:</label><br/>
                <textarea onChange = {handleOnChange} rows = '3' cols = '30'></textarea><br/>
                <button onClick = {handleClick} >submit</button>
            </div>
            <CommentPane comments = {context.state.selectedPost.comments}/>
        </div>
    )
}

export default PostDetail;