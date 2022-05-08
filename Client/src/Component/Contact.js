import { useForm } from "react-hook-form"

const Contact = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {

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
            </div>

        </div>
    );

}

export default Contact;