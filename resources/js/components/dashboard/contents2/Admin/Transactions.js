import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../../../context/AuthContext";
import * as Requests from "../../../../methods/Requests";

export default function PendingOrders() {
    const [transactions, setTransactions] = useState();
    const { isAuthenticated, user } = useContext(AuthContext);
    // const [flavours, setFlavours] = useState([]);

    React.useEffect(() => {
        isAuthenticated &&
            Requests.fetchAuthApi('get_all_transactions', "GET", {}).then((data) => {
                {
                    data && setTransactions(data.data);
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
                        <h6 className="m-0 text-default">Transaction</h6>

                    </div>
                    <div className="table-responsive-sm">
                        <table className="table table-sm table-flush" style={{ fontSize: '12px' }}>
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th >Company</th>
                                    <th>Trans. Ref.</th>
                                    <th>Amount</th>
                                    <th className="col-md-7">Orders</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {!transactions &&
                                        <tr style={{ textAlign: 'center' }}>
                                            <td colSpan="8"><div
                                                className="spinner-border text-light"
                                                style={{ marginTop: "15px" }}
                                                role="status"
                                            >
                                                <span className="sr-only">Loading...</span>
                                            </div></td>
                                        </tr>

                                    }

                                    {transactions && transactions.map((order, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td><a href="#">{order.user_email}</a></td>
                                                <td><a href="#">{order.transaction_reference}</a></td>
                                                <td>N{order.price}</td>
                                                <td className="col-md-7" style={{ fontSize: '13px', width: '60px' }}>{order.order_details.map((details, i) =>
                                                    details.qty + ' carton(s) of ' + details.flavour + ' @ ' + details.sales_price + ' per carton ,'
                                                )}</td>
                                                <td>{order.transaction_status == '1' ? "success" : 'Failed'}</td>
                                                <td>{order.created_at}</td>
                                                <td><a href='#' className='btn btn-sm btn-info '>Print</a></td>
                                            </tr>
                                        )
                                    }

                                        // {transactions && transactions.map((transaction, i) => {
                                        //     const transaction_data = JSON.parse(transaction.order_details); console.log(transaction_data.data);
                                        //     return (
                                        //         <tr key={i}>
                                        //             <td>{i + 1}</td>
                                        //             <td>{transaction.user_email}</td>
                                        //             <td>{transaction.transaction_reference}<br />
                                        //                 <span style={{ fontSize: '11px' }}>Status: {transaction.transaction_status}</span></td>
                                        //             <td>N{transaction_data.sales_price}</td>
                                        //             <td>{transaction_data.order_rand}</td>
                                        //             <td><span style={{ fontSize: '10px' }}>{transaction.created_at}</span></td>

                                        //         </tr>
                                        //     )
                                        // }
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