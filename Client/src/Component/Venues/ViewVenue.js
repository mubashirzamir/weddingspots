import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import MapDisplay from "../Layout/MapDisplay"
import ContactCard from "./ContactCard";
import Overview from "./Overview";
import { GoLocation } from "react-icons/go"
import { RiPriceTag3Line } from "react-icons/ri"
import ReviewParent from "./ReviewParent";

const ViewVenue = () => {

    let history = useHistory();

    const [message01, setMessage01] = useState("")

    const [loading, setLoading] = useState(false);

    const { venue_id } = useParams();

    const [venue, setVenue] = useState({
        user_id: "",
        name: "",
        type: "",
        halls: "",
        description: "",
        address: "",
        city: "",
        area: "",
        latitude: "",
        longitude: "",
        price_per_head: "",
        min_cap: "",
        max_cap: ""
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        loadVenue()
    }, [])


    const loadVenue = async () => {
        await axios.get("http://localhost:3001/api/venues/" + venue_id).then(response => {
            if (response.data.data) {
                setLoading(true)
                console.log(response.data.data)
                setVenue(response.data.data);

            }
            else {
                setLoading(true)
                setMessage01("No such venue")
            }
        }).catch(error => console.log(error.response.data))

    }


    return (
        <div className="container">

            <div className="py-4">

                <h2>{message01}</h2>

                {!message01 &&
                    <>
                        <span>
                            {!loading &&
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            }
                            <h3 className="ms-2 d-inline">{venue.name}</h3>
                        </span>

                        <div className="row mt-2 px-2">
                            <div className="col-xl-8">
                                <div className="row">
                                    <div className="col">
                                        <p className="mt-0 mb-0"><span className=""><GoLocation /></span> {venue.area}</p>
                                    </div>
                                    <div className="col">
                                        <p className="text-end mt-0 mb-0"><span className=""><RiPriceTag3Line /></span> {venue.price_per_head} Rs/Head</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row">

                            <div className="col-xl-8">
                                <div className="row mb-3">
                                    <div className="w-100 mb-3 mt-3 ">
                                        <img
                                            src={venue.image_thumb}
                                            alt={venue.venue_id}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="row">
                                    <div className="col">
                                        <ContactCard venue_id={venue_id} />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="row mt-4 mb-2" >

                            <div className="col-xl-8">
                                <div className="row">
                                    <h5 className="text-center">Description</h5>
                                    <hr className="col-10 mx-auto" />
                                    <div className="overflow-auto px-3" style={{ height: "175px" }}>
                                        <div className="row">
                                            <p className="mh-50">{venue.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4" >
                                <div className="row">
                                    <h5 className="text-center">Overview</h5>
                                    <hr className="col-10 mx-auto" />
                                    <Overview type={venue.type} halls={venue.halls} address={venue.address} min_cap={venue.min_cap} max_cap={venue.max_cap} />
                                </div>
                            </div>

                        </div>


                        <div>
                            <h5 className="mb-2">Location</h5>
                            <MapDisplay lat={venue.latitude} lng={venue.longitude}></MapDisplay>
                        </div>

                        <div>
                            <ReviewParent />
                        </div>

                    </>
                }

            </div>

        </div >
    )

}

export default ViewVenue;