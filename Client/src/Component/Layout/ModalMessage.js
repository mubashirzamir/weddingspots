import React from 'react'
import "./Modal.css"

const Modal = (props) => {

    return (
        <div tabindex="-1" role="dialog">
            <div role="document">
                <div className="modalBackground" style={{ zIndex: 1060 }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Message</h5>
                    </div>
                    <div className="modal-body">
                        <p>{props.modalInfo}</p>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Modal
