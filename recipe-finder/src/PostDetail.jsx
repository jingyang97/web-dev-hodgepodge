import React, { useContext, useState } from 'react';
import { StateContext } from './App';
import CommentPane from './CommentPane';
import OrderedList from './components/OrderedList';


function strArrayProcessor(plainText) {
    const strArray = plainText.split("\n");
    const processedArray = strArray.map((s) =>
    {
      return `
      <li>
        ${s}
      </li>`;
    }).join("");
    return processedArray;
  }


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

    const recipe = context.state.selectedPost;

    const ingredients = recipe.ingredients.split('\n');
    // ingredients = ingredients.map(i => {
    //     i.strip();
    // });
    console.log(ingredients);
    const instructions = recipe.instructions.split('\n');
    console.log(instructions);

    return(
        <div className = 'post-detail'>
            <article className="recipe-detail">

                <img className='img-detail' src={recipe.img} alt='Image for {recipe.title}'></img>
                <h2>{recipe.title}</h2>
                <p className="author">Written by {recipe.username}, {recipe.timeStamp}</p>
                <p className="description">{recipe.description}</p>
                <h3>Ingredients</h3>
                <OrderedList cname='ingredients' olist={ingredients} />
                <h3>Instructions</h3>
                <OrderedList cname='instructions' olist={instructions} />

            </article>



            <div className="comment-box">

                <textarea onChange = {handleOnChange} rows = '3' cols = '30' placeholder='Comment Here'></textarea><br/>
                <button onClick = {handleClick} >submit</button>
            </div>
            <CommentPane comments = {recipe.comments}/>
        </div>
    )
}

export default PostDetail;
{/* <img src="${recipe.image}" alt="image for ${recipe.title}" class="">

 */}
