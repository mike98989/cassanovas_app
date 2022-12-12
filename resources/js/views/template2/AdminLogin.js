import React, { useEffect, useState, useContext } from "react";
import GenericMethodContext from "../../context/GenericMethodContext";

export default function AdminLogin() {
    let {
        newFormSubmit,
        isLoading,
        returnMsgFromContext,
        returnStatusFromContext,
    } = useContext(GenericMethodContext);
    return (
        <div className="container-login">
            <div className="row justify-content-center">
                <div className="col-xl-4 col-lg-12 col-md-9">
                    <div className="card shadow-sm my-5">
                        <div className="card-body p-0 bg-grey">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="login-form">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Admin Login</h1>
                                        </div>
                                        {returnMsgFromContext != "" && !isLoading && (
                                            <div className="alert alert-danger">
                                                {returnMsgFromContext}
                                            </div>
                                        )}
                                        <form className="user" method='post' onSubmit={(e) => {
                                            newFormSubmit("adminlogin");
                                        }}>
                                            <div className="form-group">
                                                <input type="email" name="email" className="form-control"
                                                    required="required"
                                                    placeholder="Enter Email Address" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" name="password" className="form-control" required="required"
                                                    placeholder="Password" />
                                            </div>

                                            <div className="form-group">
                                                <button
                                                    id="submit"
                                                    type="submit"
                                                    className="btn btn-primary btn-block"
                                                >
                                                    {isLoading && (
                                                        <div
                                                            className="spinner-border text-light"
                                                            style={{ marginRight: "5px" }}
                                                            role="status"
                                                        >
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    )}
                                                    Sign in
                                                </button>

                                            </div>

                                        </form>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}