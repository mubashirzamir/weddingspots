import React from 'react'
import "./Modal.css"

const Modal = (props) => {

    return (
        <div tabindex="-1" role="dialog">
            <div role="document">
                <div class="modalBackground" style={{ zIndex: 1060 }}>
                    <div class="modal-header">
                        {props.modalInfo.isFeatured ?
                            <h5 class="modal-title">Unfeature Venue</h5> :
                            <h5 class="modal-title">Feature Venue</h5>
                        }
                    </div>
                    <div class="modal-body">
                        {props.modalInfo.isFeatured ?
                            <p>Are you sure you want to unfeature venue ID: {props.modalInfo.venue_id}?</p> :
                            <p>Are you sure you want to feature venue ID: {props.modalInfo.venue_id}?</p>
                        }
                    </div>
                    <div class="modal-footer">
                        <button onClick={() => { props.featureVenue(props.modalInfo.venue_id); props.modalHandler({ status: false }) }
                        } type="button" class="btn btn-warning">
                            {props.modalInfo.isFeatured ?
                                <>
                                    Unfeature
                                </> :
                                <>
                                    Feature
                                </>
                            }
                        </button>
                        <button onClick={() => props.modalHandler({ status: false })} type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Modal
