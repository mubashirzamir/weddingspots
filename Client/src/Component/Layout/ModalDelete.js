import React from 'react'
import "./Modal.css"

const Modal = (props) => {

    return (
        <div tabindex="-1" role="dialog">
            <div role="document">
                <div class="modalBackground" style={{ zIndex: 1060 }}>
                    <div class="modal-header">
                        <h5 class="modal-title">Delete Venue</h5>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete venue ID: {props.modalInfo.venue_id}?</p>
                    </div>
                    <div class="modal-footer">
                        <button onClick={() => { props.deleteVenue(props.modalInfo.venue_id); props.modalHandler({ status: false }) }
                        } type="button" class="btn btn-danger">Delete</button>
                        <button onClick={() => props.modalHandler({ status: false })} type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Modal
