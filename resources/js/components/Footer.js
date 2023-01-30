import React from 'react'
export default function Footer() {
    return (
        <div id="footer" className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-xs-6 col-sm-4 col-md-3">
                        <div className="address-holder">
                            <div className="phone"><i className="fas fa-phone"></i> 0813 800 4276</div>
                            <div className="email"><i className="fas fa-envelope"></i> <a href="mailto:support@cassanovas.ng">support@cassanovas.ng</a></div>
                            <div className="address">
                                <i className="fas fa-map-marker"></i>
                                <div>Block B3 Ivy Apartments,<br />
                                    Wuye,<br />
                                    Abuja, Federal Capital Territory,
                                    Nigeria.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}