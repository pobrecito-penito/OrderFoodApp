import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLogin } from '../../services/auth.service'

const PublicRoute = ({component: Component,path}) => {

    return(
        <Route exact path={path}>
            {!isLogin() ?  <Component /> : <Redirect to="/home" />}
        </Route>
    )
}

export default PublicRoute