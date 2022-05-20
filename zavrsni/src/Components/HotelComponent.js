import React from "react";
import { useNavigate } from "react-router";
import Card from "./Card";
import ReactStars from "react-rating-stars-component";
import TextTruncate from "react-text-truncate";
import { LocationMarkerIcon } from "@heroicons/react/solid";

function HotelComponent(props) {
    const hotel = props.hotel;
    let navigate = useNavigate();

    return (
        <Card className="md:w-2/3 w-auto m-2">
            <div className="flex flex-row" onClick={() => navigate("/hotelpage", {state : { hotel: hotel, selectedDates: props.selectedDates }}) }>
                <div className="w-1/3">
                    <img className="h-48 w-48 rounded-lg" src={hotel.image.image[0].original} />
                </div>
                <div className="flex flex-col justify-between w-2/3 p-2">
                    <div className="flex flex-row justify-between">
                        <p className="text-lg">{hotel.hotelname}</p>
                        <ReactStars
                            count={5}
                            value={hotel.stars}
                            activeColor="#ffd700"
                            edit={false}
                        />
                    </div>
                    <div>
                    <TextTruncate
                        line={3}
                        element="span"
                        truncateText="…"
                        text={hotel.hotelroomdesc}
                        className="text-sm flex text-left"
                    />
                    </div>
                    <div className="flex justify-end">
                        <div className="w-6">{<LocationMarkerIcon className="w-6"/>}</div> 
                        <div>{hotel.location}</div>
                    </div>
                </div>
            </div>
         </Card>
      );
}

export default HotelComponent;