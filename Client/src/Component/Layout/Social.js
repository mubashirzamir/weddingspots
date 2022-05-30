import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";


const Social = () => {

    const google = () => {
        window.open(`https://weddingspots.herokuapp.com/api/social/google`, "_self");
    }

    const facebook = () => {
        window.open(`https://weddingspots.herokuapp.com/api/social/facebook`, "_self");
    }

    return (
        <div>

            <div className='row'>
                <div className="col-mx-auto">
                    <div className="row">
                        <div className="col text-end">
                            <btn className="btn">
                                <FaFacebook size="2em" color="#1778F2" onClick={(facebook)} />
                            </btn>
                        </div>

                        <div className="col text-start">
                            <btn className="btn">
                                <FcGoogle size="2em" onClick={(google)} />
                            </btn>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Social