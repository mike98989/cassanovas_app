import React, { useEffect, useState, useContext } from "react";
import GenericMethodContext from "../context/GenericMethodContext";
import * as Requests from "../methods/Requests";

export default function SignUp() {

    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const [company_name, setCompanyName] = useState("");
    const [company_email, setCompanyEmail] = useState("");
    const datetime = new Date();

    let {
        newFormSubmit,
        isLoading,
        returnMsgFromContext,
        returnStatusFromContext,
    } = useContext(GenericMethodContext);
    React.useEffect(() => {
        states.length == 0 &&
            Requests.fetchApi("get_all_states", "GET", {}).then((data) => {
                data && data.data.response && setStates(data.data.response);
            });
    }, []);

    return (
        <>
            <div id="form-section" className="container-fluid signin">
                <div className="website-logo">
                    <a href="http://brandio.io/envato/hostify/html/index.html">
                        <div
                            className="logo"
                            style={{ width: "62px", height: "18px" }}
                        ></div>
                    </a>
                </div>
                <div className="row">
                    <div className="info-slider-holder">
                        <div className="info-holder">
                            <h6>A Service you can anytime modify.</h6>
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
                                    <a className="normal-link" href="./signin">
                                        I already have an account
                                    </a>
                                </li>
                                <li>
                                    <a className="sign-button" href="./signin">
                                        Sign in
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {returnStatusFromContext != "1" && (
                            <div className="signin-signup-form">
                                <div className="form-items">
                                    <div className="form-title">Sign up as a Distributor</div>
                                    {returnMsgFromContext != "" && (
                                        <div className="alert alert-danger">
                                            {returnMsgFromContext}
                                        </div>
                                    )}
                                    <form
                                        id="signupform"
                                        method="post"
                                        onSubmit={() => {
                                            newFormSubmit("register");
                                        }}
                                    >
                                        <div className="form-text">
                                            <input
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                type="text"
                                                name="company_name"
                                                placeholder="Company Name"
                                                required
                                            />
                                        </div>
                                        <div className="form-text">
                                            <input
                                                type="text"
                                                name="company_phone"
                                                placeholder="Company Phone"
                                                required
                                            />
                                        </div>
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
                                                type="text"
                                                name="company_address"
                                                placeholder="Office Address"
                                                required
                                            />
                                        </div>
                                        <div className="form-text">
                                            <select
                                                name="state"
                                                className="form-control"
                                                onChange={(e) => setSelectedState(e.target.value)}
                                            >
                                                <option value="">--SELECT STATE--</option>
                                                {states &&
                                                    states.map((state, i) => (
                                                        <option key={i} value={state.state_id}>
                                                            {state.state}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <input
                                            defaultValue={datetime.toISOString().slice(0, 10)}
                                            name="signup_date"
                                            type="hidden"
                                        />
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
                                                Sign up
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {returnStatusFromContext == "1" && (
                            <div className="signin-signup-form">
                                <div className="form-items">
                                    <div className="form-title" style={{ textAlign: "center" }}>
                                        Welcome on Board. {company_name}
                                        <h5>
                                            Please click on the activation link sent to your email.
                                        </h5>
                                    </div>
                                    <div className="form-button">
                                        <button
                                            onClick={() =>
                                                Requests.fetchApi(
                                                    "send_mail?company_name=" +
                                                    company_name +
                                                    "&company_email=" +
                                                    company_email +
                                                    "&subject=Resend Mail&body=<html><body><h1>This is my first transactional email {{req.body.company_name}}</h1></body></html>",
                                                    "GET",
                                                    {}
                                                )
                                            }
                                            id="submit"
                                            type="submit"
                                            className="ybtn ybtn-black-color"
                                        >
                                            Resend Link
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
