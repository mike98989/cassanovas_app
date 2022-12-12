import React, { useContext, useState } from 'react';
import GenericMethodContext from "../../../context/GenericMethodContext";
import AuthContext from "../../../context/AuthContext";
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import ReactDOM from 'react-dom';

export default function NewTicket() {


    const { isAuthenticated, user } = useContext(AuthContext);
    let {
        returnMsgFromContext,
        returnStatusFromContext,
        isLoading,
        newFormSubmitWithAuth,
    } = useContext(GenericMethodContext);

    return (
        <div className="row">
            <div className="col-lg-9">

                <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-default">Create Support Ticket</h6>
                    </div>
                    <div className="card-body">
                        {returnMsgFromContext != "" && !isLoading && (
                            <div className="alert alert-primary">
                                {returnMsgFromContext}
                            </div>
                        )}

                        <form onSubmit={() => newFormSubmitWithAuth('create_support_ticket')}>
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="subject" placeholder="Enter Subject" />
                            </div>
                            <div id="editor">
                            </div>
                            <label>Message</label>
                            <FroalaEditor tag='textarea' />
                            <div className="form-group">


                                <textarea className='form-control' rows="4" name="message" style={{ display: 'none' }} />
                            </div>
                            <button type="submit" className="btn btn-info">
                                {isLoading && (
                                    <div
                                        className="spinner-border text-light"
                                        style={{ marginRight: "5px" }}
                                        role="status"
                                    >
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}
                                Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}