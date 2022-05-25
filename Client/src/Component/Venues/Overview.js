import React from 'react'
import { GiPerson } from "react-icons/gi"
import { HiOfficeBuilding } from "react-icons/hi"
import { MdLocationOn, MdMap } from "react-icons/md"

const Overview = (props) => {
    return (
        <div>
            <div className="card mt-2 mb-4 border-top-0 border-bottom-0 border-end-0">
                <div className='card-body'>
                    <div className='mt-2 mb-0'>
                        <span className="me-2"><HiOfficeBuilding fill='#0275d8' /></span>
                        <span>Type: </span>
                        <span className='fw-bold'>{props.type}</span>
                    </div>
                    <div className='mt-2 mb-0'>
                        <span className="me-2"><MdMap fill='#0275d8' /></span>
                        <span>Halls: </span>
                        <span className='fw-bold'>{props.halls}</span>
                    </div>
                    <div className='mt-2 mb-0'>
                        <span className="me-2"><MdLocationOn fill='#0275d8' /></span>
                        <span>Address: </span>
                        <span className='fw-bold'>{props.address}</span>
                    </div>
                    <div className='mt-2 mb-0'>
                        <span className="me-2"><GiPerson fill='#0275d8' /></span>
                        <span>Capacity: </span>
                        <span className='fw-bold'>{props.min_cap}-{props.max_cap}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Overview