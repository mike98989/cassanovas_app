import React, { useEffect, useState, useContext } from "react";
import * as Requests from "../../methods/Requests";
import GenericMethodContext from "../../context/GenericMethodContext";
import AuthContext from "../../context/AuthContext";
import ModalWindow from '../../components/dashboard/snippets2/Modal';
import SideNav from '../../components/dashboard/snippets2/SideNav';
import Header from '../../components/dashboard/snippets2/Header';
import HeaderNav from '../../components/dashboard/snippets2/HeaderNav';
import Landing from '../../components/dashboard/contents2/Landing';
import NewOrder from '../../components/dashboard/contents2/NewOrder';
import NewTicket from '../../components/dashboard/contents2/NewTicket';
import Tickets from '../../components/dashboard/contents2/Tickets';
import ConfirmOrder from '../../components/dashboard/contents2/ConfirmOrder';
import CompletedOrders from '../../components/dashboard/contents2/CompletedOrders';
import MyProfile from '../../components/dashboard/contents2/MyProfile';

// import CancelledOrder from '../../components/dashboard/contents2/CancelledOrders';

import { json } from "react-router-dom";

export default function Dashboard() {
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
                    <div id="wrapper">
                        <SideNav />
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <HeaderNav />
                                <div className="container-fluid" id="container-wrapper">
                                    <Header />
                                    {complete_url[2] == 'home' &&
                                        < Landing />
                                    }
                                    {(complete_url[2] == 'order') &&
                                        (complete_url[3] == 'new') ?
                                        <NewOrder payWithPaystack={(amount, email, order_id) => { payStackPayment(amount, email, order_id) }} />
                                        :
                                        (complete_url[3] == 'confirm') ? <ConfirmOrder />
                                            :
                                            (complete_url[3] == 'completed') ? <CompletedOrders />
                                                : (complete_url[3] == 'cancelled') ? <CancelledOrders />
                                                    : null

                                    }

                                    {(complete_url[2] == 'ticket') &&
                                        (complete_url[3] == 'new') ?
                                        <NewTicket />
                                        : (complete_url[3] == 'all') ? <Tickets />
                                            : null}

                                    {(complete_url[2] == 'profile') &&
                                        (complete_url[3] == 'me') ?
                                        <MyProfile />
                                        : (complete_url[3] == 'edit') ? <EditProfile />
                                            : null}
                                </div>
                                <ModalWindow />
                            </div>
                        </div>
                    </div>


                </>

            }
        </>

    )

}
