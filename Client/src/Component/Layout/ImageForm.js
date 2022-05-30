import React, { useState } from "react";
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const ImageForm = () => {

    const { venue_id } = useParams();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(true);

    let history = useHistory();

    const onSubmit = async (data) => {

        setLoading(false);
        var s3URL;
        var imageURL;
        var uploadSuccess = false;

        // Get s3 URL
        await axios({
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken")),
            },
            url: `https://weddingspots.herokuapp.com/managerAPI/s3Url`,
        })
            .then((response => {
                s3URL = response.data.data.url;
            }))
            .catch((error) => {
                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    alert(error.response.data.error.message)
                }
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

                imageURL = s3URL.split('?')[0]
                uploadSuccess = true
            }))
                .catch((error) => {

                    if (typeof error.response === 'undefined') {

                        alert("Server Down")
                    }
                    else {
                        alert(error.response.data.error.message)
                    }
                })

            if (uploadSuccess) {

                await axios({
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken")),
                    },
                    data: {
                        imageURL: imageURL
                    },
                    url: `https://weddingspots.herokuapp.com/managerAPI/addImage/` + venue_id,
                })
                    .then((response => {
                        history.push("/venue/edit/" + venue_id)

                    }))
                    .catch((error) => {
                        if (typeof error.response === 'undefined') {

                            alert("Server Down")
                        }
                        else {
                            alert(error.response.data.error.message)
                        }
                    })
            }

        }

        else {
            setLoading(true)
            alert("Error uploading file to s3 bucket")
        }

    }

    return (
        <div className="container">

            <div className="py-4">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">File</label>
                        <div className="col-sm-10">
                            <input {...register('file', { required: true })} type="file" className="form-control" required />
                        </div>
                    </div>

                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>

                    {!loading &&
                        <div className="spinner-border text-primary mt-2" role="status">
                            <span className="sr-only"></span>
                        </div>
                    }

                </form>

                {/*{image &&
                    <img src={image} alt="S3"></img>
                }*/}

            </div>

        </div>
    );

}

export default ImageForm;