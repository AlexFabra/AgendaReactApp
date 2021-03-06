import { Navigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = ({children}) => {
    
const {uid} = useSelector(state => state.auth)
    return (
        !!uid
        ?   children  
        :  <Navigate to="/login" />
    )              
}
 
 
export default PrivateRoute;