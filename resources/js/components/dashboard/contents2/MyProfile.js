import { update } from 'lodash';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import GenericMethodContext from "../../../context/GenericMethodContext";
import * as Requests from "../../../methods/Requests";

export default function MyProrile(props) {
    const { isAuthenticated, user } = useContext(AuthContext);
    let {
        returnMsgFromContext,
        returnStatusFromContext,
    } = useContext(GenericMethodContext);



    return (
        <>
            <div className='row'>
                <div className='col-lg-5'>
                    {isAuthenticated &&
                        <div className="card" >
                            <div className="container"> <div className="p-4"> <div className=" image d-flex flex-column justify-content-center align-items-center"> <button className="btn btn_circle btn-secondary"> <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" /></button> <span className="name mt-3">{user.company_name}</span> <span className="idd">@{user.company_email}</span> <div className="d-flex flex-row justify-content-center align-items-center gap-2"> <span className="idd1">{user.company_phone} </span> <span><i className="fa fa-phone"></i></span> </div>
                                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                                    <span><i className="fa fa-map-marker-alt"></i></span>
                                    <br /> <span className="idd1">{user.company_address} </span><br /><span className="idd1">{user.state}</span> </div>
                                <div className="d-flex flex-row justify-content-center align-items-center mt-3"> </div>
                                <div className=" d-flex mt-2"> <button className="btn1 btn-dark">Edit Profile</button> </div>
                                <div className=" d-flex mt-2"> <button className="btn2 btn-light">Change Password</button> </div>

                                <div className=" px-2 rounded mt-4 date "> <span className="join">Joined {user.email_verified_at}</span> </div> </div> </div>

                            </div>
                        </div>
                    }
                </div>

            </div>
        </>
    )
}