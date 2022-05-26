import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../Components/Card";
import TransportSearchForm from "../Components/TransportSearchForm";


function Transport(props) {
    let navigate = useNavigate();
    const [filteredTransports, setFilteredTransports] = React.useState();
    const [selectedDate, setSelectedDate] = React.useState();


    return(
        <div className="flex flex-col justify-center">
            <div className="z-50">
                <TransportSearchForm setFilteredTransports={setFilteredTransports} setSelectedDate={setSelectedDate} />
            </div>
        </div>
    );
}

export default Transport;
