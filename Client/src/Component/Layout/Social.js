import React from "react";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const Social = () => {

    const google = () => {
        window.open("http://localhost:3001/api/social/google", "_self");
    }

    const facebook = () => {
        window.open("http://localhost:3001/api/social/facebook", "_self");
    }

    return (
        <div>
            <div className='row mb-3'>
                <div className="col-sm-6 mx-auto">
                    <GoogleLoginButton onClick={(google)} />
                </div>
            </div>

            <div className='row'>
                <div className="col-sm-6 mx-auto">
                    <FacebookLoginButton onClick={(facebook)} />
                </div>
            </div>

        </div >

    )
}

export default Social