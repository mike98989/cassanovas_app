import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import * as Requests from "../../../methods/Requests";

export default function CancelledOrders() {
    const [pending_orders, setPendingOrders] = useState();
    const { isAuthenticated, user } = useContext(AuthContext);
    // const [flavours, setFlavours] = useState([]);

    React.useEffect(() => {
        isAuthenticated &&
            Requests.fetchAuthApi('orders?status=0', "GET", {}).then((data) => {
                {
                    data && setPendingOrders(data.data);
                    console.log(data);

                }
            })
        // Requests.fetchAuthApi("get_all_flavours", "GET", {}).then((data) => {
        //     data && data.data.response && setFlavours(data.data.response);
        // });
    }, [isAuthenticated]);

    return (
        <div className="row">
            < div className="col-xl-12 col-lg-12 mb-4" >
                <div className="card">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 text-default">Orders In Progress</h6>

                    </div>
                    <div className="table-responsive">
                        <table className="table align-items-center table-flush">
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Transaction Ref.</th>
                                    <th>Amount</th>
                                    <th>Quantity</th>
                                    <th>Flavour</th>
                                    <th>Date</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {!pending_orders &&
                                        <tr style={{ textAlign: 'center' }}>
                                            <td colSpan="7"><div
                                                className="spinner-border text-light"
                                                style={{ marginTop: "15px" }}
                                                role="status"
                                            >
                                                <span className="sr-only">Loading...</span>
                                            </div></td>
                                        </tr>

                                    }

                                    {pending_orders && pending_orders.map((order, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td><a href="#">{order.transaction_reference}</a></td>
                                                <td>N{order.price}</td>
                                                <td>{order.qty}</td>
                                                <td>{order.flavour.flavour}
                                                </td>
                                                <td>{order.created_at}</td>
                                                <td><a href='#' className='btn btn-xs btn-info '>Invoice</a></td>
                                            </tr>
                                        )
                                    }
                                    )}
                                </>
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer"></div>
                </div>
            </div >


        </div>
    )
}