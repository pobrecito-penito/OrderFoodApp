  import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLogin } from '../../services/auth.service'

const PrivateRoute = ({component: Component, path}) => {
    return(
        <Route exact path={path}>
            {isLogin() ?  <Component /> : <Redirect to="/login" />}
        </Route>
    )
}

export default PrivateRoute