import React from "react";

function HotelsList(props) {
    const hotels = props.hotels;
    return (
        <>
            <p className="text-lg py-5 text-slate-500 pt-16">Hotels in {props.location}</p>
            <div className="flex flex-col justify-center items-center w-full">
                {hotels.map((hotel, index) => (
                    <HotelComponent hotel={hotel}/>
                ))}
            </div>
        </>
      );
}

export default HotelsList;