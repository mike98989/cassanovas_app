import React, { useEffect, useState, useContext } from "react";
import GenericMethodContext from "../../context/GenericMethodContext";
import * as Requests from "../../methods/Requests";
import * as constants from "../../utils/Constants";

export default function SignIn() {
    const [company_name, setCompanyName] = useState("");
    const [company_email, setCompanyEmail] = useState("");

    let {
        newFormSubmit,
        isLoading,
        returnMsgFromContext,
        returnStatusFromContext,
    } = useContext(GenericMethodContext);


    return (
        <>
            <div className="row">
                <div className="col-lg-5 side_div_bg1 d-none d-lg-block">
                    <img src="/images/logo_white.png" style={{ width: '138px' }} />
                    <div className="bold-title">
                        it’s not that hard to get
                        <br />your packs
                        <span> anymore.</span>
                    </div>

                    <img
                        className="photo"
                        src="/images/Packs_and_Cartons_png.png"
                        alt=""
                        style={{ width: '300px' }}
                    />

                    <div className="mini-testimonials-slider">
                        <div className="details-holder">
                            <p>
                                From field to shelf, all ingredients and raw materials are 100% Nigerian. More than half the world’s supply of cassava is grown in Nigeria.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7" style={{ textAlign: 'center' }}>
                    <div className="menu-holder">
                        <ul className="main-links">
                            <li className="normal-link">
                                Don't have an account?
                                <a className="sign-button" href={constants.BASE_URL + "/signup"}>
                                    Sign up
                                </a>
                            </li>

                        </ul>
                    </div>
                    <div className="col-lg-10 float_height" style={{ float: 'none', margin: '0 auto' }}>
                        <div className="signin-signup-form" style={{ margin: '0 auto', float: 'none', alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <div className="form-items">
                                <div className="form-title">Sign in to your account</div>
                                {returnMsgFromContext != "" && !isLoading && (
                                    <div className="alert alert-danger">
                                        {returnMsgFromContext}
                                    </div>
                                )}
                                <form
                                    id="signupform"
                                    method="post"
                                    onSubmit={(e) => {
                                        newFormSubmit("login");
                                    }}
                                >
                                    <div className="form-text">
                                        <input
                                            type="text"
                                            name="company_email"
                                            placeholder="E-mail Address"
                                            required
                                        />
                                    </div>
                                    <div className="form-text">
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="********"
                                            required
                                        />
                                    </div>

                                    <div className="form-button">
                                        <button
                                            id="submit"
                                            type="submit"
                                            className="ybtn ybtn-accent-color"
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
        </>
    )
}
