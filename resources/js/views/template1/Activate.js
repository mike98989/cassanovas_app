import React, { useEffect, useState, useContext } from "react";
import GenericMethodContext from "../../context/GenericMethodContext";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import * as Requests from "../../methods/Requests";
import * as constants from "../../utils/Constants";

export default function Activate() {
    //const router = useRouter();
    //const { activateid } = router.query;
    const [activated, setActivated] = useState("");
    const [details, setDetails] = useState([]);
    const url = window.location.href.split('/').pop();
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

    const [password, setPassword] = useState({
        firstPassword: "",
        secondPassword: "",
    });

    const [validLength, hasNumber, upperCase, lowerCase, match, specialChar] =
        usePasswordValidation({
            firstPassword: password.firstPassword,
            secondPassword: password.secondPassword,
        });

    const setFirst = (event) => {
        setPassword({ ...password, firstPassword: event.target.value });
    };
    const setSecond = (event) => {
        setPassword({ ...password, secondPassword: event.target.value });
    };

    React.useEffect(() => {
        url &&
            Requests.fetchApi(
                "activate?id=" + url,
                "GET",
                {}
            ).then((data) => {
                setActivated(data.data.status);
                setDetails(data.data.details[0]);
            });
    }, [url]);

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
                                “In hostify we trust. I am with them for over 7 years now.
                                It always felt like home! Loved their customer support”
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
                            {activated == "0" && (
                                <>
                                    {returnStatusFromContext != "1" && (
                                        <div className="form-items">
                                            <div className="form-title" style={{ color: "#f30" }}>
                                                Invalid Activation Link!
                                            </div>

                                            <div className="form-title">Please Sign up as a Distributor</div>
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
                                </>



                            )}

                            {activated == "1" && (

                                <div className="form-items">
                                    <div className="form-title" style={{ textAlign: "center" }}>
                                        {returnStatusFromContext} Welcome on Board. {details.company_name}
                                        <h5>Please set your account password.</h5>
                                    </div>
                                    {returnMsgFromContext != "" && (
                                        <>
                                            <div className="alert alert-success">
                                                {returnMsgFromContext}
                                            </div>

                                            {returnStatusFromContext == '1' && (
                                                <a href="singin" className="btn btn-sm btn-success">Siginin</a>
                                            )}
                                        </>
                                    )}
                                    {returnStatusFromContext != '1' && (
                                        <>
                                            <form
                                                id="update_password_form"
                                                method="post"
                                                onSubmit={() => {
                                                    newFormSubmit("update_password_status");
                                                }}
                                            >
                                                <div className="form-text">
                                                    <input
                                                        onChange={setFirst}
                                                        type="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-text">
                                                    <input
                                                        type="password"
                                                        onChange={setSecond}
                                                        name="password_confirmation"
                                                        placeholder="Confirm Password"
                                                        required
                                                    />
                                                </div>
                                                <input
                                                    type="hidden"
                                                    name="_rand"
                                                    defaultValue={details.rand}
                                                />
                                                <div className="form-button">
                                                    <button
                                                        id="submit"
                                                        type="submit"
                                                        disabled={
                                                            validLength &&
                                                                hasNumber &&
                                                                upperCase &&
                                                                lowerCase &&
                                                                match &&
                                                                specialChar
                                                                ? false
                                                                : true
                                                        }
                                                        className="ybtn ybtn-accent-color"
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </form>

                                            <div style={{ textAlign: "left" }}>
                                                <ul className="normal-link" style={{ listStyle: "none", paddingLeft: '0', lineHeight: '2' }}>
                                                    <li>
                                                        Valid Length(8):{" "}
                                                        {validLength ? <span><i className="color_ok fa fa-check"></i></span> : <span> <i className="color_bad fa fa-times"></i></span>}
                                                    </li>
                                                    <li>
                                                        Has a Number:{" "}
                                                        {hasNumber ? <span><i className="color_ok fa fa-check"></i></span> : <span> <i className="color_bad fa fa-times"></i></span>}
                                                    </li>
                                                    <li>
                                                        UpperCase:{" "}
                                                        {upperCase ? <span><i className="color_ok fa fa-check"></i></span> : <span> <i className="color_bad fa fa-times"></i></span>}
                                                    </li>
                                                    <li>
                                                        LowerCase:{" "}
                                                        {lowerCase ? <span><i className="color_ok fa fa-check"></i></span> : <span> <i className="color_bad fa fa-times"></i></span>}
                                                    </li>
                                                    <li>
                                                        Match:{" "}
                                                        {match ? <span><i className="color_ok fa fa-check"></i></span> : <span> <i className="color_bad fa fa-times"></i></span>}
                                                    </li>
                                                    <li>
                                                        Special Character:{" "}
                                                        {specialChar ? <span><i className="color_ok fa fa-check"></i></span> : <span> <i className="color_bad fa fa-times"></i></span>}
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
