import React from "react";
import HotelComponent from "./HotelComponent";

function HotelsList(props) {
    const hotels = props.hotels;
    return (
        <>
            <p className="text-lg py-5 text-slate-500">Hotels in {hotels[0].location}</p>
            <div className="flex flex-col justify-center items-center w-full">
                {hotels.map((hotel, index) => (
                    <HotelComponent hotel={hotel} selectedDates={props.selectedDates} key={index}/>
                ))}
            </div>
        </>
      );
}

export default HotelsList;