import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import * as Requests from "../../../methods/Requests";

export default function Landing() {
    const [count_data, setCountData] = useState([]);
    const { isAuthenticated, user } = useContext(AuthContext);

    React.useEffect(() => {
        isAuthenticated &&
            Requests.fetchAuthApi("get_user_orders", "GET", {}).then((data) => {
                console.log(data.data.message.length);
                data && data.data.message && setCountData(data.data.message);

            });
    }, [isAuthenticated]);

    return (
        <>
            {count_data.length != 0 &&
                < div className="row mb-3" >
                    {/* <!-- Earnings (Annual) Card Example --> */}
                    < div className="col-xl-3 col-md-6 mb-4" >
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Completed Orders</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{count_data[0].completed}</div>
                                        {/* <div className="mt-2 mb-0 text-muted text-xs">
                                            <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 12%</span>
                                            <span>Since last years</span>
                                        </div> */}
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-truck fa-2x text-success"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    {/* <!-- New User Card Example --> */}
                    < div className="col-xl-3 col-md-6 mb-4" >
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Cancelled Orders</div>
                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{count_data[0].cancelled}</div>
                                        {/* <div className="mt-2 mb-0 text-muted text-xs">
                                            <span className="text-success mr-2"><i className="fas fa-arrow-up"></i> 20.4%</span>
                                            <span>Since last month</span>
                                        </div> */}
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-times fa-2x text-danger"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    {/* <!-- Pending Requests Card Example --> */}
                    < div className="col-xl-3 col-md-6 mb-4" >
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Tickets</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                                        {/* <div className="mt-2 mb-0 text-muted text-xs">
                                            <span className="text-danger mr-2"><i className="fas fa-arrow-down"></i> 1.10%</span>
                                            <span>Since yesterday</span>
                                        </div> */}
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-comments fa-2x text-warning"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >


                </div >
            }

        </>
    )
}