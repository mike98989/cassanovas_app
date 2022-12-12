import React, { useEffect, useState, useContext } from "react";
import GenericMethodContext from "../../context/GenericMethodContext";
import * as Requests from "../../methods/Requests";
import * as constants from "../../utils/Constants";

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
                                Taste tests around the world show extremely high consumer acceptance levels
                            </p>
                        </div>
                    </div>

                </div>
                <div className="col-lg-7" style={{ textAlign: 'center' }}>
                    <div className="menu-holder">
                        <ul className="main-links">
                            <li className="normal-link">
                                I already have  an account?
                                <a className="sign-button" href={constants.BASE_URL + "/signin"}>
                                    Sign In
                                </a>
                            </li>

                        </ul>
                    </div>
                    <div className="col-lg-10 float_height" style={{ float: 'none', margin: '0 auto' }}>
                        <div className="signin-signup-form" style={{ margin: '0 auto', float: 'none', alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
                            {returnStatusFromContext != "1" && (
                                <div className="form-items">
                                    <div className="form-title">Sign up as a Distributor</div>
                                    {returnStatusFromContext}
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
                                                style={{ height: '45px', border: '1px solid #afe5f5' }}
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
                            )}

                            {returnStatusFromContext == "1" && (

                                <div className="form-items">
                                    <div className="form-title" style={{ textAlign: "center" }}>
                                        Welcome on Board. {company_name}
                                        <h5>
                                            Please click on the activation link sent to your email.
                                        </h5>
                                    </div>
                                    <span className="normal-link" style={{ marginTop: '15px' }}>I did not receive any activatio link</span>
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

                            )}
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
