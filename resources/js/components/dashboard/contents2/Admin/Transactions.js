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
                        <table className="table table-sm table-flush">
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Company</th>
                                    <th>Trans. Ref.</th>
                                    <th>Amount</th>
                                    <th>Order</th>
                                    <th>IP Address</th>
                                    <th>Date</th>

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

                                    {transactions && transactions.map((transaction, i) => {
                                        const transaction_data = JSON.parse(transaction.transaction_data); console.log(transaction_data.data);
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{transaction.user_email}</td>
                                                <td>{transaction.transaction_reference}<br />
                                                    <span style={{ fontSize: '11px' }}>Channel: {transaction_data.data.channel} Status: {transaction_data.data.status}</span></td>
                                                <td>N{transaction.price}</td>
                                                <td><a href="#">{transaction_data.data.metadata.order_id}</a></td>
                                                <td>{transaction_data.data.ip_address}
                                                </td>
                                                <td><span style={{ fontSize: '10px' }}>{transaction.created_at}</span></td>

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