import React from "react";
import img from "../../Assets/Images/error.svg"

export default function NotFound() {




    return <>
        <div className="d-flex  justify-content-center align-items-center vh-100 flex-column bg-secondary">
            <h1 className="text-white">Component Not Found</h1>
            <div className="w-50">

                <img className="w-100" src={img} alt="" />
            </div>
        </div>

    </>
}
