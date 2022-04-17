import Register from './Component/Register'
import Login from './Component/Login'
import GetUser from './Component/GetUser'
import Home from './Component/Home'
import About from './Component/About'
import Navbar from './Component/Layout/Navbar'
import NotFound from './Component/Layout/NotFound'
import NotAuthenticated from './Component/Layout/NotAuthenticated'
import AddVenue from './Component/Venues/AddVenue'
import EditVenue from './Component/Venues/EditVenue'
import ViewVenue from './Component/Venues/ViewVenue'
import AdminDashboard from './Component/Dashboards/AdminDashboard'
import UserList from './Component/Dashboards/UserList'
import EditUser from './Component/EditUser'
import ManagerDashboard from './Component/Dashboards/ManagerDashboard'
import SearchResults from './Component/Layout/SearchResults'

import { AuthContext } from './Helpers/AuthContext'
import { useState, useEffect } from 'react'

import "../node_modules/bootstrap/dist/css/bootstrap.css"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios'

function App() {

  const [authState, setAuthState] = useState({
    user_id: "",
    email: "",
    name: "",
    type: "1",
    status: false
  })

  const checkLoginStatus = async () => {
    await axios({
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + String(sessionStorage.getItem("accessToken"),),
      },
      url: "http://localhost:3001/api/isloggedin",
    })
      .then((response => {
        console.log(response.data)
        if (!authState.status) {
          setAuthState({
            user_id: response.data.data.user_id,
            email: response.data.data.email,
            name: response.data.data.name,
            type: response.data.data.type,
            status: true
          })
        }
      }))
      .catch((error) => {
        console.log(error.response)
        setAuthState({
          user_id: "",
          email: "",
          name: "",
          type: "1",
          status: false
        })
      })
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])


  return (
    <div className="App">

      <AuthContext.Provider value={{ authState, setAuthState }}>

        <Router>

          <Navbar />

          <Switch>

            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/SearchResults">
              <SearchResults />
            </Route>

            <Route exact path="/About">
              <About />
            </Route>

            <Route exact path="/Register">
              <Register />
            </Route>

            <Route exact path="/Login">
              <Login />
            </Route>

            <Route exact path="/GetUser">
              {authState.status ? <GetUser /> : <NotAuthenticated />}
            </Route>

            <Route exact path="/adminvenuelist">
              {authState.type > 2 ? <AdminDashboard /> : <NotAuthenticated />}
            </Route>

            <Route exact path="/adminuserlist">
              {authState.type > 2 ? <UserList /> : <NotAuthenticated />}
            </Route>

            <Route exact path="/user/edit/:params_user_id">
              {authState.type > 2 ? <EditUser /> : <NotAuthenticated />}
            </Route>

            <Route exact path="/managervenuelist">
              {authState.type > 1 ? <ManagerDashboard /> : <NotAuthenticated />}
            </Route>

            <Route exact path="/venue/add">
              {authState.type > 1 ? <AddVenue /> : <NotAuthenticated />}
            </Route>

            <Route exact path="/venue/edit/:venue_id">
              {authState.type > 1 ? <EditVenue /> : <NotAuthenticated />}
            </Route>

            <Route exact path="/venue/:venue_id">
              <ViewVenue />
            </Route>

            <Route exact path="/NotAuthenticated">
              <NotAuthenticated />
            </Route>

            <Route>
              <NotFound />
            </Route>

          </Switch>

        </Router>

      </AuthContext.Provider>


    </div >
  );
}

export default App;
