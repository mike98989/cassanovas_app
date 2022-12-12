import React from 'react'
export default function Header(props) {
    return (
        <div id="page-head" className="container-fluid inner-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <div className="page-title">{props.header_title}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}