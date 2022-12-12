import React, { useState, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import * as constants from '../../../utils/Constants'


export default function HeaderNav() {

    const { isAuthenticated, user } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
            <button id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item no-arrow mx-1">
                    <a className="nav-link" href="#" role="button" data-toggle="dropdown">

                        <img className="img-profile rounded-circle" src="/images/whatsapp.png" style={{ heihgt: '20px' }} />
                    </a>
                </li>

                <li className="nav-item no-arrow mx-1">
                    <a className="nav-link" href="#" role="button" data-toggle="dropdown">
                        <i className="fa fa-phone"></i>
                    </a>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <img className="img-profile rounded-circle" src="/images/boy.png" style={{ maxWidth: '60px' }} />
                        <span className="ml-2 d-none d-lg-inline text-white small">{user.company_name}</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <a className="dropdown-item" href={constants.BASE_URL + '/dashboard/profile'}>
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </a>

                        <a className="dropdown-item" href="#">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}