import React from 'react'
import "./Modal.css"

const Modal = (props) => {

    return (
        <div tabindex="-1" role="dialog">
            <div role="document">
                <div className="modalBackground" style={{ zIndex: 1060 }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Venue</h5>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete venue ID: {props.modalInfo.venue_id}?</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => { props.deleteVenue(props.modalInfo.venue_id); props.modalHandler({ status: false }) }
                        } type="button" className="btn btn-danger">Delete</button>
                        <button onClick={() => props.modalHandler({ status: false })} type="button" className="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Modal
