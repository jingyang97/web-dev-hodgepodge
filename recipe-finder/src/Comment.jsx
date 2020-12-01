import React from 'react';

function Comment({comment}){
    return(
        <div>
            <label>from:{comment.author}</label>
            <label>@{comment.date}</label><br/>
            <p>{comment.content}</p>
        </div>
    )
}

export default Comment;