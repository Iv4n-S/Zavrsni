import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelDateSelectionForm from "../Components/HotelDateSelectionForm";
import { NETWORK_CONFIG , API_CONFIG } from "../AppData/Constants";
import ImageGallery from "../Components/ImageGallery";
import Card from "../Components/Card";
import ReactStars from "react-rating-stars-component";

function HotelPage(props) {
    const location = useLocation();
    let navigate = useNavigate()
    const [hotel, setHotel] = React.useState(location.state.hotel);
    const [selectedDates, setSelectedDates] = React.useState(location.state.selectedDates);
    const [hotelRooms, setHotelRooms] = React.useState([]);


    React.useEffect(() => { 
        if(selectedDates != null) {
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
                <div className="flex justify-center">
                    <Card className="md:w-2/3 w-auto">
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-col justify-center mb-8">
                                <p className="text-xxxl text-slate-400 mb-2">{hotel.hotelname}</p>
                                <div className="flex justify-center">
                                    <ReactStars
                                        count={hotel.stars}
                                        value={hotel.stars}
                                        activeColor="#ffd700"
                                        edit={false}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="md:w-3/4 w-auto border-2 rounded flex justify-center py-8">
                                    <ImageGallery images={hotel.image} />
                                </div>
                            </div>
                            <p>{selectedDates}</p>
                            <div>
                                
                            </div>
                            {hotelRooms.map((hotel, index) => (
                                <div key={index}>
                                    <p>{hotel.idhotelroom}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default HotelPage;