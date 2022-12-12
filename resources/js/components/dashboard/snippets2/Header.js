import React from 'react';
export default function Header() {
    return (
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h4 className="h4 mb-0 text-gray-800">Dashboard</h4>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="./">Home</a></li>
                {/* <li className="breadcrumb-item">Pages</li> */}
                {/* <li className="breadcrumb-item active" aria-current="page">Blank Page</li> */}
            </ol>
        </div>
    )
}