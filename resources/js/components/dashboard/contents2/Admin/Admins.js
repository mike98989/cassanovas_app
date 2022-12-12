import { constant } from 'lodash';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../../../context/AuthContext";
import * as Requests from "../../../../methods/Requests";
import * as Constants from "../../../../utils/Constants";
import GenericMethodContext from "../../../../context/GenericMethodContext";

export default function Administrators() {
    const [admins, setAdmins] = useState();
    const { isAuthenticated, user } = useContext(AuthContext);
    const [flavours, setFlavours] = useState([]);

    let {
        returnMsgFromContext,
        returnStatusFromContext,
        isLoading,
        disableEnable,
    } = useContext(GenericMethodContext);



    React.useEffect(() => {
        isAuthenticated &&
            Requests.fetchAuthApi('admins', "GET", {}).then((data) => {
                {
                    data && setAdmins(data.data);
                    console.log(data);

                }
            })
    }, [isAuthenticated]);

    return (
        <div className="row">
            < div className="col-xl-12 col-lg-12 mb-4" >
                <div className="card">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 text-default">Administrative Users</h6>
                        <a href={Constants.BASE_URL + '/admindashboard/administrators/new'} className='btn btn-sm btn-info'>Create New +</a>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-items-center table-flush">
                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Last Login</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {!admins &&
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

                                    {admins && admins.map((admin, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{admin.full_name}</td>
                                                <td>{admin.email}</td>
                                                <td>{admin.phone}</td>
                                                <td>{admin.last_login}</td>
                                                <td>{admin.status == '1' &&
                                                    <button className='btn btn-sm btn-danger' onClick={(e) => disableEnable('disable_enable?id=' + admin.id + '&table=admin&action=0')}>Disable</button>
                                                }
                                                    {admin.status == '0' &&
                                                        <button className='btn btn-sm btn-info' onClick={(e) => disableEnable('disable_enable?id=' + admin.id + '&table=admin&action=1')}>Enable</button>
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