import React, {useContext} from 'react';
import {StateContext} from './App';
function CategoryCard({category}){
    const context = useContext(StateContext);
    const handleClick = (e) => {
        context.getPostsUnderCategory(e.target.value);
    }
    return(
        <div className = 'category-card'>
            <img className = 'img-category' src = {category.img} alt = 'Avatar'/>
            <div>
                <button onClick = {handleClick} value = {category.title} className = 'nav-anchorTag'>{category.title}</button>
            </div>
        </div>
    )
}

export default CategoryCard;