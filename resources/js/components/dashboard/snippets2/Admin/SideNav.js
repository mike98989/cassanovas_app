import React from 'react';
import * as constants from '../../../../utils/Constants'
export default function SideNav() {
    return (
        <ul className="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#" style={{ backgroundColor: '#fff' }}>
                <div className="sidebar-brand-icon">
                    <img src="/images/logo_black.png" />
                </div>
                <div className="sidebar-brand-text mx-3">Cassanovas</div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item">
                <a className="nav-link" href={constants.BASE_URL + '/admin/home'}>
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
                Features
            </div>

            <li className="nav-item">
                <a className="nav-link" href={constants.BASE_URL + '/admin/distributors'}>
                    <i className="fas fa-users"></i>
                    <span>Distributors </span>
                </a>
            </li>


            <li className="nav-item">
                <a className="nav-link" href={constants.BASE_URL + '/admin/transactions'}>
                    <i className="fas fa-credit-card"></i>
                    <span>Transactions </span>
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link" href={constants.BASE_URL + '/admin/flavours'}>
                    <i className="fa fa-th"></i>
                    <span> Flavours </span>
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBootstrap"
                    aria-expanded="true" aria-controls="collapseBootstrap">
                    <i className="far fa-fw fa-window-maximize"></i>
                    <span>Orders</span>
                </a>
                <div id="collapseBootstrap" className="collapse" aria-labelledby="headingBootstrap" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Orders</h6>
                        <a className="collapse-item" href={constants.BASE_URL + '/admin/order/completed'}>Completed</a>
                        {/* <a className="collapse-item" href={constants.BASE_URL + '/dashboard/order/pending'}>In Process</a> */}


                    </div>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link" href={constants.BASE_URL + '/admin/flavours'}>
                    <i className="fab fa-fw fa-wpforms"></i>
                    <span>Support </span>
                </a>
            </li>



            <li className="nav-item">
                <a className="nav-link" href={constants.BASE_URL + '/admin/administrators'}>
                    <i className="fas fa-users"></i>
                    <span>Administrators </span>
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