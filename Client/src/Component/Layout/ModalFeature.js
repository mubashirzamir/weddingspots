import React from 'react'
import "./Modal.css"

const Modal = (props) => {

    return (
        <div tabindex="-1" role="dialog">
            <div role="document">
                <div className="modalBackground" style={{ zIndex: 1060 }}>
                    <div className="modal-header">
                        {props.modalInfo.isFeatured ?
                            <h5 className="modal-title">Unfeature Venue</h5> :
                            <h5 className="modal-title">Feature Venue</h5>
                        }
                    </div>
                    <div className="modal-body">
                        {props.modalInfo.isFeatured ?
                            <p>Are you sure you want to unfeature venue ID: {props.modalInfo.venue_id}?</p> :
                            <p>Are you sure you want to feature venue ID: {props.modalInfo.venue_id}?</p>
                        }
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => { props.featureVenue(props.modalInfo.venue_id); props.modalHandler({ status: false }) }
                        } type="button" className="btn btn-warning">
                            {props.modalInfo.isFeatured ?
                                <>
                                    Unfeature
                                </> :
                                <>
                                    Feature
                                </>
                            }
                        </button>
                        <button onClick={() => props.modalHandler({ status: false })} type="button" className="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Modal
