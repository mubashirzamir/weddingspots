import React from "react";

const Social = () => {

    const google = () => {
        window.open("http://localhost:3001/api/social/google", "_self");
    }

    const facebook = () => {
        window.open("http://localhost:3001/api/social/facebook", "_self");
    }

    return (
        <div>
            <button class="btn btn-primary" onClick={google}>Google</button>
            <br />
            <br />
            <button class="btn btn-primary" onClick={facebook}>Facebook</button>
        </div>

    )
}

export default Social