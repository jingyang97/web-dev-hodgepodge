import React, {useState, useContext} from 'react';
import logo from './logo.svg';
import {StateContext} from './App';
function SignupPane(){
    const context = useContext(StateContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const handleClick = (e) => {
        context.callRegister(username, password);
    }
    const handleNameChange = (e) => {
        setUsername(e.target.value);
        if(e.target.value.length > 0 && password.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if(e.target.value.length > 0 && username.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }
    return(
        <div className = 'signup-card'>
            <img src = {logo} alt = "login-logo" className = "App-logo"/>
            <div>
                <span>Username</span><input onChange = {handleNameChange} placeholder = ""></input><br/><br/>
                <span>Password  </span><input onChange = {handlePasswordChange} type = "password" placeholder = ""></input><br/><br/>
                <button onClick = {handleClick} disabled = {buttonDisabled} >signup</button><br/><br/>
            </div>
        </div>
    )
}




export default SignupPane;