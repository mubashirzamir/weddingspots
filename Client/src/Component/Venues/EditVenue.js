import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import MemoizedMapDisplay from "../Layout/MapDisplay";
import MaterialModal from "../Layout/MaterialModal"

const EditVenue = () => {

    const [message, setMessage] = useState("")
    const [message02, setMessage02] = useState("")

    const [loading01, setLoading01] = useState(false);
    const [loading02, setLoading02] = useState(true);

    let history = useHistory();

    const { venue_id } = useParams();

    const [location, setLocation] = useState({
        latitude: "",
        longitude: "",
    })

    const [venue, setVenue] = useState({
        name: "",
        type: "",
        halls: "",
        description: "",
        address: "",
        city: "",
        area: "",
        price_per_head: "",
        min_cap: "",
        max_cap: "",
        image_thumb: ""
    })

    const { name, type, halls, description, address, city, area, price_per_head, min_cap, max_cap } = venue;

    const onInputChange = e => {
        setVenue({ ...venue, [e.target.name]: e.target.value })
        //
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
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken")),
            },
            url: `https://weddingspots.herokuapp.com/managerAPI/updateVenue`,
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
                setMessage(response.data.message)

            }))
            .catch((error) => {
                setLoading02(true)
                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    alert(error.response.data.error.message)
                }

            })
    };

    const loadVenue = async () => {
        await axios.get(`https://weddingspots.herokuapp.com/api/venues/` + venue_id).then(response => {
            if (response.data.data) {
                setLoading01(true)

                setVenue(response.data.data);
                setLocation({
                    latitude: response.data.data.latitude,
                    longitude: response.data.data.longitude,
                })
            }
            else {
                setLoading01(true)
                setMessage02("No such venue")
            }
        }).catch(error => {
            if (typeof error.response === 'undefined') {

                alert("Server Down")
            }
            else {
                alert(error.response.data.error.message)
            }
        });
    }

    const imageChange = async () => {
        history.push("/venue/addImage/" + venue_id)
    }

    const locationChange = async () => {
        history.push("/venue/addLocation/" + venue_id)
    }

    return (
        <div className="container">

            <div className="py-4">

                <div className="row mb-3">
                    <h3>Edit Venue</h3>
                </div>

                <h2>{message02}</h2>



                {!loading01 &&
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>

                }



                <div className="w-50 mx-auto mb-3 mt-3">

                    <div>
                        <img className="img-thumbnail"
                            src={venue.image_thumb}
                            alt={venue.venue_id}
                        />
                    </div>

                    <div className="col-12">
                        <button className="btn btn-outline-primary" onClick={imageChange}>Edit Thumbnail</button>
                    </div>
                </div>

                <div className="col-12 mt-4 mb-3">
                    <MemoizedMapDisplay lat={location.latitude} lng={location.longitude}></MemoizedMapDisplay>
                    <button className="btn btn-outline-primary" onClick={locationChange}>Edit Location</button>
                </div>

                <form className="mb-4" onSubmit={e => onSubmit(e)}>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="name" value={name} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Type</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="type" value={type} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Halls</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" name="halls" value={halls} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label for="exampleFormControlTextarea1" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" name="description" value={description} onChange={e => onInputChange(e)} ></textarea>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">City</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="city" value={city} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Area</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="area" value={area} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="address" value={address} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Price Per Head</label>
                        <div className="col-sm-10">
                            <input type="number" step="any" className="form-control" name="price_per_head" value={price_per_head} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Minimum Capacity</label>
                        <div className="col-sm-10">
                            <input type="number" step="any" className="form-control" name="min_cap" value={min_cap} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Maximum Capacity</label>
                        <div className="col-sm-10">
                            <input type="number" step="any" className="form-control" name="max_cap" value={max_cap} onChange={e => onInputChange(e)} />
                        </div>
                    </div>


                    <div className="col-12">
                        <button className="btn btn-warning" type="submit">Update</button>
                    </div>

                    {!loading02 &&
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>

                    }



                </form>



                <MaterialModal message={message} />


            </div>

        </div >
    )

}

export default EditVenue;