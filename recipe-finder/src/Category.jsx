import React, { useContext } from 'react';
import { StateContext } from './App';
import CategoryCard from './CategoryCard';
function Category(){
    const context = useContext(StateContext);
    let key = 1;
    return (
        <div className = 'categories'>
            {context.state.categories.map(category => (
                <CategoryCard
                   key = {key++}
                   category = {category}
                />
            ))}
        </div>
    )
}

export default Category;
