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
        //console.log(e.target.value)
    };

    const onSubmit = async e => {
        console.log(venue);
        e.preventDefault();
        setLoading(false);
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
            },
            url: 'http://localhost:3001/managerAPI/createVenue',
            data: venue
        }).
            then((response => {
                setLoading(true)
                console.log(response.data)
                setMessage(response.data.message)

            }))
            .catch((error) => {
                setLoading(true)
                console.log(error.response.data)
                setMessage(error.response.data.error.message)

            });

        //history.push("/")
    }

    return (
        <div class="container">

            <div className="py-4">

                <h1>Add Venue</h1>

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
                        <label for="inputText3" class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputText3" name="address" value={address} onChange={e => onInputChange(e)} />
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
                        <label for="inputText3" class="col-sm-2 col-form-label">Latitude</label>
                        <div class="col-sm-10">
                            <input type="number" step="any" class="form-control" id="inputText3" name="latitude" value={latitude} onChange={e => onInputChange(e)} />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">Longitude</label>
                        <div class="col-sm-10">
                            <input type="number" step="any" class="form-control" id="inputText3" name="longitude" value={longitude} onChange={e => onInputChange(e)} />
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


                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">Image Thumbnail</label>
                        <div class="col-sm-10">
                            <input type="text" step="any" class="form-control" id="inputText3" name="image_thumb" value={image_thumb} onChange={e => onInputChange(e)} />
                        </div>
                    </div>


                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Submit</button>
                    </div>



                </form>

                <br></br>

                <h2>{message}</h2>


            </div>

        </div>
    )

}

export default AddVenue;