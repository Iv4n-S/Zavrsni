import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../Components/Card";
import HotelSearchForm from "../Components/HotelSearchForm";


function Hotels(props) {
    let navigate = useNavigate();

    const [selectedDates, setSelectedDates] = React.useState();
    const [filteredHotels, setFilteredHotels] = React.useState();

    return(
        <div className="flex flex-col justify-center">
            <div>
                <HotelSearchForm setSelectedDates={setSelectedDates} setFilteredHotels={setFilteredHotels} className="absolute"/>
            </div>
            <div className="relative">
                {filteredHotels == undefined ? (<></>) : (
                <Card>
                    {filteredHotels.map((hotel, i) => (
                        <div onClick={() => navigate("/hotelpage", {state : { hotel: hotel, selectedDates: selectedDates}}) } key={i}>
                            <img className="h-48 w-48" src={hotel.image.image[0].original} />
                            <p>{hotel.hotelname}</p>
                            <p>{hotel.location}</p>
                        </div>
                    )
                    )}
                </Card>
                )}
            </div>
        </div>
    );
}

export default Hotels;
