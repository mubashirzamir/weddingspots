import React from 'react'
import './Whatsapp.css'
import { BsWhatsapp } from 'react-icons/bs'

const Whatsapp = () => {
    return (
        <div>
            <a
                href="https://wa.me/923090826778"
                className="whatsapp_float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <BsWhatsapp onMouseOver={({ target }) => target.style.color = "white"} />

            </a>
        </div>
    )
}

export default Whatsapp