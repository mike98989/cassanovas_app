import React, { useEffect, useState, useContext } from "react";
import * as Requests from "../methods/Requests";
import GenericMethodContext from "../context/GenericMethodContext";
import AuthContext from "../context/AuthContext";
import Header from '../components/dashboard/snippets1/Header';
import HeaderNav from '../components/dashboard/snippets1/HeaderNav';
import Landing from '../components/dashboard/contents1/Landing';
import NewOrder from '../components/dashboard/contents1/NewOrder';
import ConfirmOrder from '../components/dashboard/contents1/ConfirmOrder';
import CompletedOrder from '../components/dashboard/contents1/CompletedOrder';
import PendingOrder from '../components/dashboard/contents1/PendingOrder';

import { json } from "react-router-dom";

export default function Dashboard2() {
    const [header_title, setHeaderTitle] = useState("Dashboard");
    let [complete_url, setCompleteUrl] = useState([]);

    let {
        newFormSubmit,
        isLoading,
        returnMsgFromContext,
        returnStatusFromContext,
        signOut,
        payStackPayment,
    } = useContext(GenericMethodContext);
    const { isAuthenticated, user } = useContext(AuthContext);

    React.useEffect(() => {
        let url = window.location.pathname.split('/');
        let new_url = url.filter(elm => elm)
        setCompleteUrl(url);
    }, [isAuthenticated]);

    return (

        <>
            {isAuthenticated &&
                <>
                    <div id="header-holder" className="inner-header contact-header">
                        <HeaderNav />
                        <Header header_title={header_title} />
                    </div>
                    {complete_url[2] == 'home' &&
                        < Landing />
                    }
                    {(complete_url[2] == 'order') &&
                        (complete_url[3] == 'new') ?
                        <NewOrder payWithPaystack={(amount, email, flavour_id, qty, order_id) => { payStackPayment(amount, email, flavour_id, qty, order_id) }} />
                        :
                        (complete_url[3] == 'confirm') ? <ConfirmOrder />
                            :
                            (complete_url[3] == 'completed') ? <CompletedOrder />
                                : (complete_url[3] == 'pending') ? <PendingOrder />
                                    : null

                    }
                </>

            }
        </>

    )

}
