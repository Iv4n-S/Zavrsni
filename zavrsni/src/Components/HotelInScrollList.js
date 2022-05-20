import React from "react";
import { useNavigate } from "react-router";
import cx from "classnames";
import {LocationMarkerIcon} from "@heroicons/react/solid";

function HotelInScrollList({
    className,
    hotel,
}) {
    let navigate = useNavigate();
    const componentClassName = cx({
        "m-4 px-5 pt-5 pb-4 filter border border-2 rounded-lg bg-slate-100": true,
        [className]: className,
    });

    return (
    <div className="flex w-full">
        <div className={componentClassName} onClick={() => navigate("/hotelpage", {state : { hotel: hotel, selectedDates: null }}) }>
            <img className="h-48 w-48" src={hotel.image[0].original} />
            <div className="h-28">
                <div className="py-2">
                    {hotel.hotelname}
                </div>
                <div className="flex h-16 items-center justify-center">
                    <div className="w-6">{<LocationMarkerIcon className="w-6"/>}</div> 
                    <div>{hotel.location}</div>
                </div>  
            </div>
        </div>
    </div>
    );
}

export default HotelInScrollList;
