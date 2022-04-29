import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import ReviewList from "./ReviewList";

const ViewVenue = () => {

    let history = useHistory();

    const [message02, setMessage02] = useState("")

    const [loading, setLoading] = useState(false);

    const { venue_id } = useParams();

    const [venue, setVenue] = useState({
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

    const { name, type, halls, description, address, city, area, latitude, longitude, price_per_head, min_cap, max_cap } = venue;

    useEffect(() => {
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
                setMessage02("No such venue")
            }
        }).catch(error => console.log(error.response.data))

    }


    return (
        <div class="container">

            <div className="py-4">

                <div class="row mb-3">
                    <div class="col-sm">
                        <h1>View Venue</h1>
                    </div>
                    <div class="col-sm">
                        <div class="text-end">
                            <button class="btn btn-primary" onClick={() => history.goBack()}>Back</button>

                        </div>
                    </div>
                </div>

                <h2>{message02}</h2>



                {!loading &&
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>

                }



                <div className="w-50 mx-auto mb-3 mt-3 ">
                    <img class="img-thumbnail"
                        src={venue.image_thumb}
                        alt={venue.venue_id}
                    />
                </div>



                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText3" name="name" value={name} readOnly />
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">Type</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText3" name="type" value={type} readOnly />
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">Halls</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" id="inputText3" name="halls" value={halls} readOnly />
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Description</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" name="description" value={description} readOnly ></textarea>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">Address</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText3" name="address" value={address} readOnly />
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">City</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText3" name="city" value={city} readOnly />
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">Area</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText3" name="area" value={area} readOnly />
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">Latitude</label>
                    <div class="col-sm-10">
                        <input type="number" step="any" class="form-control" id="inputText3" name="latitude" value={latitude} readOnly />
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">Longitude</label>
                    <div class="col-sm-10">
                        <input type="number" step="any" class="form-control" id="inputText3" name="longitude" value={longitude} readOnly />
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">Price Per Head</label>
                    <div class="col-sm-10">
                        <input type="number" step="any" class="form-control" id="inputText3" name="price_per_head" value={price_per_head} readOnly />
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">Minimum Capacity</label>
                    <div class="col-sm-10">
                        <input type="number" step="any" class="form-control" id="inputText3" name="min_cap" value={min_cap} readOnly />
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="inputText3" class="col-sm-2 col-form-label">Maximum Capacity</label>
                    <div class="col-sm-10">
                        <input type="number" step="any" class="form-control" id="inputText3" name="max_cap" value={max_cap} readOnly />
                    </div>
                </div>

                {/*<div class="col-12">
                    <Link class="btn btn-primary" type="submit" to={"/"}>Back</Link>
                 </div>*/}

                {/*<br />
                <ReviewList />*/}

            </div>

        </div >
    )

}

export default ViewVenue;