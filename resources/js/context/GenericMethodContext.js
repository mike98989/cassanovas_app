import React from "react";
import { useState, useEffect } from "react";
import * as Requests from "../methods/Requests";
//import { useCookies } from "react-cookie";
import * as constants from "../utils/Constants";
import { Routes, Route, useNavigate } from 'react-router-dom';
import queryString from 'query-string'

const GenericMethodContext = React.createContext({});
//export const DashboardMethodProvider = DashboardMethodContext.Provider
export default GenericMethodContext;
export const GenericMethodProvider = ({ children }) => {
  let [loading, setLoading] = useState(false);
  const [return_msg_from_context, setReturnMsgFromContext] = useState("");
  const [return_status_from_context, setReturnStatusFromContext] = useState();
  //const [cookies, setCookie] = useCookies(["user"]);

  let contextData = {
    isLoading: loading,
    newFormSubmit: new_form_submit,
    newFormSubmitWithAuth: new_form_submit_with_auth,
    returnMsgFromContext: return_msg_from_context,
    returnStatusFromContext: return_status_from_context,
    signOut: signout,
    payStackPayment: pay_stack_payment,
    disableEnable: disable_enable
  };

  function pay_stack_payment(amount, email_address, flavour_id, qty, order_id) {
    let quantity = qty * 1;
    //alert(quantity); return;
    if (quantity > 0) {
      let handler = PaystackPop.setup({

        key: constants.PAYSTACK_PK_KEY, // Replace with your public key

        email: email_address,

        amount: amount * 100,
        metadata: { 'order_id': order_id, 'email': email_address, 'flavour_id': flavour_id },
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you

        // label: "Optional string that replaces customer email"

        onClose: function () {

          alert('Window closed.');

        },

        callback: function (response) {
          console.log(response);
          response.status == "success" &&
            window.location.replace(constants.BASE_URL + '/dashboard/order/confirm?reference=' + response.reference);
          return;

        }

      });


      handler.openIframe();

    } else {
      alert("Invalid Input. Please input a quantity");
    }
  }

  function new_form_submit(action_url) {
    //var event = Event;
    setLoading(true);
    alert(loading + " loading state");
    event.preventDefault();
    const formData = new FormData(event.target);
    Requests.fetchApi(action_url, "POST", formData).then((data) => {
      {
        if (action_url == "login" && data.status == 200) {
          //console.log("dataValue", data.data.data);
          ///return;
          if (data.data.success == true) {
            localStorage.setItem("authTokens", JSON.stringify(data.data.token));
            localStorage.setItem("user_data", JSON.stringify(data.data.data));
            window.location.href = constants.BASE_URL + "/dashboard/home";
          }
        }
        else if (action_url == "adminlogin" && data.status == 200) {
          //console.log("dataValue", data.data.data);
          ///return;
          if (data.data.success == true) {
            localStorage.setItem("authTokens", JSON.stringify(data.data.token));
            localStorage.setItem("admin_data", JSON.stringify(data.data.data));
            window.location.href = constants.BASE_URL + "/admindashboard/home";
          }
        }
        else {
          data.status == 200
            ? (setReturnMsgFromContext(data.data.message),
              setReturnStatusFromContext(data.data.status))
            : (setReturnMsgFromContext(data.data.message), setReturnStatusFromContext('0'));

        }


      }
      //show_toast();
      setLoading(false);
    });

    return false;
  }

  function new_form_submit_with_auth(action_url) {
    //var event = Event;
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    Requests.fetchAuthApi(action_url, "POST", formData).then((data) => {
      {
        console.log("Data is ", data);
        if (action_url == "login" && data.status == 200) {
          //console.log("dataValue", data.data.data);
          ///return;
          if (data.data.success == true) {
            localStorage.setItem("authTokens", JSON.stringify(data.data.token));
            localStorage.setItem("user_data", JSON.stringify(data.data.data));
            window.location.href = constants.BASE_URL + "/dashboard/home";
          }
        } else {
          data.status == 200
            ? (setReturnMsgFromContext(data.data.message),
              setReturnStatusFromContext(data.data.status))
            : setReturnMsgFromContext(data.data.message), setReturnStatusFromContext('0');

        }


      }
      //show_toast();
      setLoading(false);
    });

    return false;
  }

  function signout() {
    Requests.fetchAuthApi("logout", "GET", {}).then((data) => {
      //console.log(data);
      localStorage.clear();
      window.location.href = constants.BASE_URL + "/signin"
    });

  }

  function disable_enable(url) {
    Requests.fetchAuthApi(url, 'GET', {}).then(data => {
      setReturnMsgFromContext(data.data.message);
      //console.log(data);
      window.location.reload(false);
    })
  }

  return (
    <GenericMethodContext.Provider value={contextData}>
      {/* {loading ? null : children} */}
      {children}
    </GenericMethodContext.Provider>
  );
};
