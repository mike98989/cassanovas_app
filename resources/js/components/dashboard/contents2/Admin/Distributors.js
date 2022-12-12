import { constant } from 'lodash';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../../../context/AuthContext";
import * as Requests from "../../../../methods/Requests";
import * as Constants from "../../../../utils/Constants";
import GenericMethodContext from "../../../../context/GenericMethodContext";

export default function Distributors() {
    const [distributors, setDistributors] = useState();
    const { isAuthenticated, user } = useContext(AuthContext);

    let {
        returnMsgFromContext,
        returnStatusFromContext,
        isLoading,
        disableEnable,
    } = useContext(GenericMethodContext);



    React.useEffect(() => {
        isAuthenticated &&
            Requests.fetchAuthApi('distributors', "GET", {}).then((data) => {
                {
                    data && setDistributors(data.data);
                    console.log(data);

                }
            })
    }, [isAuthenticated]);

    return (
        <div className="row">
            < div className="col-xl-12 col-lg-12 mb-4" >
                <div className="card">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 text-default">All Distributors</h6>
                        <a href={Constants.BASE_URL + '/admindashboard/administrators/new'} className='btn btn-sm btn-info'>Create New +</a>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-items-center table-flush">
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>State</th>
                                    <th>Last Login</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {!distributors &&
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

                                    {distributors && distributors.map((distributor, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td><a href={Constants.BASE_URL + '/admindashboard/distributors/' + distributor.rand}>{distributor.company_name}</a></td>
                                                <td>{distributor.company_email}</td>
                                                <td>{distributor.company_phone}</td>
                                                <td>{distributor.state}</td>
                                                <td>{distributor.last_login}</td>
                                                <td>{distributor.status == '1' &&
                                                    <button className='btn btn-sm btn-danger' onClick={(e) => disableEnable('disable_enable?id=' + distributor.id + '&table=distributors&action=0')}>Disable</button>
                                                }
                                                    {distributor.status == '0' &&
                                                        <button className='btn btn-sm btn-info' onClick={(e) => disableEnable('disable_enable?id=' + distributor.id + '&table=distributors&action=1')}>Enable</button>
                                                    }
                                                </td>
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