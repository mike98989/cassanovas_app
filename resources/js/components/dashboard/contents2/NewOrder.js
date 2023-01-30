import { update } from 'lodash';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import GenericMethodContext from "../../../context/GenericMethodContext";
import * as Requests from "../../../methods/Requests";
import * as Constants from "../../../utils/Constants";

export default function NewOrder(props) {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [flavours, setFlavours] = useState([]);
    const [selectedFlavours, setSelectedFlavours] = useState([]);
    const [selectedFlavoursId, setSelectedFlavoursId] = useState([]);
    const [selectedFlavoursQuantity, setSelectedFlavoursQuantity] = useState([]);

    let {
        returnMsgFromContext,
        returnStatusFromContext,
    } = useContext(GenericMethodContext);


    const update_price = (flavour) => {
        let key = flavour.id
        let qty = document.getElementById('qty_' + key).value;
        //flavour.selected_quantity = qty;

        if (qty > 0) {
            //let new_price = carton_price * qty;
            //document.getElementById('price_' + key).innerText = "N" + new_price;

            if (!selectedFlavoursId.includes(key)) {
                setSelectedFlavours(selectedFlavours => [...selectedFlavours, flavour]);
                setSelectedFlavoursId(selectedFlavoursId => [...selectedFlavoursId, key]);
                setSelectedFlavoursQuantity(selectedFlavoursQuantity => [...selectedFlavoursQuantity, qty]);
            } else {
                const qty_index = selectedFlavoursId.indexOf(key);
                selectedFlavoursQuantity[qty_index] = qty;
                console.log("Qty", selectedFlavoursQuantity);
                setSelectedFlavoursQuantity(selectedFlavoursQuantity => [...selectedFlavoursQuantity]);
            }


        } else if (isNaN(qty)) {
            document.getElementById('price_' + key).innerText = "N" + carton_price;
            document.getElementById('qty_' + key).value = '0';
        } else if (qty == 0) {
            const qty_index = selectedFlavoursId.indexOf(key);
            selectedFlavoursQuantity.splice(qty_index, 1);
            console.log("Qty", selectedFlavoursQuantity);
            setSelectedFlavoursQuantity(selectedFlavoursQuantity => [...selectedFlavoursQuantity]);
            //console.log("Qty_1", selectedFlavoursQuantity);
            setSelectedFlavours(selectedFlavours.filter(item => item.flavour !== flavour.flavour));
            setSelectedFlavoursId(selectedFlavoursId.filter(item => item !== key));
            //setSelectedFlavoursQuantity(selectedFlavoursQuantity);
        }


    }

    const makeOrder = (price, email, flavour_object, quantity_array) => {
        if (quantity_array.length > 0) {
            event.preventDefault();
            const formData = new FormData();
            flavour_object.map((flavour, i) => {
                flavour.selected_quantity = quantity_array[i];
            })

            formData.append('flavours', JSON.stringify(flavour_object));
            formData.append('price', price);
            formData.append('qty_array', quantity_array);
            //formData.append('flavour_object', flavour_object);
            Requests.fetchAuthApi("save_order", "POST", formData).then((data) => {

                { data.data.status == '1' && props.payWithPaystack(price, email, data.data.order_id) }

                // props.payWithPaystack(flavour.carton_price, user.company_email, flavour.id, document.getElementById('qty_' + flavour.id).value)

            });
        } else {
            alert("Please enter quantity")
        }
        return;
    }

    React.useEffect(() => {
        isAuthenticated &&
            Requests.fetchAuthApi("get_all_flavours", "GET", {}).then((data) => {
                data && data.data.response && setFlavours(data.data.response);
                //setFlavours(data.data.response);
                //console.log(flavours);
            });
    }, [isAuthenticated]);



    return (
        <>
            <div className='row'>
                <div className='col-lg-11'>
                    {flavours.length != 0 &&
                        <div className="card" >
                            <div className='row' style={{ color: '#000' }}>
                                <div className='col-lg-8'>
                                    <div className='card-body'>
                                        <div style={{ dislay: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                            <h5 style={{ float: 'left' }} className="h5 mb-10 text-gray-800">Select Products</h5>
                                            <span style={{ float: 'right', fontSize: '9px' }}>{flavours.length} Items</span>
                                        </div>

                                        <table className='table' style={{ fontSize: '11px', }}>
                                            {!returnStatusFromContext &&
                                                flavours.map((flavour, i) => {
                                                    return (
                                                        <tbody key={i}>
                                                            <tr >
                                                                <td><img src={Constants.BASE_URL + '/storage/flavour/' + flavour.image} style={{ width: '90px' }} alt="" /></td>
                                                                <td style={{ paddingTop: '30px' }}><b>{flavour.flavour.toUpperCase()}</b><br />
                                                                    {flavour.description}</td>
                                                                <td style={{ paddingTop: '30px' }}><div className="form-text" style={{ marginBottom: '20px' }}>
                                                                    <input type="number" className='form-control' min="0" id={'qty_' + flavour.id} placeholder="0" style={{ width: '70px', borderRadius: '5px' }} defaultValue="0" onChange={() => update_price(flavour)} />
                                                                </div>
                                                                </td>
                                                                <td style={{ paddingTop: '50px' }}><b id={'price_' + flavour.id}>N{flavour.carton_price}</b>/Carton</td>
                                                            </tr>

                                                        </tbody>
                                                    )
                                                })

                                            }
                                        </table>
                                    </div>
                                </div>

                                <div className='col-lg-4 container_cart_summary' style={{ backgroundColor: '#cfd3d5' }}>
                                    <div className='' >
                                        <h5 style={{ float: 'left', marginTop: '20px' }} className="h5 mb-10 text-gray-800 mt-20">Summary</h5>
                                        <table className="table border-none" style={{ fontSize: '12px', border: 0 }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ paddingTop: '30px', fontWeight: 'bold', color: '#000' }}>ITEMS(S) {selectedFlavours.length} </td>
                                                    <td style={{ paddingTop: '30px' }}></td>
                                                </tr>
                                                {selectedFlavours.map((selected, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{selected.flavour.toUpperCase()}</td>
                                                            <td>{selectedFlavoursQuantity[i]}</td>
                                                        </tr>
                                                    )
                                                })}
                                                <tr>
                                                    <td colSpan="2" style={{ paddingTop: '50px', fontWeight: 'bold', fontSize: '12px' }}>TOTAL: N{selectedFlavours.reduce((accumulator, object, currentIndex) =>
                                                        ((accumulator * 1) + (object.carton_price * 1 * selectedFlavoursQuantity[currentIndex]))
                                                        , 0)}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                        <button className="btn btn-success btn-block btn-checkout " onClick={() => {
                                            makeOrder(selectedFlavours.reduce((accumulator, object, currentIndex) =>
                                                ((accumulator * 1) + (object.carton_price * 1 * selectedFlavoursQuantity[currentIndex]))
                                                , 0), user.company_email, selectedFlavours, selectedFlavoursQuantity)
                                        }}>CHECKOUT</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                {returnStatusFromContext &&
                    <>
                        <div className="col-md-5" style={{ margin: '0 auto', float: 'none' }}>
                            <div className="card">
                                <div className='card-body'>
                                    <div className="info-box" style={{ textAlign: 'center' }}>
                                        <img src='/images/ok.png' style={{ 'width': '40px' }} />
                                        <div className="info-title">Your payment was successful. Your orders are being processed.</div>

                                        <div className="info-details">
                                            <img src='/images/Packs_and_Cartons_png.png' style={{ 'width': '200px', marginTop: '20px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                }
            </div>
        </>
    )
}