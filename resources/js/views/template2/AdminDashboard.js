import React, { useEffect, useState, useContext } from "react";
import * as Requests from "../../methods/Requests";
import GenericMethodContext from "../../context/GenericMethodContext";
import AuthContext from "../../context/AuthContext";
import ModalWindow from '../../components/dashboard/snippets2/Modal';
import SideNav from '../../components/dashboard/snippets2/Admin/SideNav';
import Header from '../../components/dashboard/snippets2/Admin/Header';
import HeaderNav from '../../components/dashboard/snippets2/Admin/HeaderNav';
import Landing from '../../components/dashboard/contents2/Admin/Landing';
import Administrators from '../../components/dashboard/contents2/Admin/Admins';
import NewAdmin from '../../components/dashboard/contents2/Admin/NewAdmin';
import Distributors from '../../components/dashboard/contents2/Admin/Distributors';
import DistributorDetails from '../../components/dashboard/contents2/Admin/DistributorDetails';
import Transactions from '../../components/dashboard/contents2/Admin/Transactions';
import Flavours from '../../components/dashboard/contents2/Admin/Flavours';

// import CompletedOrder from '../components/dashboard/contents2/CompletedOrder';
import PendingOrder from '../../components/dashboard/contents2/PendingOrders';

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
                                    {complete_url[2] == 'distributors' &&
                                        (!complete_url[3]) ?
                                        < Distributors />
                                        :
                                        <DistributorDetails distributor_id={complete_url[3]} />
                                    }

                                    {complete_url[2] == 'transactions' &&
                                        (!complete_url[3]) ?
                                        < Transactions />
                                        :
                                        null
                                    }

                                    {complete_url[2] == 'administrators' &&
                                        (!complete_url[3]) ?
                                        <Administrators />
                                        :
                                        (complete_url[3] == 'new') ?
                                            <NewAdmin />
                                            :
                                            null

                                    }

                                    {complete_url[2] == 'flavours' &&
                                        (!complete_url[3]) ?
                                        <Flavours />
                                        :
                                        (complete_url[3] == 'new') ?
                                            <NewFlavour />
                                            :
                                            null

                                    }
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
