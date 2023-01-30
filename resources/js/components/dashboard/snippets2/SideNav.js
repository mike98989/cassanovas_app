import React from 'react';
import * as constants from '../../../utils/Constants'

export default function SideNav() {
    return (
        <ul className="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#" style={{ backgroundColor: '#fff' }}>
                <div className="sidebar-brand-icon">
                    <img src="/images/logo_black.png" />
                </div>
                <div className="sidebar-brand-text mx-3">{constants.APP_NAME}</div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item">
                <a className="nav-link" href={constants.BASE_URL + '/dashboard/home'}>
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>
            <hr className="sidebar-divider" />
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMyProfile"
                    aria-expanded="true" aria-controls="collapseMyProfile">
                    <i className="far fa-fw fa-user"></i>
                    <span>My Profile</span>
                </a>
                <div id="collapseMyProfile" className="collapse" aria-labelledby="headingBootstrap" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <a className="collapse-item" href={constants.BASE_URL + '/dashboard/profile/me'}>My Profile </a>
                        <a className="collapse-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout </a>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
                Features
            </div>
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOrders"
                    aria-expanded="true" aria-controls="collapseOrders">
                    <i className="far fa-fw fa-window-maximize"></i>
                    <span>Orders</span>
                </a>
                <div id="collapseOrders" className="collapse" aria-labelledby="headingBootstrap" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Orders</h6>
                        <a className="collapse-item" href={constants.BASE_URL + '/dashboard/order/new'}>New Order</a>
                        <a className="collapse-item" href={constants.BASE_URL + '/dashboard/order/completed'}>Completed</a>
                        {/* <a className="collapse-item" href={constants.BASE_URL + '/dashboard/order/pending'}>In Process</a> */}


                    </div>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseForm" aria-expanded="true"
                    aria-controls="collapseForm">
                    <i className="fab fa-fw fa-wpforms"></i>
                    <span>Support Tickets</span>
                </a>
                <div id="collapseForm" className="collapse" aria-labelledby="headingForm" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Support Tickets</h6>
                        <a className="collapse-item" href={constants.BASE_URL + '/dashboard/ticket/new'}>New Ticket</a>
                        <a className="collapse-item" href={constants.BASE_URL + '/dashboard/ticket/all'}>All</a>
                    </div>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    <i className="fas fa-file-alt"></i>
                    <span style={{ marginLeft: '4px' }}>Legal Document </span>
                </a>
            </li>


            <hr className="sidebar-divider" />
            <li className="nav-item">
                <a className="nav-link" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Signout </span>
                </a>
            </li>
            <hr className="sidebar-divider" />
            <div className="version" id="version-ruangadmin"></div>
        </ul>
    )
}