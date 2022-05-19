import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelDateSelectionForm from "../Components/HotelDateSelectionForm";
import { NETWORK_CONFIG , API_CONFIG } from "../AppData/Constants";

function HotelPage(props) {
    const location = useLocation();
    let navigate = useNavigate()
    const [hotel, setHotel] = React.useState(location.state.hotel);
    const [selectedDates, setSelectedDates] = React.useState(location.state.selectedDates);
    const [hotelRooms, setHotelRooms] = React.useState([]);


    React.useEffect(() => { 
        if(selectedDates != null) {
            console.log("datesSelected");
            const body = `{
                "IdHotel": ${hotel.idHotel},
                "SelectedDates": [${selectedDates}]
            }`;

            const options = {
                method: "POST",
                body: body,
                headers: { "Content-Type": "application/json" },
            };
        
            fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.getHotel, options)
                .then((response) => {
                    if(!response.ok) {
                        navigate("/");
                    }
                    else {
                        response.json().then((value) => {
                            setHotelRooms(value);
                        })
                    }})
                .catch(() => navigate("/"));
        }
    }, [])

    const GetHotelRooms = (selectedDates) => {
        const body = `{
            "IdHotel": ${hotel.idHotel},
            "SelectedDates": [${selectedDates}]
        }`;

        const options = {
            method: "POST",
            body: body,
            headers: { "Content-Type": "application/json" },
        };
    
        fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.getHotel, options)
            .then((response) => {
                if(!response.ok) {
                    navigate("/");
                }
                else {
                    response.json().then((value) => {
                        setHotelRooms(value);
                        console.log(value);
                        console.log(hotelRooms);
                    })
                }})
            .catch(() => navigate("/"));
    };

    return (
        <div>
            {selectedDates == null ? (
                <HotelDateSelectionForm setSelectedDates={setSelectedDates} GetHotelRooms={GetHotelRooms} />
            ) : (
                <div>
                    <p>{hotel.idHotel}</p>
                    <p>{hotel.hotelname}</p>
                    <p>{selectedDates}</p>
                    <div>
                    </div>
                    {hotelRooms.map((hotel, index) => (
                        <div key={index}>
                            <p>{hotel.idhotelroom}</p>
                        </div>
                    ))}
                    
                </div>
            )}
        </div>
    );
}

export default HotelPage;