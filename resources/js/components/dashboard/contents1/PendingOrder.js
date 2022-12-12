import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import * as Requests from "../../methods/Requests";

export default function PendingOrders() {
    const [completed_orders, setCompletedOrders] = useState();
    const { isAuthenticated, user } = useContext(AuthContext);
    const [flavours, setFlavours] = useState([]);

    React.useEffect(() => {
        isAuthenticated &&
            Requests.fetchAuthApi('orders?email=' + user.company_email + '&status=1', "GET", {}).then((data) => {
                {
                    data && setCompletedOrders(data.data);
                    console.log(data);

                }
            })
        Requests.fetchAuthApi("get_all_flavours", "GET", {}).then((data) => {
            data && data.data.response && setFlavours(data.data.response);
        });
    }, [isAuthenticated]);

    return (
        <>
            <div id="domain-pricing" className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row-title grey-color">Pending Orders</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">

                            <div className="htfy-pricing-table-holder">
                                <div className="htfy-table">
                                    <div className="row thead">
                                        <div className="col-xs-1 th">#</div>
                                        <div className="col-xs-2 th">Transaction Ref.</div>
                                        <div className="col-xs-2 th">Amount</div>
                                        <div className="col-xs-2 th">Quantity</div>
                                        <div className="col-xs-1 th">Flavour</div>
                                        <div className="col-xs-2 th">Date</div>
                                        <div className="col-xs-2 th">Status</div>
                                    </div>
                                    {!completed_orders &&
                                        <div
                                            className="spinner-border text-light"
                                            style={{ marginTop: "15px" }}
                                            role="status"
                                        >
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    }
                                    {completed_orders && completed_orders.map((order, i) => {
                                        return (
                                            <div className="row trow" key={i}>
                                                <div className="col-xs-1 td">{i + 1}</div>
                                                <div className="col-xs-2 td">{order.transaction_reference}</div>
                                                <div className="col-xs-2 td">N{order.price}</div>
                                                <div className="col-xs-2 td">{order.qty}</div>
                                                <div className="col-xs-1 td">
                                                    {/* {flavours.filter(value => value.id == order.flavour_id)['flavour']} */}

                                                    {order.flavour_id}</div>
                                                <div className="col-xs-2 td">{order.created_at.split(' ', 1)}</div>
                                                <div className="col-xs-2 td">Pending...</div>
                                            </div>
                                        )
                                    })}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}