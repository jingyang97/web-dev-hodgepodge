import React from 'react';
import MyRecipeCard from './components/MyRecipeCard';


function MyRecipes({postsToDisplay, username}){
    console.log(postsToDisplay);
    console.log('username ==> ' + username);

    let myPosts = []
    postsToDisplay.forEach(post => {
        console.log(post.username);
        if (post.username === username) {
            myPosts.push(post);
        }
    });
    console.log(myPosts);
    return (
        <div className = "posts-container">
            {
                myPosts.map(post => (

                    <MyRecipeCard recipe={post} />
                ))
            }
        </div>
    );
};

export default MyRecipes;


{/* <PostCard
key = {post.postId}
post = {post}
/> */}
