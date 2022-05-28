import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HotelDateSelectionForm from "../Components/HotelDateSelectionForm";
import { NETWORK_CONFIG , API_CONFIG } from "../AppData/Constants";
import ImageGallery from "../Components/ImageGallery";
import Card from "../Components/Card";
import ReactStars from "react-rating-stars-component";
import { LocationMarkerIcon, UserIcon } from "@heroicons/react/solid";
import Button from "@restart/ui/esm/Button";


function HotelPage(props) {
    const location = useLocation();
    let navigate = useNavigate()
    const [hotel, setHotel] = React.useState(location.state.hotel);
    const [selectedDates, setSelectedDates] = React.useState(location.state.selectedDates);
    const [hotelRooms, setHotelRooms] = React.useState([]);
    const [selectedHotelRoom, setSelectedHotelRoom] = React.useState({hotelroomcapacity: 0});
    const [error, setError] = React.useState();


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
                    })
                }})
            .catch(() => navigate("/"));
    };

    function BookHotelRoom() {
        if(selectedHotelRoom.hotelroomcapacity == 0) {
            setError("Selecting room capacity is required!")
        }
        else {
            const body = `{
                "IdHotelRoom": ${selectedHotelRoom.idhotelroom},
                "IdHotel": ${selectedHotelRoom.idHotel},
                "SelectedDates": [${selectedDates}]
            }`;

            const options = {
                method: "POST",
                body: body,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                },
            };
        
            fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.bookHotel, options)
                .then((response) => {
                    if(!response.ok) {
                        alert("Booking failed, try again");
                        navigate("/");
                    }
                    else {
                        alert("Booking successful");
                        setError("");
                        navigate("/");
                    }})
                .catch(() => {
                    alert("Booking failed, try again");
                    navigate("/");
                });
        }

    }

    return (
        <div>
            <div className="flex justify-center">
                <Card className="md:w-2/3 w-auto">
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col justify-center items-center mb-4">
                            <p className="text-xxxl text-slate-400 mb-2">{hotel.hotelname}</p>
                            <div className="flex justify-center">
                                <ReactStars
                                    count={hotel.stars}
                                    value={hotel.stars}
                                    activeColor="#ffd700"
                                    edit={false}
                                />
                            </div>
                            <div className="flex justify-end md:w-3/4 w-auto text-gray-400">
                                <div className="w-6">{<LocationMarkerIcon className="w-6"/>}</div> 
                                <div>{hotel.location}</div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="md:w-3/4 w-auto border-2 rounded flex justify-center py-8">
                                <ImageGallery images={hotel.image} />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Card className="md:w-3/4 w-auto">
                                <p className="flex text-left">{hotel.hotelroomdesc}</p>
                            </Card>
                        </div>
                        {selectedDates == null ? (                                    
                            <HotelDateSelectionForm setSelectedDates={setSelectedDates} GetHotelRooms={GetHotelRooms} />
                        ) : (
                            <>
                        {hotelRooms == undefined ? (
                                <>
                                    <HotelDateSelectionForm setSelectedDates={setSelectedDates} GetHotelRooms={GetHotelRooms} />
                                </>) : (
                                <>
                                    <div className="z-50">
                                        <HotelDateSelectionForm setSelectedDates={setSelectedDates} GetHotelRooms={GetHotelRooms} />
                                    </div>
                                    <div className="flex justify-center">
                                        <Card className="md:w-3/4 w-auto flex justify-center">
                                            <div className="flex flex-col justify-center">
                                                <div className="mb-4">
                                                    <p>Capacities</p>
                                                </div>
                                                <div className="flex justify-center">
                                                    {hotelRooms.length == 0 ? (
                                                        <div className="flex justify-center">
                                                            <div className="border-red-100 rounded p-2 text-red-700 mb-2 bg-red-100">
                                                                No capacities available on selected date
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {hotelRooms.sort((a, b) => a.hotelroomcapacity > b.hotelroomcapacity ? 1 : -1)
                                                            .map((hotelRoom, index) => (
                                                            <Button key={index} className={selectedHotelRoom.hotelroomcapacity == hotelRoom.hotelroomcapacity ?
                                                                "flex flex-row border-4 px-3 py-2 rounded-lg mx-1 border-cyan-500" : "flex flex-row border-2 px-3 py-2 rounded-lg mx-1"} 
                                                                    onClick={() => setSelectedHotelRoom(hotelRoom)}>
                                                                {hotelRoom.hotelroomcapacity}<div className="w-6">{<UserIcon className="w-6"/>}</div> 
                                                            </Button>
                                                            ))}
                                                        </>
                                                    )}
                                                    </div>
                                            </div>
                                        </Card>
                                    </div>
                                </>
                                )}
                            <div className="flex justify-center">
                                {error && (
                                    <div className="border-red-100 rounded p-2 text-red-700 mb-2 bg-red-100 md:w-3/4 w-auto">
                                        {error}
                                    </div>
                                )}
                            </div>
                            <div>
                                <Button className="px-3 py-2 border-2 rounded-lg" onClick={() => BookHotelRoom()}>Book Hotel Room</Button>
                            </div>
                        </>
                        )
                    }
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default HotelPage;