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
    let size = 5;

    useEffect(() => {
        loadUsers();
        //setTimeout(loadUsers, 5000);
        //console.log("Hello")
    }, []);

    const loadUsers = async (currentPage) => {
        console.log("Current page", currentPage)
        setHelper(currentPage)

        if (!currentPage) {
            currentPage = 0;
        }
        await await axios({
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
            },
            url: `http://localhost:3001/adminAPI/getUsers?page=${currentPage}&size=${size}`
        }).then(response => {
            console.log(response.data)
            console.log("total", response.data.data.totalItems)
            const total = response.data.data.totalItems
            //total/size
            setPageCount(Math.ceil(total / size))
            setUser(response.data.data.users)
            setLoading(true)
        }).catch(error => {
            console.log(error.response.data)
        });

    }

    const deleteUser = async user_id => {
        setLoading02(false)
        await axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
            },
            url: 'http://localhost:3001/adminAPI/deleteUser/' + user_id,
        }).
            then((response => {
                setLoading02(true);
                console.log(response.data)
                loadUsers(helper);

            }))
            .catch((error) => {
                setLoading02(true);
                console.log(error.response.data)
            })

    }


    const handlePageClick = async (data) => {
        console.log(data.selected)
        let currentPage = data.selected
        loadUsers(currentPage)
    }

    return (
        <div class="container">
            <div className="py-4">

                <div class="row mb-3">
                    <div class="col-sm">
                        <h1>Manage Users</h1>
                    </div>
                </div>

                {(!loading && !loading02) &&
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>

                }

                <table class="table shadow mb-3">
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

                                <tr>
                                    <th scope="row">{user.user_id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.type}</td>
                                    <td>

                                        <div className='btn-group'>

                                            <Link class="btn btn-primary me-2" to={`/user/edit/${user.user_id}`}>Edit</Link>

                                            <button class="btn btn-danger" onClick={() => setOpenModal01({ status: true, user_id: user.user_id })}>Delete</button>
                                            {/*<button class="btn btn-danger me-2" onClick={() => deleteuser(user.user_id)}>Delete</button>*/}

                                        </div>

                                    </td>
                                </tr>

                            ))

                        }


                    </tbody>
                </table>

                {openModal01.status && <ModalDelete modalInfo={openModal01} modalHandler={setOpenModal01} deleteuser={deleteUser} />}


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

            </div>
        </div >

    )

}


export default UserList