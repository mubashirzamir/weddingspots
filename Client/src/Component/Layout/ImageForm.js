import React from "react";
import { useForm } from "react-hook-form"
import axios from 'axios'

const ImageForm = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {

        var s3URL;

        // Get s3 URL
        await axios({
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
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

            console.log(data.file[0]);

            // Put image
            await axios({
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: data.file[0],
                url: s3URL
            })
                .then((response => {
                    console.log(response)
                    const imageUrl = s3URL.split('?')[0]
                    console.log(imageUrl)
                }))
                .catch((error) => {
                    console.log(error)
                })


        }

        else {
            alert("Error uploading file")
        }

    }

    return (
        <div class="container">

            <div className="py-4">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">File</label>
                        <div class="col-sm-10">
                            <input {...register('file', { required: true })} type="file" class="form-control" id="inputText3" name="file" required />
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="inputText3" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                            <input {...register('description', { required: true })} type="text" class="form-control" id="inputText3" name="description" required />
                        </div>
                    </div>


                    <div class="col-12">
                        <button class="btn btn-primary" type="submit">Submit</button>
                    </div>


                </form>

            </div>

        </div>
    );

}

export default ImageForm;