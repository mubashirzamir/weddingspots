import React from "react";
import { AiOutlineMail } from "react-icons/ai";

const ContactCard = (props) => {
    return (
        <div>
            <div className="card mt-3 shadow-sm">
                <p className="fw-light text-center mt-2 mb-0 ">Added By</p>
                <p className="fw-bold text-center mt-0 mb-0">{props.manager_name}</p>
                <hr className="col-10 mx-auto mt-2 mb-2" />
                {/*<p className="fst-normal col-10 mx-auto mt-0 mb-0"><span className="me-2"><BsTelephone /></span> 03132306987</p>*/}
                <p className="fst-italic text-center mt-0 mb-2"><span className="me-2"><AiOutlineMail /></span> {props.manager_email}</p>
            </div>
        </div>
    )
}

export default ContactCard