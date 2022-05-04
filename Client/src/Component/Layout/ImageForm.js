import React, { useState } from "react";
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const ImageForm = () => {

    const { venue_id } = useParams();
    const { register, handleSubmit } = useForm();
    const [image, setImage] = useState();

    let history = useHistory();

    const onSubmit = async (data) => {

        var s3URL;
        var imageURL;
        var uploadSuccess = false;

        // Get s3 URL
        await axios({
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken")),
            },
            url: "http://localhost:3001/managerAPI/s3Url",
        })
            .then((response => {
                s3URL = response.data.data.url;
            }))
            .catch((error) => {
                console.log(error.response.data)
            })

        if (s3URL) {

            // Put image  
            await fetch(s3URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: data.file[0]
            }).then((response => {
                console.log(response)
                imageURL = s3URL.split('?')[0]
                setImage(imageURL)
                uploadSuccess = true
            }))
                .catch((error) => {
                    console.log(error)
                })

            if (uploadSuccess) {

                await axios({
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken")),
                    },
                    data: {
                        imageURL: imageURL
                    },
                    url: "http://localhost:3001/managerAPI/addImage/" + venue_id,
                })
                    .then((response => {
                        history.push("/venue/edit/" + venue_id)
                        console.log(response.data);
                    }))
                    .catch((error) => {
                        console.log(error.response.data)
                    })
            }

        }

        else {
            alert("Error uploading file to s3 bucket")
        }

    }

    return (
        <div className="container">

            <div className="py-4">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="row mb-3">
                        <label for="inputText3" className="col-sm-2 col-form-label">File</label>
                        <div className="col-sm-10">
                            <input {...register('file', { required: true })} type="file" className="form-control" id="inputText3" required />
                        </div>
                    </div>

                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>

                </form>

                {/*{image &&
                    <img src={image} alt="S3"></img>
                }*/}

            </div>

        </div>
    );

}

export default ImageForm;