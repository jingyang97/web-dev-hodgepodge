import React from 'react';
import '../assets/css/MyRecipeCard.css';

const MyRecipeCard = function ({recipe}) {



    return(
        <div class="my-recipe-card">
            <aside>
                <img src={recipe.img} alt="Image for {recipe.title}" />
            </aside>
            <article>
                <h2>{recipe.title}</h2>
                <h3>{recipe.category}</h3>
                <h3>{recipe.timeStamp}</h3>
                <ul>
                    <li><span class="icon icon-users"></span><span>1</span></li>
                </ul>
                <p>{recipe.description}</p>
                <p class="ingredients"><span>Ingredients:&nbsp;</span>{recipe.ingredients}</p>
            </article>
        </div>
    )
};

export default MyRecipeCard;

