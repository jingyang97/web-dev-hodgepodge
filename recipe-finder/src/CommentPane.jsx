import React, {useContext} from 'react';
import {StateContext} from './App';
import Comment from './Comment';
function CommentPane({comments}){
    let key = 1;
    return(
        <div>
            {comments.map(comment => (
                <Comment 
                    key = {key++}
                    comment = {comment}
                />
            ))}
        </div>
    )
}


export default CommentPane;