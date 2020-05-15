import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const AdminRoute = ({component: Component, path}) => {
    return(
        <Route exact path={path}>
            {localStorage.getItem('role') === 'admin' ?  <Component /> : <Redirect to="/" />}
        </Route>
    )
}

export default AdminRoute