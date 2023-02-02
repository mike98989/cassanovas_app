import React from 'react'
import { useState, useEffect, useContext } from 'react'
//import { useHistory } from "react-router-dom";
import * as Requests from '../methods/Requests';
//import { useRouter } from 'next/router';
import * as constants from "../utils/Constants";

const AuthContext = React.createContext({})
//export const AuthProvider = AuthContext.Provider
export default AuthContext
export const AuthProvider = ({ children }) => {

    // const router = useRouter();
    const [user, setUser] = useState(null)
    const [authTokens, setAuthTokens] = useState(null)
    const [isLoading, setLoading] = useState(true);
    const [sessionType, setSessionType] = useState(null);

    useEffect(() => {
        async function loadAuthFromLocalStorage() {
            localStorage.getItem('authTokens') ? setAuthTokens(JSON.parse(localStorage.getItem('authTokens'))) : setAuthTokens(null);
            localStorage.getItem('user_data') ? setUser(JSON.parse(localStorage.getItem('user_data'))) : setUser(null);
            localStorage.getItem('session_type') ? setSessionType(JSON.parse(localStorage.getItem('session_type'))) : setSessionType(null);
            setLoading(false);
        }
        loadAuthFromLocalStorage();
    }, [])


    //}
    //loadAuthFromLocalStorage();
    //}, [])

    let contextData = {
        user: user,
        authTokens: authTokens,
        sessionType: sessionType,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        logoutUser: logout,
        isAuthenticated: !!user,
    }


    function logout() {
        localStorage.clear();
        Requests.fetchAuthApi('logout', {}, 'POST', null).then(data => {
            console.log(data);
            //window.location.href="";
            //router.push(constants.NEXT_PUBLIC_SERVER_URL + '/signin')
            window.location.href('./signin')
        })
        setAuthTokens(null);
        setUser(null);

    }

    useEffect(() => {
        if (authTokens) {
            setUser(JSON.parse(localStorage.getItem('user_data')))
        }
        setLoading(false)

    }, [authTokens, isLoading])


    return (
        <AuthContext.Provider value={contextData} >
            {isLoading ? null : children}
        </AuthContext.Provider>
    )
}


