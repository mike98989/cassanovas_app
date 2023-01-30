import React from 'react';
import * as constants from '../../../utils/Constants'

export default function Header() {
    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between">
                <h4 className="h4 text-gray-500" style={{ marginTop: '20px' }}>{constants.APP_NAME} Dashboard</h4>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href={constants.BASE_URL + '/dashboard/home'} style={{ color: '#615f5f' }}>Home</a></li>
                    {/* <li className="breadcrumb-item">Pages</li> */}
                    {/* <li className="breadcrumb-item active" aria-current="page">Blank Page</li> */}
                </ol>
            </div>
            <div className="" style={{ marginBottom: '30px', fontSize: '12px' }}>
                {constants.APP_DESC}
            </div>
        </>
    )
}