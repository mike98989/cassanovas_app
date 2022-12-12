import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import GenericMethodContext from "../../context/GenericMethodContext";
import * as Requests from "../../methods/Requests";

export default function NewOrder(props) {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [flavours, setFlavours] = useState([]);

    let {
        returnMsgFromContext,
        returnStatusFromContext,
    } = useContext(GenericMethodContext);

    const update_price = () => {
        alert('got here');
    }

    const makeOrder = (price, email, id, qty) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('user_email', email);
        formData.append('flavour_id', id);
        formData.append('price', price);
        formData.append('qty', qty);
        Requests.fetchAuthApi("save_order", "POST", formData).then((data) => {
            console.log(data);
            { data.data.status == '1' && props.payWithPaystack(price, email, id, qty, data.data.order_id) }

            // props.payWithPaystack(flavour.carton_price, user.company_email, flavour.id, document.getElementById('qty_' + flavour.id).value)

        });

        return;
    }

    React.useEffect(() => {
        isAuthenticated &&
            Requests.fetchAuthApi("get_all_flavours", "GET", {}).then((data) => {
                data && data.data.response && setFlavours(data.data.response);
                //setFlavours(data.data.response);
                //console.log(flavours);
            });
    }, [isAuthenticated]);


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div>{returnMsgFromContext}</div><br />
                    <div>{returnStatusFromContext}</div>
                    {!returnStatusFromContext &&
                        flavours.map((flavour, i) => {
                            return (
                                <div className="col-sm-6 col-md-3" key={i}>
                                    <div className="pricing-box pricing-box-simple pricing-color1">
                                        <div className="pricing-content">
                                            <div className="pricing-head">
                                                <div className="pricing-title">{flavour.flavour.toUpperCase()}</div>
                                                <img src={flavour.image} style={{ width: '100%' }} alt="" />
                                                <div className="pricing-features">
                                                    <ul>
                                                        <li>{flavour.description}</li>

                                                    </ul>
                                                </div>
                                                <div className="pricing-options">
                                                    <ul className="nav nav-tabs">
                                                        <li className="active"><a data-toggle="tab" href={'#carton' + i}>Carton</a></li>
                                                        <li><a data-toggle="tab" href={'#pack' + i}>Pack</a></li>
                                                    </ul>
                                                    <div className="tab-content">
                                                        <div id={'carton' + i} className="tab-pane fade in active">
                                                            <div className="pricing-price">N{flavour.carton_price}</div>
                                                            <div className="billing-cycle">per carton</div>
                                                        </div>
                                                        <div id={'pack' + i} className="tab-pane fade">
                                                            <div className="pricing-price">N{flavour.single_price}</div>
                                                            <div className="billing-cycle">per pack</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pricing-details">

                                                <ul>
                                                    <div className="form-text" style={{ marginBottom: '20px' }}>
                                                        <input type="number" className='form-control' min="0" id={'qty_' + flavour.id} placeholder="Qty" style={{ borderRadius: '15px' }} defaultValue="1" />
                                                    </div>
                                                    <li><b>N{flavour.carton_price}</b></li>
                                                </ul>
                                            </div>

                                            <div className="pricing-link">
                                                <a className="ybtn" href="#" onClick={() => { makeOrder(flavour.carton_price, user.company_email, flavour.id, document.getElementById('qty_' + flavour.id).value) }}>Order Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>

            {returnStatusFromContext &&
                <>
                    <div id="contact-info">
                        <div className='container'>
                            <div className="col-md-5" style={{ margin: '0 auto', float: 'none' }}>
                                <div className="info-box" style={{ textAlign: 'center' }}>
                                    <img src='/images/ok.png' style={{ 'width': '60px' }} />
                                    <div className="info-title">Your payment was successful</div>

                                    <div className="info-details">
                                        <img src='/images/Packs_and_Cartons_png.png' style={{ 'width': '300px' }} />

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