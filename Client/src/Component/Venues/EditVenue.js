import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import MapDisplay from "../Layout/MapDisplay"


const EditVenue = () => {

    const [message, setMessage] = useState("")
    const [message02, setMessage02] = useState("")

    const [loading01, setLoading01] = useState(false);
    const [loading02, setLoading02] = useState(true);

    let history = useHistory();

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
        max_cap: "",
        image_thumb: ""
    })

    const { name, type, halls, description, address, city, area, latitude, longitude, price_per_head, min_cap, max_cap, image_thumb } = venue;

    const onInputChange = e => {
        setVenue({ ...venue, [e.target.name]: e.target.value })
        //console.log(e.target.value)
    };

    useEffect(() => {
        loadVenue()
    }, [])

    const onSubmit = async e => {
        e.preventDefault();
        setLoading02(false);
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken")),
            },
            url: 'http://localhost:3001/managerAPI/updateVenue',
            data: {
                venue_id: venue_id,
                name: name,
                type: type,
                halls: halls,
                description: description,
                address: address,
                city: city,
                area: area,
                //latitude: latitude,
                //longitude: longitude,
                price_per_head: price_per_head,
                min_cap: min_cap,
                max_cap: max_cap,
                //image_thumb: image_thumb
            }
        })
            .then((response => {
                setLoading02(true)
                console.log(response.data)
                setMessage(response.data.message)

            }))
            .catch((error) => {
                setLoading02(true)
                console.log(error.response.data)
                setMessage(error.response.data.error.message)

            })
    };

    const loadVenue = async () => {
        await axios.get("http://localhost:3001/api/venues/" + venue_id).then(response => {
            if (response.data.data) {
                setLoading01(true)
                console.log(response.data.data)
                setVenue(response.data.data);

            }
            else {
                setLoading01(true)
                setMessage02("No such venue")
            }
        }).catch(error => console.log(error.response.data))
    }

    const imageChange = async () => {
        history.push("/venue/addImage/" + venue_id)
    }

    const locationChange = async () => {
        history.push("/venue/addLocation/" + venue_id)
    }

    return (
        <div class="container">

            <div className="py-4">

                <div class="row mb-3">
                    <div class="col-sm">
                        <h1>Edit Venue</h1>
                    </div>
                    <div class="col-sm">
                        <div class="text-end">
                            <button class="btn btn-primary" onClick={() => history.goBack()}>Back</button>

                        </div>
                    </div>
                </div>

                <h2>{message02}</h2>



                {!loading01 &&
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>

                }

                {!loading02 &&
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>

                }

                <div class="w-50 mx-auto mb-3 mt-3">

                    <div>
                        <img class="img-thumbnail"
                            src={venue.image_thumb}
                            alt={venue.venue_id}
                        />
                    </div>

                    <div class="col-12">
                        <button class="btn btn-outline-primary" onClick={imageChange}>Edit Thumbnail</button>
                    </div>


                </div>

                <form onSubmit={e => onSubmit(e)}>
                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputText3" name="name" value={name} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">Type</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputText3" name="type" value={type} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">Halls</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="inputText3" name="halls" value={halls} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" name="description" value={description} onChange={e => onInputChange(e)} ></textarea>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">City</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputText3" name="city" value={city} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">Area</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputText3" name="area" value={area} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputText3" name="address" value={address} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">Price Per Head</label>
                        <div class="col-sm-10">
                            <input type="number" step="any" class="form-control" id="inputText3" name="price_per_head" value={price_per_head} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">Minimum Capacity</label>
                        <div class="col-sm-10">
                            <input type="number" step="any" class="form-control" id="inputText3" name="min_cap" value={min_cap} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">Maximum Capacity</label>
                        <div class="col-sm-10">
                            <input type="number" step="any" class="form-control" id="inputText3" name="max_cap" value={max_cap} onChange={e => onInputChange(e)} />
                        </div>
                    </div>


                    <div class="col-12">
                        <button class="btn btn-warning" type="submit">Update</button>
                    </div>

                    <MapDisplay lat={latitude} lng={longitude}></MapDisplay>

                    <div class="col-12">
                        <button class="btn btn-outline-primary" onClick={locationChange}>Edit Location</button>
                    </div>


                </form>

                <br></br>
                <h2>{message}</h2>


            </div>

        </div >
    )

}

export default EditVenue;