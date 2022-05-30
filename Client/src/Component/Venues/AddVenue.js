import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddVenue = () => {


    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true);

    let history = useHistory();

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
        //
    };

    const onSubmit = async e => {

        e.preventDefault();
        setLoading(false);
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
            },
            url: `https://weddingspots.herokuapp.com/managerAPI/createVenue`,
            data: venue
        }).then((response => {
            setLoading(true)

            setMessage(response.data.message)
            const venue_id = response.data.data.venue_id
            history.push("/venue/addImage/" + venue_id)
        }))
            .catch((error) => {
                setLoading(true)
                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    alert(error.response.data.error.message)
                }

            });
        //history.push("/")
    }



    return (
        <div className="container">

            <div className="py-4">

                <div className="row mb-3">
                    <h3>Add Venue</h3>
                </div>

                <form onSubmit={e => onSubmit(e)}>
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
                        <label className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="address" value={address} onChange={e => onInputChange(e)} />
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
                        <button className="btn btn-primary" type="submit">Create</button>
                    </div>

                    {!loading &&
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>

                    }



                </form>

                <br></br>

                <h2>{message}</h2>


            </div>

        </div>
    )

}

export default AddVenue;