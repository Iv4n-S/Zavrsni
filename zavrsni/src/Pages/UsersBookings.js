import React from "react";
import Card from "../Components/Card";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { NETWORK_CONFIG, API_CONFIG } from "../AppData/Constants";
import CarIcon from "../Components/CarIcon";
import { OfficeBuildingIcon } from "@heroicons/react/solid";
import UsersHotels from "../Components/UsersHotels";
import UsersTransports from "../Components/UsersTransports";

function UsersBookings(props) {
    const [transportBookings, setTransportBookings] = React.useState([]);
    const [hotelBookings, setHotelBookings] = React.useState([]);
    const [userTransportsDisplay, setUserTransportsDisplay] = React.useState(false);
    const [userHotelsDisplay, setUserHotelsDisplay] = React.useState(false);
    const wrapperRefTransports = React.useRef(null);
    const wrapperRefHotels = React.useRef(null);

    let navigate = useNavigate();

    React.useEffect(() => {
        const options = {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        };
        fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.usersBookings, options)
            .then((response) => {
                if(!response.ok) {
                    navigate("/");
                }
                else {
                    response.json().then((value) => {
                        setTransportBookings(value.transportBookings);
                        setHotelBookings(value.hotelBookings);
                    })
                }
            })
        .catch(() =>
            navigate("/")
        );
    });

    React.useEffect(() => {
        window.addEventListener("mousedown", handleClickOutsideTransports);
        return () => {
            window.removeEventListener("mousedown", handleClickOutsideTransports);
        };
    });
      
    const handleClickOutsideTransports = event => {
        const { current: wrap } = wrapperRefTransports;
        if (wrap && !wrap.contains(event.target)) {
            setUserTransportsDisplay(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener("mousedown", handleClickOutsideHotels);
        return () => {
            window.removeEventListener("mousedown", handleClickOutsideHotels);
        };
    });
      
    const handleClickOutsideHotels = event => {
        const { current: wrap } = wrapperRefHotels;
        if (wrap && !wrap.contains(event.target)) {
            setUserHotelsDisplay(false);
        }
    };

    function CancelBooking(idBooking) {
        var confirmation = window.confirm(
            "Are you sure you want to cancel booking?"
        );
      
            if (confirmation) {
                const options = {
                    method: "DELETE",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    },
                };
                fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.cancelBooking + idBooking, options)
                    .then((response) => {
                        if(!response.ok) {
                            alert("Canceling Booking failed!");
                        }
                        else {
                            navigate("/usersBookings");
                        }
                    })
                .catch(() => {
                    alert("Canceling Booking failed!");
                    }
                );
            }
    }

    return(
        <div className="flex flex-col justify-center">
            <div ref={wrapperRefTransports}>
                <div className="flex flex-col justify-center mt-4 mb-2">
                    <div className="flex justify-center">
                        <div className="flex justify-center md:w-2/3 w-auto">
                            <Button label="TRANSPORTS" icon={<CarIcon />} className="space-x-2 py-5 rounded border-2 w-full" onClick={() => setUserTransportsDisplay(!userTransportsDisplay)}/>
                        </div>
                    </div>
                    {userTransportsDisplay && (
                        <div className="flex justify-center">
                            <Card className="md:w-2/3 w-auto">
                            {transportBookings.length == 0 ? (
                                <div className="flex justify-center">
                                    <div className="border-red-100 rounded p-2 text-red-700 mb-2 bg-red-100 md:w-3/4 w-auto">
                                        "You don't have any transports booked!"
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {transportBookings.sort((a, b) => a.active < b.active ? 1 : -1)
                                    .map((value, index) => (
                                        <div key={index}>
                                            <Card className="flex flex-col justify-center">
                                                <div className="flex justify-center w-full">
                                                    <UsersTransports transport={value}/>
                                                </div>
                                                {value.active ? (
                                                    <div className="flex justify-center mt-1">
                                                        <Button label="Cancel Booking" className="text-white bg-[#F03A47]" onClick={() => CancelBooking(value.idbooking)} />
                                                    </div>
                                                ) : (<></>)}
                                            </Card>
                                        </div>
                                    ))}
                                </>
                            )}
                            </Card>
                        </div>      
                    )} 
                </div>
            </div>
            <div ref={wrapperRefHotels}>
                <div className="flex flex-col justify-center mt-4 mb-2">
                    <div className="flex justify-center">
                        <div className="flex justify-center md:w-2/3 w-auto">
                            <Button label="HOTELS" icon={<OfficeBuildingIcon />} className="space-x-2 py-5 rounded border-2 w-full" onClick={() => setUserHotelsDisplay(!userHotelsDisplay)}/>
                        </div>
                    </div>
                    {userHotelsDisplay && (
                        <div className="flex justify-center">
                            <Card className="md:w-2/3 w-auto">
                            {hotelBookings.length == 0 ? (
                                <div className="flex justify-center">
                                    <div className="border-red-100 rounded p-2 text-red-700 mb-2 bg-red-100 md:w-3/4 w-auto">
                                        "You don't have any hotels booked!"
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {hotelBookings.sort((a, b) => a.active < b.active ? 1 : -1)
                                    .map((value, index) => (
                                        <div key={index}>
                                            <Card className="flex flex-col justify-center">
                                                <div className="flex justify-center">
                                                    <UsersHotels hotel={value}/>
                                                </div>
                                                {value.active ? (
                                                    <div className="flex justify-center mt-1">
                                                        <Button label="Cancel Booking" className="text-white bg-[#F03A47]" onClick={() => CancelBooking(value.idbooking)} />
                                                    </div>
                                                ) : (<></>)}
                                            </Card>
                                        </div>
                                    ))}
                                </>
                            )}
                            </Card>
                        </div>
                    )}
                </div>  
            </div>          
        </div>
        
    );
}

export default UsersBookings;
