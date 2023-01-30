import React, { useContext, useState } from 'react';
import GenericMethodContext from "../../../../context/GenericMethodContext";
import AuthContext from "../../../../context/AuthContext";

export default function NewFlavour() {

    let {
        returnMsgFromContext,
        returnStatusFromContext,
        isLoading,
        newFormSubmit,
    } = useContext(GenericMethodContext);

    return (
        <div className="row">
            <div className="col-lg-6">
                <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">New Flavour</h6>
                    </div>
                    <div className="card-body">
                        {returnMsgFromContext != "" && !isLoading && (
                            <div className="alert alert-primary">
                                {returnMsgFromContext}
                            </div>
                        )}

                        <form onSubmit={() => newFormSubmit('create_flavour')}>
                            <div className="form-group">
                                <label>Flavour Name</label>
                                <input type="text" className="form-control"
                                    placeholder="Flavour Name" name='flavour' />
                            </div>
                            <div className="form-group">
                                <label>Flavour Description</label>
                                <textarea className='form-control' name='description' rows='3' />
                            </div>
                            <div className="form-group">
                                <label>Carton/Pack Price</label>
                                <input type="number" min="0" className="form-control"
                                    placeholder="Pack Price" name='carton_price' />
                            </div>

                            <div className="form-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" name='image_file' />
                                    <label className="custom-file-label">Choose file</label>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">
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