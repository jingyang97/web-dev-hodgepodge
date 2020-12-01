import React from 'react';

function Error({err}){
    return(
        <div className = "error-message">
            <p>{err}</p>
        </div>
    )
}

export default Error;