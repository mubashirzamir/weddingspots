import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BsTelephone } from "react-icons/bs"
import { AiOutlineMail } from "react-icons/ai"

const ContactCard = (props) => {

    const [contact, setContact] = useState({
        name: "",
        email: "",
    })

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadContact()
    }, [])

    const loadContact = async () => {
        await axios.get("http://localhost:3001/api/venues/contact/" + props.venue_id).then(response => {
            if (response.data.data) {
                setLoading(true)
                setContact(response.data.data);
            }
            else {
                setLoading(true)
            }
        }).catch(error => console.log(error.response.data))
    }

    return (
        <div className="card mt-4 shadow-sm">
            <p className="fw-light text-center mt-2 mb-0 ">Added By
                {!loading &&
                    <div className="spinner-border ms-2 " role="status">
                        <span className="sr-only"></span>
                    </div>
                }
            </p>
            <p className="fw-bold text-center mt-0 mb-0">{contact.name}</p>
            <hr className="col-10 mx-auto mt-2 mb-2" />
            {/*<p className="fst-normal col-10 mx-auto mt-0 mb-0"><span className="me-2"><BsTelephone /></span> 03132306987</p>*/}
            <p className="fst-italic text-center mt-0 mb-2"><span className="me-2"><AiOutlineMail /></span> {contact.email}</p>
        </div>
    )
}

export default ContactCard