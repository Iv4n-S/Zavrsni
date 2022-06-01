import React from "react";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";
import { NETWORK_CONFIG, API_CONFIG } from "../AppData/Constants";
import { useLocation, useNavigate } from "react-router";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import CarIcon from "./CarIcon";
import DatePicker from 'react-datepicker';
import dateFormat from "dateformat";

function AddTransportForm(props) {
    const [transportName, setTransportName] = React.useState("");
    const [transportType, setTransportType] = React.useState("");
    const [transportTypeValue, setTransportTypeValue] = React.useState("");
    const [capacity, setCapacity] = React.useState("");
    const [departureTime, setDepartureTime] = React.useState("");
    const [locationFrom, setLocationFrom] = React.useState("");
    const [locationTo, setLocationTo] = React.useState("");
    const [travelLocation, setTravelLocation] = React.useState([]);
    const [transportTypes, setTransportTypes] = React.useState([]);
    const [error, setError] = React.useState("");
    let navigate = useNavigate();
    const [displayFrom, setDisplayFrom] = React.useState(false);
    const [displayTo, setDisplayTo] = React.useState(false);
    const [displayType, setDisplayType] = React.useState(false);
    const wrapperRefFrom = React.useRef(null);
    const wrapperRefTo = React.useRef(null);
    const wrapperRefType = React.useRef(null);



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
                    setTravelLocation(value);        
                })
            }

        }).catch(() => {
            setError("Fetching locations failed!");
            navigate("/");
        })
        const optionsTransportTypes = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.getTransportTypes, optionsTransportTypes)
        .then((response) => {
            if(!response.ok) {
                setError("Fetching transport types failed!");
            }
            else {
                response.json()
                .then((value) => {
                    setTransportTypes(value);        
                })
            }

        }).catch(() => {
            setError("Fetching transport types failed!");
            navigate("/");
        })

    }, []);

    React.useEffect(() => {
        window.addEventListener("mousedown", handleClickOutsideFrom);
        return () => {
            window.removeEventListener("mousedown", handleClickOutsideFrom);
        };
    });
      
    const handleClickOutsideFrom = event => {
        const { current: wrap } = wrapperRefFrom;
        if (wrap && !wrap.contains(event.target)) {
            setDisplayFrom(false);
        }
    };

    const updateLocationsFrom = selectedLocationFrom => {
        setLocationFrom(selectedLocationFrom);
        setDisplayFrom(false);
    };

    React.useEffect(() => {
        window.addEventListener("mousedown", handleClickOutsideTo);
        return () => {
            window.removeEventListener("mousedown", handleClickOutsideTo);
        };
    });
      
    const handleClickOutsideTo = event => {
        const { current: wrap } = wrapperRefTo;
        if (wrap && !wrap.contains(event.target)) {
            setDisplayTo(false);
        }
    };

    const updateLocationsTo = selectedLocationTo => {
        setLocationTo(selectedLocationTo);
        setDisplayTo(false);
    };

    React.useEffect(() => {
        window.addEventListener("mousedown", handleClickOutsideType);
        return () => {
            window.removeEventListener("mousedown", handleClickOutsideType);
        };
    });
      
    const handleClickOutsideType = event => {
        const { current: wrap } = wrapperRefType;
        if (wrap && !wrap.contains(event.target)) {
            setDisplayType(false);
        }
    };

    const updateType = selectedType => {
        setTransportType(selectedType);
        setTransportTypeValue(selectedType.transportTypeName);
        setDisplayType(false);
    };

    function onSubmit() {
        if(transportName == "") {
            setError("Transport Name is required!");
        }
        else if(locationFrom == "") {
            setError("Location From is required!");
        }
        else if(locationTo == "") {
            setError("Location To is required!");
        }
        else if(transportType == "") {
            setError("Transport type is required!");
        }
        else if (departureTime == "") {

        }
        else if (capacity == "") {
            setError("Capacity is required!");
        }
        else if (locationFrom == locationTo) {
            setError("Departure location can't be the same as arrival location!");
        }
        else {
            setError("");
            var locationFromCapitalized = locationFrom[0].toUpperCase() + locationFrom.substring(1);
            var locationToCapitalize = locationTo[0].toUpperCase() + locationTo.substring(1);

            var departureTimeParsed = JSON.stringify(dateFormat(departureTime.toString(), "HH:MM"));
            const body = `{
                "Transportname": "${transportName}",
                "Idtransporttype": "${transportType.idtransporttype}",
                "Locationfrom": "${locationFromCapitalized}",
                "Locationto": "${locationToCapitalize}",
                "Capacity": ${capacity},
                "DepartureTime": ${departureTimeParsed}
            }`;
    
            const options = {
                method: "POST",
                body: body,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
            };
        
            fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.addTransport, options)
                .then((response) => {
                    if(!response.ok) {
                        setError("Adding transport failed!");
                    }
                    else {

                    }})
                .catch(() => {
                    setError("Adding transport failed!");
            });       
        }
    }


    return (
        <Card className="flex justify-center md:w-2/3 w-auto">
            <div className="flex flex-col w-full">
                <div className="flex justify-center w-full">
                    <p className="text-lg pb-4 text-slate-500">Add transportation</p>
                </div>
                <div className="flex justify-center w-full">
                    <div className="w-2/3">
                        <Input 
                            className="flex mt-2 w-full"
                            name="transportName"
                            placeholder="Insert Transport Name"
                            value={transportName}
                            onChange={event => setTransportName(event.target.value)}
                            required
                        />
                    </div>
                </div>
                <div ref={wrapperRefFrom} className="flex flex-col items-center w-full">
                    <div className="w-2/3">
                        <Input
                            className="flex mt-2 w-full"
                            name="location"
                            placeholder="Search location from"
                            value={locationFrom}
                            icon={<LocationMarkerIcon />}
                            onChange={event => setLocationFrom(event.target.value)}
                            onClick={() => setDisplayFrom(!displayFrom)}
                            required
                        />
                        {displayFrom && (
                            <div className="flex flex-col items-center w-full bg-slate-100">
                            {travelLocation.filter(({ locationname }) => locationname.indexOf(locationFrom) > -1)
                                .map((value, i) => {
                                return (
                                    <div
                                        onClick={() => updateLocationsFrom(value.locationname)}
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
                <div ref={wrapperRefTo} className="flex flex-col items-center w-full">
                    <div className="w-2/3">
                        <Input
                            className="flex mt-2 w-full"
                            name="location"
                            placeholder="Search location to"
                            value={locationTo}
                            icon={<LocationMarkerIcon />}
                            onChange={event => setLocationTo(event.target.value)}
                            onClick={() => setDisplayTo(!displayTo)}
                            required
                        />
                        {displayTo && (
                            <div className="flex flex-col items-center w-full bg-slate-100">
                            {travelLocation.filter(({ locationname }) => locationname.indexOf(locationTo) > -1)
                                .map((value, i) => {
                                return (
                                    <div
                                        onClick={() =>  {
                                            
                                            updateLocationsTo(value.locationname);
                                        }}
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
                <div ref={wrapperRefType} className="flex flex-col items-center w-full">
                    <div className="w-2/3">
                        <Input
                            className="flex mt-2 w-full"
                            name="transportType"
                            placeholder="Search transport type"
                            value={transportTypeValue}
                            icon={<CarIcon className="pr-1" />}
                            onChange={event =>  {
                                setTransportTypeValue(event.target.value);
                                setTransportType(event.target.value);
                            }
                            }
                            onClick={() => setDisplayType(!displayType)}
                            required
                        />
                        {displayType && (
                            <div className="flex flex-col items-center w-full bg-slate-100">
                            {transportTypes.filter(({ transportTypeName }) => transportTypeName.indexOf(transportType) > -1)
                                .map((value, i) => {
                                return (
                                    <div
                                        onClick={() => updateType(value)}
                                        className="flex flex-col items-start w-full border-2 rounded-sm p-2"
                                        key={i}
                                        tabIndex="0"
                                    >
                                        <span>{value.transportTypeName}</span>
                                    </div>
                                );
                                })}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <div className="w-2/3">
                        <DatePicker 
                            className="border-2 rounded-sm p-2 px-2 border-gray-400 hover:border-gray-600 w-full mt-2"
                            showTimeSelect 
                            showTimeSelectOnly 
                            timeFormat="HH:mm" 
                            timeIntervals={15} 
                            selected={departureTime} 
                            dateFormat="HH:mm"
                            onChange={(departureTime) => { 
                                setDepartureTime(departureTime);
                            }
                            } 
                            placeholderText="Insert Departure Time"
                            required
                        />
                    </div>
                </div>                
                <div className="flex justify-center w-full">
                    <div className="w-2/3">
                        <Input 
                            className="flex mt-2 w-full"
                            name="capacity"
                            placeholder="Insert Capacity"
                            value={capacity}
                            onChange={event => setCapacity(event.target.value)}
                            required
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
                        label="Search"
                        onClick={onSubmit}
                    />
                </div>
            </div>
        </Card>
    );
}

export default AddTransportForm;