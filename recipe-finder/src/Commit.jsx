import React, {useContext, useState} from 'react';
import {StateContext} from './App';
function Commit(){
    const context = useContext(StateContext);
    const [post, setPost] = useState({username: context.state.userName});
    const handleTitle = (e) => {
        setPost({...post, title: e.target.value});
    }
    const handleCategory = (e) => {
        setPost({...post, category: e.target.value});
    }
    const handleContent = (e) => {
        setPost({...post, content: e.target.value});
    }
    const handleImg = (e) => {
        setPost({...post, img: e.target.value});
    }
    const handleClick = () => {
        context.commitPost(context.state.userName, post);
    }
    return(
        <div className = 'commit-box'>
            <label>Title</label><input onChange = {handleTitle}></input><br/>
            <label>Category</label><input onChange = {handleCategory}></input><br/>
            <label>Img url(if any)</label><input onInput = {handleImg}></input><br/>
            <label>Content:</label><br/>
            <textarea onChange = {handleContent} rows = '30' cols = '100'></textarea><br/>
            <button onClick = {handleClick}>submit</button><br/>
        </div>
    )
}

export default Commit;