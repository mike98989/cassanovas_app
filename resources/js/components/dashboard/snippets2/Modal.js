import React, { useContext } from 'react';
import GenericMethodContext from "../../../context/GenericMethodContext";

export default function Modal() {
    let {
        signOut,
    } = useContext(GenericMethodContext);
    return (
        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabelLogout"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabelLogout">Ohh No!</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to logout?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
                        <a href="#" onClick={signOut} className="btn btn-danger">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    )
}