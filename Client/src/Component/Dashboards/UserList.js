import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ModalDelete from "../Layout/ModalDeleteUser"
import "./AdminDashboard.css"
import ReactPaginate from "react-paginate"

const UserList = () => {

    const [helper, setHelper] = useState(0);
    const [users, setUser] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loading02, setLoading02] = useState(true);

    const [openModal01, setOpenModal01] = useState({
        status: false,
        user_id: -1,
    });

    const [pageCount, setPageCount] = useState(0);
    let size = 10;

    useEffect(() => {
        loadUsers();
        //setTimeout(loadUsers, 5000);
        //
    }, []);

    const loadUsers = async (currentPage) => {

        setHelper(currentPage)

        if (!currentPage) {
            currentPage = 0;
        }
        await await axios({
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
            },
            url: `https://weddingspots.herokuapp.com/adminAPI/getUsers?page=${currentPage}&size=${size}`
        }).then(response => {


            const total = response.data.data.totalItems
            //total/size
            setPageCount(Math.ceil(total / size))
            setUser(response.data.data.items)
            setLoading(true)
        }).catch(error => {
            if (typeof error.response === 'undefined') {

                alert("Server Down")
            }
            else {
                alert(error.response.data.error.message)
            }
        });

    }

    const deleteUser = async user_id => {
        setLoading02(false)
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
            },
            url: `https://weddingspots.herokuapp.com/adminAPI/deleteUser/` + user_id,
        }).then((response => {
            setLoading02(true);

            loadUsers(helper);

        }))
            .catch((error) => {
                setLoading02(true);
                if (typeof error.response === 'undefined') {

                    alert("Server Down")
                }
                else {
                    alert(error.response.data.error.message)
                }
            })

    }


    const handlePageClick = async (data) => {

        let currentPage = data.selected
        loadUsers(currentPage)
    }

    return (
        <div className="container">
            <div className="py-4">

                <div className="row mb-3">
                    <div className="col-sm">
                        <h5>Manage Users</h5>
                    </div>
                </div>

                {(!loading && !loading02) &&
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>

                }

                <table className="table shadow mb-3">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Type</th>
                            <th scope="col">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (

                                <tr key={user.user_id}>
                                    <th scope="row">{user.user_id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.type}</td>
                                    <td>

                                        <div className='btn-group'>

                                            <Link className="btn btn-primary me-2" to={`/user/edit/${user.user_id}`}>Edit</Link>

                                            <button className="btn btn-danger" onClick={() => setOpenModal01({ status: true, user_id: user.user_id })}>Delete</button>
                                            {/*<button className="btn btn-danger me-2" onClick={() => deleteuser(user.user_id)}>Delete</button>*/}

                                        </div>

                                    </td>
                                </tr>

                            ))

                        }


                    </tbody>
                </table>

                {openModal01.status && <ModalDelete modalInfo={openModal01} modalHandler={setOpenModal01} deleteuser={deleteUser} />}

                {!(pageCount <= 1) &&
                    <ReactPaginate
                        previousLabel={"Previous"}
                        next={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={3}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-link"}
                        nextClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                }

            </div>
        </div >

    )

}


export default UserList