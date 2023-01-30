import React, { useEffect, useState, useContext } from "react";
import GenericMethodContext from "../../context/GenericMethodContext";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as constants from "../../utils/Constants";

export default function Contact() {
    let {
        newFormSubmit,
        isLoading,
        returnMsgFromContext,
        returnStatusFromContext,
    } = useContext(GenericMethodContext);

    return (
        <>
            <div id="header-holder" className="inner-header">
                <nav id="nav" className="navbar navbar-default navbar-full">
                    <div className="container-fluid">
                        <Header />
                    </div>
                </nav>
                <div id="page-head" className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <div className="page-title">Contact Us</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="h-info" className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="info-text grey-text">Please leave a message. We will surely get in touch</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-8" style={{ float: 'none', margin: '0 auto' }} id="contact_form">
                            <div className="pricing-box pricing-box-simple pricing-color1" style={{ maxWidth: '100%', width: '100%', paddingTop: '20px', marginTop: '10px', }}>
                                <form method="post" style={{ fontWeight: 'normal', paddingTop: '40px' }} className="signin-signup-form" onSubmit={(e) => {
                                    newFormSubmit("contact_message");
                                }}>
                                    <div className="pricing-content" style={{ paddingTop: '20px' }}>
                                        <div className="pricing-details" style={{ textAlign: 'left' }}>
                                            {returnMsgFromContext != "" && !isLoading && (
                                                <div className="alert alert-danger">
                                                    {returnMsgFromContext}
                                                </div>
                                            )}
                                            <label>Full Name</label>
                                            <div className="form-text">
                                                <input
                                                    type="text"
                                                    name="full_name"
                                                    placeholder="Full Name"
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <label>Email Address</label>
                                            <div className="form-text">
                                                <input
                                                    type="email"
                                                    name="email_address"
                                                    placeholder="Email Address"
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <label>Phone Number</label>
                                            <div className="form-text">
                                                <input
                                                    type="tel"
                                                    name="phone_number"
                                                    placeholder="Phone Number"
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <label>Subject</label>
                                            <div className="form-text">
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    placeholder="Subject"
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <label>Message</label>
                                            <div className="form-text">
                                                <textarea name="message" className="form-control" rows="5"></textarea>
                                            </div>

                                            {/* <ul>
                                            <li>Unlimited Storage</li>
                                            <li>500 Protected Files</li>
                                            <li>All Sharing Features</li>
                                            <li>Realtime Revoke</li>
                                            <li>Access to Party Integrations</li>
                                            <li>Free Native Apps</li>
                                            <li>QNote Editor</li>
                                            <li>Offline File Access</li>
                                            <li className="not-included">Single Sign on</li>
                                            <li className="not-included">Unlimited Email accounts</li>
                                            <li className="not-included">Support 24/7</li>
                                            <li className="not-included">Linux server</li>
                                        </ul> */}
                                        </div>
                                        <div className="pricing-link">
                                            {returnMsgFromContext != "" && !isLoading && (
                                                <div className="alert alert-danger">
                                                    {returnMsgFromContext}
                                                </div>
                                            )}
                                            <button type="submit" className="ybtn btn btn-block btn-primary" href="#">
                                                {isLoading && (
                                                    <div
                                                        className="spinner-border text-light"
                                                        style={{ marginRight: "5px" }}
                                                        role="status"
                                                    >
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                )} Create New Account</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div id="message1" className="container-fluid message-area normal-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="text-other-color1">Are you ready?</div>
                            <div className="text-other-color2">create an account, or contact us.</div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="buttons-holder">
                                <a href={constants.BASE_URL + "/signup"} className="ybtn ybtn-accent-color">Create Your Account</a><a href={constants.BASE_URL + "/contact"} className="ybtn ybtn-white ybtn-shadow">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}