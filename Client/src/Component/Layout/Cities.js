import React from 'react'
import { Link } from 'react-router-dom'
import Karachi from '../../Assets/quaid.jpg'
import Lahore from '../../Assets/minar.jpg'
import Islamabad from '../../Assets/faisal.jpg'

const Cities = () => {
    return (
        <div className='container'>
            <div className='py-4'>
                <div className='mb-3 text-center'>
                    <h1>Cities</h1>


                    <div className="row d-flex justify-content-center mb-3">
                        <div className="col-sm-6 col-md-3 v my-2">
                            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/Search?city=Karachi`}>
                                <div className="card shadow-sm w-100">
                                    <img src={Karachi} className="card-img-top mx-auto d-block" alt="..." style={{ width: 300, height: 200 }} />
                                    <div className="card-body">
                                        <h5 className="card-title text-left h3">Karachi</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-sm-6 col-md-3 v my-2">
                            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/Search?city=Lahore`}>
                                <div className="card shadow-sm w-100">
                                    <img src={Lahore} className="card-img-top mx-auto d-block" alt="..." style={{ width: 300, height: 200 }} />
                                    <div className="card-body">
                                        <h5 className="card-title text-left h3">Lahore</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col-sm-6 col-md-3 v my-2">
                            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={`/Search?city=Islamabad`}>
                                <div className="card shadow-sm w-100">
                                    <img src={Islamabad} className="card-img-top mx-auto d-block" alt="..." style={{ width: 300, height: 200 }} />
                                    <div className="card-body">
                                        <h5 className="card-title text-left h3">Islamabad</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    )
}

export default Cities