import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";


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
                <div className="col-sm-3 mx-auto">

                    <btn className="btn">
                        <FaFacebook size="2em" color="#1778F2" onClick={(facebook)} />
                    </btn>

                    <btn className="btn">
                        <FcGoogle size="2em" onClick={(google)} />
                    </btn>

                </div>
            </div>

        </div >
    )
}

export default Social