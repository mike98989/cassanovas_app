import React, { useContext, useState } from 'react';
import GenericMethodContext from "../../../../context/GenericMethodContext";
import AuthContext from "../../../../context/AuthContext";


export default function NewAdmin() {

    const { isAuthenticated, user } = useContext(AuthContext);
    let {
        returnMsgFromContext,
        returnStatusFromContext,
        isLoading,
        newFormSubmitWithAuth,
    } = useContext(GenericMethodContext);

    return (
        <div className="row">
            <div className="col-lg-7">

                <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-default">New Adminstrator</h6>
                    </div>
                    <div className="card-body">
                        {returnMsgFromContext != "" && !isLoading && (
                            <div className="alert alert-primary">
                                {returnMsgFromContext}
                            </div>
                        )}

                        <form onSubmit={() => newFormSubmitWithAuth('create_admin')}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" className="form-control" name="full_name" placeholder="Enter Full Name" />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter Email Address" />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="phone" className="form-control" name="phone" placeholder="Enter Phone Number" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" placeholder="********" />
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" className="form-control" name="password_confirmation" placeholder="********" />
                            </div>


                            <button type="submit" className="btn btn-info">
                                {isLoading && (
                                    <div
                                        className="spinner-border text-light"
                                        style={{ marginRight: "5px" }}
                                        role="status"
                                    >
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}
                                Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}