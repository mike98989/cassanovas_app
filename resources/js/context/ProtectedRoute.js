import React from 'react'
import { useState, useEffect, useContext } from 'react'
import AuthContext from './AuthContext';
//import { useRouter } from "next/router";
import * as constants from "../utils/Constants";

export const ProtectedRoute = ({ children }) => {
    //const router = useRouter();
    const url = window.location.href;


    const { isAuthenticated, user, sessionType } = useContext(AuthContext);
    React.useEffect(() => {
        //useEffect(() => {
        // let include = router.pathname.includes('/dashboard');
        // console.log("include is", include);
        if (url.toString().includes('dashboard/')) {
            //alert(JSON.stringify(isAuthenticated)); return;
            if (!isAuthenticated || sessionType != 'user') {

                window.location.href = constants.BASE_URL + "/signin"
                router.push(constants.NEXT_PUBLIC_SERVER_URL + '/signin')
            }
        }

        if (url.toString().includes('admin/')) {
            //alert(JSON.stringify(isAuthenticated)); return;
            if (!isAuthenticated || sessionType != 'admin') {

                window.location.href = constants.BASE_URL + "/adminlogin"
                router.push(constants.NEXT_PUBLIC_SERVER_URL + '/signin')
            }
        }

        //})
    }, [isAuthenticated]);
    return children;

};

//export default ProtectRoute;



