import { update } from 'lodash';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import GenericMethodContext from "../../../context/GenericMethodContext";
import * as Requests from "../../../methods/Requests";

export default function NewOrder(props) {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [flavours, setFlavours] = useState([]);

    let {
        returnMsgFromContext,
        returnStatusFromContext,
    } = useContext(GenericMethodContext);

    const update_price = (carton_price, key) => {
        let qty = document.getElementById('qty_' + key).value;
        if (qty > 0) {
            let new_price = carton_price * qty;
            document.getElementById('price_' + key).innerText = "N" + new_price;
        } else if (isNaN(qty)) {
            document.getElementById('price_' + key).innerText = "N" + carton_price;
            document.getElementById('qty_' + key).value = '1';
        }
    }

    const makeOrder = (price, email, id, qty) => {
        if (qty > 0) {
            event.preventDefault();
            const formData = new FormData();
            formData.append('flavour_id', id);
            formData.append('price', price * qty);
            formData.append('qty', qty);
            Requests.fetchAuthApi("save_order", "POST", formData).then((data) => {
                console.log(data);
                { data.data.status == '1' && props.payWithPaystack(price * qty, email, id, qty, data.data.order_id) }

                // props.payWithPaystack(flavour.carton_price, user.company_email, flavour.id, document.getElementById('qty_' + flavour.id).value)

            });
        } else {
            alert("Please enter quantity")
        }
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
        <>
            <div className='row'>
                {!returnStatusFromContext &&
                    flavours.map((flavour, i) => {
                        return (
                            <div className="col-lg-3" key={i}>
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
                                                    <input type="number" className='form-control' min="0" id={'qty_' + flavour.id} placeholder="Qty" style={{ borderRadius: '15px' }} defaultValue="1" onChange={() => update_price(flavour.carton_price, flavour.id)} />
                                                </div>
                                                <li><b id={'price_' + flavour.id}>N{flavour.carton_price}</b></li>
                                            </ul>
                                        </div>

                                        <div className="pricing-link">
                                            <a className="ybtn" href="#" onClick={() => { makeOrder(flavour.carton_price, user.company_email, flavour.id, document.getElementById('qty_' + flavour.id).value) }}>Order Now</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }

                {returnStatusFromContext &&
                    <>
                        <div className="col-md-5" style={{ margin: '0 auto', float: 'none' }}>
                            <div className="card">
                                <div className='card-body'>
                                    <div className="info-box" style={{ textAlign: 'center' }}>
                                        <img src='/images/ok.png' style={{ 'width': '40px' }} />
                                        <div className="info-title">Your payment was successful. Your orders are being processed.</div>

                                        <div className="info-details">
                                            <img src='/images/Packs_and_Cartons_png.png' style={{ 'width': '200px', marginTop: '20px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                }
            </div>
        </>
    )
}