import { constant } from 'lodash';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../../../context/AuthContext";
import * as Requests from "../../../../methods/Requests";
import * as Constants from "../../../../utils/Constants";
import GenericMethodContext from "../../../../context/GenericMethodContext";

export default function Flavours() {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [flavours, setFlavours] = useState();

    let {
        returnMsgFromContext,
        returnStatusFromContext,
        isLoading,
        disableEnable,
        deleteContent
    } = useContext(GenericMethodContext);



    React.useEffect(() => {
        isAuthenticated &&
            Requests.fetchAuthApi('get_all_flavours', "GET", {}).then((data) => {
                {
                    //data && setFlavours(data.data);
                    data && data.data.response && setFlavours(data.data.response);
                    console.log(data.data.response);

                }
            })
    }, [isAuthenticated]);

    return (
        <div className="row">

            {(flavours && flavours.length == 0) &&
                <div className='col-lg-12 text-center'>
                    <div
                        className="spinner-border text-light"
                        style={{ marginTop: "15px" }}
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>

                    </div>
                </div>

            }
            <div className='container' style={{ marginBottom: '10px' }}>
                <a href={Constants.BASE_URL + '/admindashboard/flavours/new'} className='btn btn-success btn-sm'>Add Flavour +</a>
            </div>
            <div className='row'>
                {(flavours && flavours.length != 0) &&
                    flavours.map((flavour, i) => {
                        return (
                            < div key={i} className="col-xl-3 col-lg-12 mb-4" >
                                <div className="pricing-box">
                                    <div className="pricing-content" style={{ padding: '20px 10px' }}>
                                        <div className="pricing-head">
                                            <div className="pricing-title">{flavour.flavour.toUpperCase()}</div>
                                            <img src={Constants.BASE_URL + '/storage/flavour/' + flavour.image} style={{ width: '100%' }} alt="" />
                                            <div className="pricing-features">
                                                {flavour.description}
                                            </div>

                                        </div>

                                        <b>N{flavour.carton_price}</b>

                                        <div className="pricing-link" style={{ marginTop: '20px' }}>
                                            <button className="btn btn-info btn-sm" style={{ marginRight: '7px' }}>Edit</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => { deleteContent('delete_flavour?id=' + flavour.id) }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        )
                    })

                }
            </div>


        </div>
    )
}