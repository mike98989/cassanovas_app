import React from 'react'
import { useState, useEffect, useContext } from 'react'
import AuthContext from './AuthContext';
//import { useRouter } from "next/router";
import * as constants from "../utils/Constants";

export const ProtectedRoute = ({ children }) => {
    //const router = useRouter();
    const url = window.location.href;

    const { isAuthenticated, user } = useContext(AuthContext);
    useEffect(() => {
        // let include = router.pathname.includes('/dashboard');
        // console.log("include is", include);
        if (url.toString().includes('dashboard')) {
            //alert(JSON.stringify(isAuthenticated)); return;
            if (!isAuthenticated) {
                window.location.href = constants.BASE_URL + "/signin"
                //router.push(constants.NEXT_PUBLIC_SERVER_URL + '/signin')
            }
        }

    })
    return children;

};

//export default ProtectRoute;



