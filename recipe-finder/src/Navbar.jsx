import React, { useContext } from 'react';
import { StateContext } from './App';
function Navbar({onLogout}){
    const context = useContext(StateContext);
    const handleClickHome = () => {
        context.Dispatch({type: 'SELECT_POST', payload:''});
        context.Dispatch({type: 'SHOW_COMMIT', payload: false});
        context.Dispatch({type: 'SHOW_ABOUT', payload: false});
        context.Dispatch({type: 'SHOW_CATEGORY', payload: false});
        context.fetchAllPosts();
    }
    const handleClickCommit = () => {
        context.Dispatch({type: 'SELECT_POST', payload:''});
        context.Dispatch({type: 'SHOW_COMMIT', payload: true});
        context.Dispatch({type: 'SHOW_ABOUT', payload: false});
        context.Dispatch({type: 'SHOW_CATEGORY', payload: false});
    }
    const handleClickCategory = () => {
        context.getCategories();
        context.Dispatch({type: 'SHOW_CATEGORY', payload: true});
        context.Dispatch({type: 'SELECT_POST', payload:''});
        context.Dispatch({type: 'SHOW_COMMIT', payload: false});
        context.Dispatch({type: 'SHOW_ABOUT', payload: false});
    }
    const handleClickAbout = () => {
        context.Dispatch({type: 'SHOW_ABOUT', payload: true});
        context.Dispatch({type: 'SHOW_CATEGORY', payload: false});
        context.Dispatch({type: 'SELECT_POST', payload:''});
        context.Dispatch({type: 'SHOW_COMMIT', payload: false});
    }
    return (
        <div className = 'navbar'>
            <ul>
                <li><p>Welcome, {context.state.userName}!</p></li>
                <li><button onClick = {handleClickHome} className = 'nav-anchorTag'>Home</button></li>
                <li><button onClick = {handleClickCommit} className = 'nav-anchorTag'>Commit</button></li>
                <li><button onClick = {handleClickCategory}className = 'nav-anchorTag'>Category</button></li>
                <li><button onClick = {handleClickAbout} className = 'nav-anchorTag'>About</button></li>
                <li><button onClick = {onLogout} className = 'nav-anchorTag'>Logout</button></li>
            </ul>
        </div>
    )
}

export default Navbar;
