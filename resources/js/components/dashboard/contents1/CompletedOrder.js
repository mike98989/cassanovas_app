import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import * as Requests from "../../methods/Requests";

export default function CompletedOrders() {
    const [completed_orders, setCompletedOrders] = useState();
    const { isAuthenticated, user } = useContext(AuthContext);

    React.useEffect(() => {
        isAuthenticated &&
            Requests.fetchAuthApi('orders?email=' + user.company_email + '&status=2', "GET", {}).then((data) => {
                {
                    setCompletedOrders(data.data);
                    console.log(data);

                }
            })

    }, [isAuthenticated]);

    return (
        <>
            <div id="domain-pricing" className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row-title grey-color">Completed Orders</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="htfy-pricing-table-holder">
                                {completed_orders && completed_orders.length != 0 ?
                                    <div className="htfy-table">
                                        <div className="row thead">
                                            <div className="col-xs-2 th">Reference</div>
                                            <div className="col-xs-2 th">Amount</div>
                                            <div className="col-xs-2 th">Quantity</div>
                                            <div className="col-xs-2 th">Flavour</div>
                                            <div className="col-xs-2 th">Date</div>
                                            <div className="col-xs-2 th">Status</div>
                                        </div>
                                        {completed_orders && completed_orders.map((order, i) => {
                                            return (
                                                <div className="row trow" key={i}>
                                                    <div className="col-xs-2 td">{order.transaction_reference}</div>
                                                    <div className="col-xs-2 td">{order.price}</div>
                                                    <div className="col-xs-2 td">{order.qty}</div>
                                                    <div className="col-xs-2 td">
                                                        {order.flavour_id}</div>
                                                    <div className="col-xs-2 td">{order.created_at}</div>
                                                    <div className="col-xs-2 td">Completed</div>
                                                </div>
                                            )
                                        })}


                                    </div>
                                    :

                                    <div>No Record Found</div>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}