import { constant } from 'lodash';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../../../context/AuthContext";
import * as Requests from "../../../../methods/Requests";
import * as Constants from "../../../../utils/Constants";
import GenericMethodContext from "../../../../context/GenericMethodContext";

export default function Distributors(props) {
    const [distributor, setDistributor] = useState(props.distributor_id);
    const { isAuthenticated, user } = useContext(AuthContext);


    let {
        returnMsgFromContext,
        returnStatusFromContext,
        isLoading,
        disableEnable,
    } = useContext(GenericMethodContext);

    React.useEffect(() => {
        (isAuthenticated && props.distributor_id) &&
            Requests.fetchAuthApi('distributor?rand=' + props.distributor_id, "GET", {}).then((data) => {
                {
                    data && setDistributor(data.data);
                    console.log(data);

                }
            })
    }, [props.distributor_id]);

    return (
        <>
            {distributor &&
                <div className="row">
                    < div className="col-xl-5 col-lg-6 mb-4" >
                        <div className="card">
                            <div className="card-header py-3" style={{ textAlign: 'center' }}>

                                <img className="img-profile rounded-circle" src="/images/boy.png" style={{ maxWidth: '120px' }} />

                                <h5 className="m-0 text-default align-items-center">{distributor.company_name}</h5>
                                <span>{distributor.company_email}</span><br />
                                <span>{distributor.company_phone}</span><br />
                                <span>{distributor.company_address}</span>
                            </div>
                            <div className="card-footer"></div>
                        </div>
                    </div >
                </div>
            }
        </>
    )
}