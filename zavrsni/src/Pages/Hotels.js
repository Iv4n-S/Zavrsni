import React from "react";
import { useNavigate } from "react-router-dom";
import { NETWORK_CONFIG, API_CONFIG } from "../AppData/Constants";
import Button from "../Components/Button";
import cx from "classnames";
import Card from "../Components/Card";
import Input from "../Components/Input";
import HotelSearchForm from "../Components/HotelSearchForm";


function Hotels(props) {

    return(
        <div>
            <HotelSearchForm />
        </div>
    );
}

export default Hotels;
