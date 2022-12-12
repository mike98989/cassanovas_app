import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import GenericMethodContext from "../../../context/GenericMethodContext";
import * as Requests from "../../../methods/Requests";

export default function NewOrder(props) {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [return_msg_from_context, setReturnMsgFromContext] = useState("");
    const [return_status_from_context, setReturnStatusFromContext] = useState();

    let {
        returnMsgFromContext,
        returnStatusFromContext,
    } = useContext(GenericMethodContext);

    React.useEffect(() => {
        const url = window.location.search;
        const queryParams = new URLSearchParams(url)
        const reference = queryParams.get("reference")

        isAuthenticated &&
            Requests.fetchAuthApi('verify_paystack_payment?reference=' + reference, "GET", {}).then((data) => {
                {
                    console.log(data.data);
                    data.data.status == true
                        ? (setReturnMsgFromContext(data.data.response),
                            setReturnStatusFromContext(data.data.status))
                        : setReturnMsgFromContext(data.data.message);
                }
            })

    }, [isAuthenticated]);


    return (
        <div>

            {(!return_status_from_context) &&
                <>
                    <div id="contact-info">
                        <div className='container'>
                            <div className="col-md-5" style={{ margin: '0 auto', float: 'none' }}>
                                <div className="info-box" style={{ textAlign: 'center' }}>
                                    <div
                                        className="spinner-border text-light"
                                        style={{ marginRight: "5px" }}
                                        role="status"
                                    >
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <div>Loading... Please wait...</div>
                                    {return_msg_from_context}
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            }


            {return_status_from_context &&
                <>
                    <div id="contact-info">
                        <div className='container'>
                            <div className="col-md-5" style={{ margin: '0 auto', float: 'none' }}>
                                <div className="info-box" style={{ textAlign: 'center' }}>
                                    <img src='/images/ok.png' style={{ 'width': '60px' }} />
                                    <div className="info-title">Your payment was successful</div>

                                    <div className="info-details">
                                        <img src='/images/Packs_and_Cartons2_png.png' style={{ 'width': '300px' }} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            }

            {/* <div className="col-sm-6 col-md-4">
                        <div className="pricing-box pricing-box-simple pricing-color2 bestbuy">
                            <div className="pricing-content">
                                <div className="pricing-head">
                                    <div className="pricing-title">Business Plan</div>
                                    <div className="pricing-features">
                                        <ul>
                                            <li>Great for Starting Website</li>
                                            <li>Small Websites</li>
                                            <li>Startups</li>
                                        </ul>
                                    </div>
                                    <div className="pricing-options">
                                        <ul className="nav nav-tabs">
                                            <li className="active"><a data-toggle="tab" href="#monthly2">Monthly</a></li>
                                            <li><a data-toggle="tab" href="#annualy2">Annualy</a></li>
                                        </ul>
                                        <div className="tab-content">
                                            <div id="monthly2" className="tab-pane fade in active">
                                                <div className="pricing-price">$10.8</div>
                                                <div className="billing-cycle">per month</div>
                                            </div>
                                            <div id="annualy2" className="tab-pane fade">
                                                <div className="pricing-price">$110.8</div>
                                                <div className="billing-cycle">per year</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pricing-details">
                                    <ul>
                                        <li>Unlimited Storage</li>
                                        <li>500 Protected Files</li>
                                        <li>All Sharing Features</li>
                                        <li>Realtime Revoke</li>
                                        <li>Access to Party Integrations</li>
                                        <li>Free Native Apps</li>
                                        <li>QNote Editor</li>
                                        <li>Offline File Access</li>
                                        <li>Single Sign on</li>
                                        <li>Unlimited Email accounts</li>
                                        <li className="not-included">Support 24/7</li>
                                        <li className="not-included">Linux server</li>
                                    </ul>
                                </div>
                                <div className="pricing-link">
                                    <a className="ybtn" href="#">Create New Account</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="pricing-box pricing-box-simple pricing-color3">
                            <div className="pricing-content">
                                <div className="pricing-head">
                                    <div className="pricing-title">Premium Plan</div>
                                    <div className="pricing-features">
                                        <ul>
                                            <li>Great for Starting Website</li>
                                            <li>Small Websites</li>
                                            <li>Startups</li>
                                        </ul>
                                    </div>
                                    <div className="pricing-options">
                                        <ul className="nav nav-tabs">
                                            <li className="active"><a data-toggle="tab" href="#monthly3">Monthly</a></li>
                                            <li><a data-toggle="tab" href="#annualy3">Annualy</a></li>
                                        </ul>
                                        <div className="tab-content">
                                            <div id="monthly3" className="tab-pane fade in active">
                                                <div className="pricing-price">$18.8</div>
                                                <div className="billing-cycle">per month</div>
                                            </div>
                                            <div id="annualy3" className="tab-pane fade">
                                                <div className="pricing-price">$200.8</div>
                                                <div className="billing-cycle">per year</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pricing-details">
                                    <ul>
                                        <li>Unlimited Storage</li>
                                        <li>500 Protected Files</li>
                                        <li>All Sharing Features</li>
                                        <li>Realtime Revoke</li>
                                        <li>Access to Party Integrations</li>
                                        <li>Free Native Apps</li>
                                        <li>QNote Editor</li>
                                        <li>Offline File Access</li>
                                        <li>Single Sign on</li>
                                        <li>Unlimited Email accounts</li>
                                        <li>Support 24/7</li>
                                        <li>Linux server</li>
                                    </ul>
                                </div>
                                <div className="pricing-link">
                                    <a className="ybtn" href="#">Create New Account</a>
                                </div>
                            </div>
                        </div>
                    </div> */}

        </div>

    )
}