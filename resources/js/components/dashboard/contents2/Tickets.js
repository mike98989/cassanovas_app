import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import * as Requests from "../../../methods/Requests";

export default function Tickets() {
    const [tickets, setTickets] = useState();
    const { isAuthenticated, user } = useContext(AuthContext);
    const [flavours, setFlavours] = useState([]);

    React.useEffect(() => {
        isAuthenticated &&
            Requests.fetchAuthApi('tickets?status=1', "GET", {}).then((data) => {
                {
                    data && setTickets(data.data);
                    console.log(data);

                }
            })
    }, [isAuthenticated]);

    return (
        <div className="row">
            < div className="col-xl-12 col-lg-12 mb-4" >
                <div className="card">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 text-default">Support Tickets</h6>

                    </div>
                    <div className="table-responsive">
                        <table className="table align-items-center table-flush">
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Ticket ID</th>
                                    <th>Subject</th>
                                    <th>Last Response</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {!tickets &&
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

                                    {tickets && tickets.map((ticket, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td><a href="#">{ticket.ticket_id}</a></td>
                                                <td>{ticket.subject}</td>
                                                <td>{ticket.message}</td>
                                                <td></td>
                                                <td>{ticket.created_at}</td>
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