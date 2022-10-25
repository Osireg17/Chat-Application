import React from 'react'
import { useAuthState } from '../context/auth'
import {Route, Navigate} from 'react-router-dom'
import { type } from 'os'

// interface Props {
//     path: string,
//     element: any,
//     authenticated?: boolean,
//     guest?: boolean
// }

type Props = {
    path: string,
    element: any,
    authenticated?: boolean,
    guest?: boolean,
    component: any
}


const DynamicRoutes = (props: Props) => {
    const {user} = useAuthState();
    if (props.authenticated && !user) {
        return <Navigate to='/login' />
    }else if (props.guest && user) {
        return <Navigate to='/' />
    }else{
        return <Route element={props.component}/>
    }
}

export default DynamicRoutes;

