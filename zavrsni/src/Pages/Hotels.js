import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../Components/Card";
import HotelSearchForm from "../Components/HotelSearchForm";
import HotelsList from "../Components/HotelsList";


function Hotels(props) {
    let navigate = useNavigate();

    const [selectedDates, setSelectedDates] = React.useState();
    const [filteredHotels, setFilteredHotels] = React.useState();

    return(
        <div className="flex flex-col justify-center">
            <div>
                <HotelSearchForm setSelectedDates={setSelectedDates} setFilteredHotels={setFilteredHotels} className="absolute"/>
            </div>
            <div className="flex justify-center">
                {filteredHotels == undefined ? (<></>) : (
                <Card className="md:w-2/3 w-auto">
                    <HotelsList hotels={filteredHotels} selectedDates={selectedDates} />
                </Card>
                )}
            </div>
        </div>
    );
}

export default Hotels;
