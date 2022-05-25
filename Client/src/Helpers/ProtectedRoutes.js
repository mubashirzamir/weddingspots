import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from "./AuthContext";


function ProtectedRoutes({ component: Component, ...rest }) {

    const { authState } = useContext(AuthContext)



    if (localStorage.getItem('accessToken')) {
        var isAuth = true;
    }

    return (
        < Route {...rest} render={(props) => {
            if (authState) {
                return <Component />
            }
            else {
                return <Redirect to={{ pathname: '/NotAuthenticated', state: { from: props.location } }} />
            }
        }} />
    )
}

export default ProtectedRoutes
