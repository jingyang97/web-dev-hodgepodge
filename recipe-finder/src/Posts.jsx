import React from 'react';
import PostCard from './PostCard';
function Posts({postsToDisplay}){
    return(
        <div className = "posts-container">
            {
                postsToDisplay.map(post => (
                    <PostCard
                        key = {post.postId}
                        post = {post}
                    />
                ))
            }
        </div>
    )
}

export default Posts;