import axios from 'axios'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import About from './Component/About'
import AdminBookings from './Component/Dashboards/AdminBookings'
import AdminDashboard from './Component/Dashboards/AdminDashboard'
import ManagerBookings from './Component/Dashboards/ManagerBookings'
import ManagerDashboard from './Component/Dashboards/ManagerDashboard'
import UserBookings from './Component/Dashboards/UserBookings'
import UserList from './Component/Dashboards/UserList'
import EditUser from './Component/EditUser'
import GetUser from './Component/GetUser'
import Home from './Component/Home'
import Footer from './Component/Layout/Footer'
import ForgotPassword from './Component/Layout/ForgotPassword'
import ImageForm from './Component/Layout/ImageForm'
import LoginFailure from './Component/Layout/LoginFailure'
import MapDisplay from './Component/Layout/MapDisplay'
import MapForm from './Component/Layout/MapForm'
import Navbar from './Component/Layout/Navbar'
import NotAuthenticated from './Component/Layout/NotAuthenticated'
import NotFound from './Component/Layout/NotFound'
import ResetPassword from './Component/Layout/ResetPassword'
import SearchParent from './Component/Layout/Search/SearchParent'
import Login from './Component/Login'
import Register from './Component/Register'
import ScrollToTop from './Component/ScrollToTop'
import AddVenue from './Component/Venues/AddVenue'
import EditVenue from './Component/Venues/EditVenue'
import ViewVenue from './Component/Venues/ViewVenue'
import { AuthContext } from './Helpers/AuthContext'

function App() {

  const [authState, setAuthState] = useState({
    user_id: "",
    email: "",
    name: "",
    type: "1",
    status: false
  })

  const cookieToToken = async () => {
    const theToken = document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/, "$1"); //eslint-disable-line
    const flag = theToken === 'undefined' || theToken === null;
    if (!flag) {
      localStorage.setItem("accessToken", theToken)
      document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }

  const checkLoginStatus = async () => {
    await axios({
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + String(localStorage.getItem("accessToken"),),
      },
      url: `https://weddingspots.herokuapp.com/api/isloggedin`,
    })
      .then((response => {
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
    if (localStorage.getItem("accessToken") === null || localStorage.getItem("accessToken") === '') {
      cookieToToken()
    }
    checkLoginStatus()
  }, [])


  return (
    <div className="App">

      <AuthContext.Provider value={{ authState, setAuthState }}>

        <Router>

          <ScrollToTop />

          <Navbar />

          <Switch>


            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/Search">
              <SearchParent />
            </Route>

            <Route exact path="/About">
              <About />
            </Route>

            <Route exact path="/Register">
              {!authState.status ? <Register /> : <Home />}
            </Route>

            <Route exact path="/Login">
              {!authState.status ? <Login /> : <Home />}
            </Route>

            <Route exact path="/ForgotPassword">
              {!authState.status ? <ForgotPassword /> : <Home />}
            </Route>

            <Route exact path="/ResetPassword">
              {!authState.status ? <ResetPassword /> : <Home />}
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

            <Route exact path="/venue/addImage/:venue_id">
              {authState.type > 1 ? <ImageForm /> : <NotAuthenticated />}
            </Route>

            <Route exact path="/venue/addLocation/:venue_id">
              {authState.type > 1 ? <MapForm /> : <NotAuthenticated />}
            </Route>

            <Route exact path="/Map">
              <MapDisplay />
            </Route>

            <Route exact path="/NotAuthenticated">
              <NotAuthenticated />
            </Route>

            <Route exact path="/Login/Failure">
              <LoginFailure />
            </Route>

            <Route exact path="/UserBookings">
              {authState.type >= 1 ? <UserBookings /> : <NotAuthenticated />}
            </Route>

            <Route exact path="/ManagerBookings">
              {authState.type === 2 ? <ManagerBookings /> : <NotAuthenticated />}
            </Route>

            <Route exact path="/AdminBookings">
              {authState.type === 3 ? <AdminBookings /> : <NotAuthenticated />}
            </Route>

            <Route>
              <NotFound />
            </Route>



          </Switch>

          <Footer />


        </Router>

      </AuthContext.Provider>


    </div >
  );
}

export default App;
