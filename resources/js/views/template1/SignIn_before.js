import React, { useEffect, useState, useContext } from "react";
import GenericMethodContext from "../../context/GenericMethodContext";
import * as Requests from "../../methods/Requests";
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
            <div id="form-section" className="container-fluid signin">
                <div className="website-logo">
                    <a href="#">
                        <div
                            className="logo"
                            style={{ width: "112px", height: "138px" }}
                        ></div>
                    </a>
                </div>
                <div className="row">
                    <div className="info-slider-holder">
                        <div className="info-holder">

                            <div className="bold-title">
                                it’s not that hard to get
                                <br />a website
                                <span>anymore.</span>
                            </div>
                            <div className="mini-testimonials-slider">
                                <div>
                                    <div className="details-holder">
                                        <img
                                            className="photo"
                                            src="http://brandio.io/envato/hostify/html/images/person1.jpg"
                                            alt=""
                                        />
                                        <h4>Chris Walker</h4>
                                        <h5>CEO & CO-Founder @HelloBrandio</h5>
                                        <p>
                                            “In hostify we trust. I am with them for over 7 years now.
                                            It always felt like home! Loved their customer support”
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="details-holder">
                                        <img
                                            className="photo"
                                            src="http://brandio.io/envato/hostify/html/images/person2.jpg"
                                            alt=""
                                        />
                                        <h4>Chris Walker</h4>
                                        <h5>CEO & CO-Founder @HelloBrandio</h5>
                                        <p>
                                            “In hostify we trust. I am with them for over 7 years now.
                                            It always felt like home! Loved their customer support”
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-holder">
                        <div className="menu-holder">
                            <ul className="main-links">
                                <li>
                                    <a className="normal-link" href="./signup">
                                        Don't have an account?
                                    </a>
                                </li>
                                <li>
                                    <a className="sign-button" href="./signup">
                                        Sign up
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="signin-signup-form">
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
