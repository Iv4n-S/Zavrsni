import React from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import { NETWORK_CONFIG, API_CONFIG } from "../AppData/Constants";
import { useLocation, useNavigate } from "react-router";
import ReactStars from "react-rating-stars-component";

function AddHotelForm(props) {
    const [hotelName, setHotelName] = React.useState("");
    const [hotelRoomCapacity, setHotelRoomCapacity] = React.useState("");
    const [hotelRoomDesc, setHotelRoomDesc] = React.useState("");
    const [stars, setStars] = React.useState();
    const [hotelLocation, setHotelLocation] = React.useState("");
    const [locations, setLocations] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [error, setError] = React.useState("");
    let navigate = useNavigate();
    const [display, setDisplay] = React.useState(false);
    const wrapperRef = React.useRef(null);

    React.useEffect(() =>  {
        const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.locationEndpoint, options)
        .then((response) => {
            if(!response.ok) {
                setError("Fetching locations failed!");
            }
            else {
                response.json()
                .then((value) => {
                    setLocations(value);        
                })
            }

        }).catch(() => {
            setError("Fetching locations failed!");
            navigate("/");
        })
    }, []);

    React.useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });
      
    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    };

    const updateLocations = selectedLocation => {
        setHotelLocation(selectedLocation);
        setDisplay(false);
    };

    function onSubmit() {
        if(hotelName == "") {
            setError("Hotel Name is required!");
        }
        else if(hotelRoomCapacity == "") {
            setError("Hotel Room Capacity is required!");
        }
        else if(hotelRoomDesc == "") {
            setError("Hotel Room Description is required!");
        }
        else if(stars == undefined) {
            setError("Hotel stars are required!");
        }
        else if (hotelLocation == "") {
            setError("Hotel Location is required!");
        }
        else if (images.length == 0) {
            setError("Hotel images are required!");
        }
        else {
            setError("");
            var locationCapitalized = hotelLocation[0].toUpperCase() + hotelLocation.substring(1);

            const body = `{
                "Hotelname": "${hotelName}",
                "Hotelroomcapacity": ${hotelRoomCapacity},
                "Hotelroomdesc": "${hotelRoomDesc}",
                "Stars": ${stars},
                "Location": "${locationCapitalized}"
            }`;
    
            const options = {
                method: "POST",
                body: body,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
            };
        
            fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.addHotel, options)
                .then((response) => {
                    if(!response.ok) {
                        setError("Adding hotel failed!");
                    }
                    else {
                        response.json().then((value) => {

                            const formData = new FormData();
                            for (var image of images) {
                                formData.append('Image', image);
                            }
                            formData.append('FileName', "Img");

                            const imageOptions = {
                                method: "POST",
                                body: formData,
                                headers: {
                                    "Accept": "application/json",
                                },
                            };
                
                            fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.postImage + value, imageOptions)
                            .then((response) => {
                                if (!response.ok) {
                                    setError("Adding hotel failed");
                                    const options = {
                                        method: "DELETE",
                                        headers: { 
                                            "Content-Type": "application/json",
                                            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                                        },
                                    };
                                    fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.deleteHotel + value, options)
                                        .then((response) => {
                                            if(!response.ok) {
                                                alert("Deleting hotel failed!");
                                            }
                                            else {
                                                navigate("/admin");
                                            }
                                        })
                                    .catch(() => {
                                        alert("Deleting hotel failed!");
                                        }
                                    );

                                } else {
                                    alert("Hotel added successfully");
                                    setHotelName("");
                                    setHotelRoomCapacity("");
                                    setHotelRoomDesc("");
                                    setHotelLocation("");
                                }
                            })
                            .catch((error) => {
                                setError("Adding hotel failed");
                            });
                        })

                    }})
                .catch(() => {
                    setError("Adding hotel failed!");
            });
        }
    }


    return (
        <Card className="flex justify-center md:w-2/3 w-auto">
            <div className="flex flex-col w-full">
                <div className="flex justify-center w-full">
                    <p className="text-lg pb-4 text-slate-500">Add Hotel Room</p>
                </div>
                <div className="flex justify-center w-full">
                    <div className="w-2/3">
                        <Input 
                            className="flex mt-2 w-full"
                            name="hotelName"
                            placeholder="Insert Hotel Name"
                            value={hotelName}
                            onChange={event => setHotelName(event.target.value)}
                            required
                        />
                    </div>
                </div>
                <div ref={wrapperRef} className="flex flex-col items-center w-full">
                    <div className="w-2/3">
                        <Input
                            className="flex mt-2 w-full"
                            name="location"
                            placeholder="Search hotel location"
                            value={hotelLocation}
                            onChange={event => setHotelLocation(event.target.value)}
                            onClick={() => setDisplay(!display)}
                            required
                        />
                        {display && (
                            <div className="flex flex-col items-center w-full bg-slate-100">
                            {locations.filter(({ locationname }) => locationname.indexOf(hotelLocation) > -1)
                                .map((value, i) => {
                                return (
                                    <div
                                        onClick={() => updateLocations(value.locationname)}
                                        className="flex flex-col items-start w-full border-2 rounded-sm p-2"
                                        key={i}
                                        tabIndex="0"
                                    >
                                        <span>{value.locationname}</span>
                                    </div>
                                );
                                })}
                            </div>
                        )}
                    </div>
                </div>   
                <div className="flex justify-center w-full">
                    <div className="w-2/3">
                        <div className=" flex flex-col mt-2">
                            <p className="mb-1" />
                            <div className="flex my-2">
                                <textarea 
                                    className="flex w-full border-2 border-gray-400 hover:border-gray-600 p-2"
                                    placeholder="Insert Hotel Room Description"
                                    rows={3}
                                    maxLength={2048}
                                    value={hotelRoomDesc}
                                    onChange={event => setHotelRoomDesc(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>         
                <div className="flex justify-center w-full">
                    <div className="w-2/3">
                        <Input 
                            className="flex mt-2 w-full"
                            type="number"
                            name="capacity"
                            placeholder="Insert Hotel Room Capacity"
                            value={hotelRoomCapacity}
                            onChange={event => setHotelRoomCapacity((v) => event.target.value > 0 ? event.target.value : v)}
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <div className="flex justify-center w-2/3">
                        <ReactStars
                            size={40}
                            count={5}
                            value={stars}
                            onChange={(newStars) => setStars(newStars)}
                            activeColor="#ffd700"
                        />
                    </div>
                </div>

                <div className="flex justify-center w-full my-4">
                    <div className="flex justify-center w-2/3">
                        <input
                            id="images"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(event) => setImages(event.target.files)}
                            multiple
                        />
                    </div>
                </div>
                {error && (
                    <div className="flex justify-center mt-2">
                        <div className="border-red-100 rounded p-2 text-red-700 mb-2 bg-red-100 w-2/3">
                            {error}
                        </div>
                    </div>
                )}
                <div className="flex justify-center pt-2 mt-2">
                    <Button
                        type="button"
                        className="bg-gray-100 rounded text-gray-900 w-2/3 border-2 text-lg border-gray-400 hover:border-gray-600"
                        label="Add Hotel"
                        onClick={onSubmit}
                    />
                </div>
            </div>
        </Card>
    );
}

export default AddHotelForm;