import React, { useEffect, useState, useContext } from "react";
import * as Requests from "../../methods/Requests";
import GenericMethodContext from "../../context/GenericMethodContext";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";

export default function activateid() {
    //const router = useRouter();
    //const { activateid } = router.query;
    const [activated, setActivated] = useState("");
    const [details, setDetails] = useState([]);
    const url = window.location.href.split('/').pop();

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

    return (
        <div id="form-section" className="container-fluid signin">
            <div className="website-logo">
                <a href="http://brandio.io/envato/hostify/html/index.html">
                    <div className="logo" style={{ width: "62px", height: "18px" }}></div>
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
                    {activated == "0" && (
                        <>
                            <div className="signin-signup-form">
                                <div className="form-items">
                                    <div className="form-title" style={{ color: "#f30" }}>
                                        Invalid Activation Link
                                    </div>
                                    <div className="form-title_small">
                                        Signup as a distributor
                                    </div>
                                    {returnMsgFromContext != "" && (
                                        <div className="alert alert-danger">
                                            {returnMsgFromContext}
                                        </div>
                                    )}
                                    <form
                                        id="signupform"
                                        method="post"
                                        onSubmit={() => {
                                            newFormSubmit("signup");
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

                                        <div className="form-button">
                                            <button
                                                id="submit"
                                                type="submit"
                                                className="ybtn ybtn-accent-color"
                                            >
                                                Sign up
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    )}

                    {activated == "1" && (
                        <div className="signin-signup-form">
                            <div className="form-items">
                                <div className="form-title" style={{ textAlign: "center" }}>
                                    Welcome on Board. {details.company_name}
                                    <h5>Please set your account password.</h5>
                                </div>
                                {returnMsgFromContext != "" ? (
                                    <>
                                        <div className="alert alert-success">
                                            {returnMsgFromContext}
                                        </div>
                                        <a href="../signin" className="btn btn-success">
                                            Login
                                        </a>
                                    </>
                                ) : (
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
                                            <ul style={{ listStyle: "none" }}>
                                                <li>
                                                    Valid Length(8):{" "}
                                                    {validLength ? <span>True</span> : <span>False</span>}
                                                </li>
                                                <li>
                                                    Has a Number:{" "}
                                                    {hasNumber ? <span>True</span> : <span>False</span>}
                                                </li>
                                                <li>
                                                    UpperCase:{" "}
                                                    {upperCase ? <span>True</span> : <span>False</span>}
                                                </li>
                                                <li>
                                                    LowerCase:{" "}
                                                    {lowerCase ? <span>True</span> : <span>False</span>}
                                                </li>
                                                <li>
                                                    Match:{" "}
                                                    {match ? <span>True</span> : <span>False</span>}
                                                </li>
                                                <li>
                                                    Special Character:{" "}
                                                    {specialChar ? <span>True</span> : <span>False</span>}
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
