import React, { useState, useContext } from 'react'
import * as constants from '../../../utils/Constants'
import GenericMethodContext from "../../../context/GenericMethodContext";
import AuthContext from "../../../context/AuthContext";

export default function HeaderNav() {
    let {
        signOut,
    } = useContext(GenericMethodContext);
    const { isAuthenticated, user } = useContext(AuthContext);


    return (
        <nav id="nav" className="navbar navbar-default navbar-full">
            <div className="container-fluid">
                <div className="container container-nav">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="navbar-header">
                                <button aria-expanded="false" type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="logo-holder" href={constants.BASE_URL}>
                                    <div className="logo" style={{ width: '102px', height: '88px' }}></div>
                                </a>
                            </div>
                            <div style={{ height: "1px" }} role="main" aria-expanded="false" className="navbar-collapse collapse" id="bs">
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="support-button-holder support-dropdown" >
                                        <div className="user_title_wrapper">
                                            <img className="user_image" src="/images/boy.png" alt="" /><span className="user_title">Welcome {user.company_name}</span>
                                        </div>
                                        <ul className="dropdown-menu">
                                            <li><a href={constants.BASE_URL + '/myprofile'}><i className="fas fa-user"></i>My Profile</a></li>
                                            <li><a href={constants.BASE_URL + '/settings'}><i className="fas fa-cog"></i>Settings</a></li>
                                            <li><a href="#" onClick={signOut}><i className="fa fa-sign-out"></i>Signout</a></li>

                                        </ul>
                                    </li>

                                    <li><a href={constants.BASE_URL + '/dashboard/home'}>Home</a></li>
                                    <li className="dropdown unity-menu">
                                        <a href={constants.BASE_URL + '/myprofile'}>My Profile <i className="fas fa-caret-down"></i></a>
                                        <ul className="dropdown-menu">
                                            <li><a href={constants.BASE_URL + '/my profile'}>My Profile</a></li>
                                            <li><a href={constants.BASE_URL + '/settings'}>Settings</a></li>
                                            <li><a href="#" onClick={signOut}>Signout</a></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown">
                                        <a href="#">Orders <i className="fas fa-caret-down"></i></a>
                                        <ul className="dropdown-menu">
                                            <li><a href={constants.BASE_URL + '/dashboard/order/new'}>New Order</a></li>
                                            <li><a href={constants.BASE_URL + '/dashboard/order/completed'}>Completed</a></li>
                                            <li><a href={constants.BASE_URL + '/dashboard/order/pending'}>Pending</a></li>
                                        </ul>
                                    </li>
                                    <li><a className="login-button" href="#" onClick={signOut}>Signout</a></li>
                                    <li className="support-button-holder support-dropdown">
                                        <a className="support-button" href="#">Support</a>
                                        <ul className="dropdown-menu">
                                            <li><a href="#"><i className="fas fa-phone"></i>Toll-Free  08-197-435-01</a></li>
                                            <li><a href="#"><i className="fas fa-comments"></i>Whatsapp Chat</a></li>
                                            <li><a href="#"><i className="fas fa-ticket-alt"></i>Open a ticket</a></li>
                                        </ul>
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )

}
