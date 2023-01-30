import React from 'react';
import * as constants from '../utils/Constants'

export default function Header() {
    return (
        <div className="container container-nav">
            <div className="row">
                <div className="col-md-12">
                    <div className="navbar-header">
                        <button aria-expanded="false" type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="logo-holder" href="#">
                            <div className="logo" style={{ width: '102px', height: '138px' }}></div>
                        </a>
                    </div>
                    <div style={{ height: '1px' }} role="main" aria-expanded="false" className="navbar-collapse collapse" id="bs">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href={constants.BASE_URL + '/'}>Home</a></li>
                            <li><a href={constants.BASE_URL + '/contact'}>Contact us</a></li>
                            <li><a className="login-button" href="./signin">Login</a></li>
                            <li className="support-button-holder support-dropdown">
                                <a className="support-button" href="#">Support</a>
                                <ul className="dropdown-menu">
                                    <li><a target="_blank" href="https://wa.me/08138004276"><i className="fas fa-comments"></i>Whatsapp  08138004276</a></li>
                                    <li><a href="#"><i className="fas fa-envelope"></i>Email support@cassanovas.ng</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
