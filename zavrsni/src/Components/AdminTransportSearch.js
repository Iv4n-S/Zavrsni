import React from "react";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";
import { NETWORK_CONFIG, API_CONFIG } from "../AppData/Constants";
import cx from "classnames";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { LocationMarkerIcon } from "@heroicons/react/solid";


function AdminTransportSearch(props) {
    let navigate = useNavigate();
    const [error, setError] = React.useState("");
    const [travelLocation, setTravelLocation] = React.useState([]);
    const [locationFromSearch, setLocationFromSearch] = React.useState("");
    const [locationToSearch, setLocationToSearch] = React.useState("");
    const [displayFrom, setDisplayFrom] = React.useState(false);
    const [displayTo, setDisplayTo] = React.useState(false);
    const wrapperRefFrom = React.useRef(null);
    const wrapperRefTo = React.useRef(null);

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
        setLocationFromSearch(selectedLocationFrom);
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
        setLocationToSearch(selectedLocationTo);
        setDisplayTo(false);
    };

      const FormStyle = cx({
        "flex flex-col items-center w-full": true,
    });


    function onSubmit() {
        if(locationFromSearch == "") {
            setError("Location From is required!");
        }
        else if(locationToSearch == "") {
            setError("Location To is required!");
        }
        else if (locationFromSearch == locationToSearch ) {
            setError("Departure location can't be the same as arrival location!");
        }
        else {
            setError("");

            var locationFromCapitalized = locationFromSearch[0].toUpperCase() + locationFromSearch.substring(1);
            var locationToCapitalize = locationToSearch[0].toUpperCase() + locationToSearch.substring(1);

            const body = `{
                "LocationFrom": "${locationFromCapitalized}",
                "LocationTo": "${locationToCapitalize}",
            }`;
    
            const options = {
                method: "POST",
                body: body,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,  
                },
            };
        
            fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.searchAdminTransports, options)
                .then((response) => {
                    if(!response.ok) {
                        setError("Transport search failed!");
                    }
                    else {
                        response.json().then((value) => {
                            if(value.length == 0) {
                                setError(`No transports available from ${locationFromSearch} to ${locationToSearch}`)
                            }
                            else {
                                props.setFilteredTransports(value);
                                setLocationFromSearch("");
                                setLocationToSearch("");
                            }
                        })
                    }})
                .catch(() => {
                    setError("Transport search failed!");
            });
        } 
    }

    return (
        <Card className="md:w-2/3 w-auto">
            <div className="flex justify-center w-full">
                <p className="text-lg pb-4 text-slate-500">Search transportations</p>
            </div>
            <div ref={wrapperRefFrom} className={FormStyle}>
                <div className="w-2/3">
                    <Input
                        className="flex mt-2 w-full"
                        name="location"
                        placeholder="Search location from"
                        value={locationFromSearch}
                        icon={<LocationMarkerIcon />}
                        onChange={event => setLocationFromSearch(event.target.value)}
                        onClick={() => setDisplayFrom(!displayFrom)}
                    />
                    {displayFrom && (
                        <div className="flex flex-col items-center w-full bg-slate-100">
                        {travelLocation.filter(({ locationname }) => locationname.indexOf(locationFromSearch) > -1)
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
            <div ref={wrapperRefTo} className={FormStyle}>
                <div className="w-2/3">
                    <Input
                        className="flex mt-2 w-full"
                        name="location"
                        placeholder="Search location to"
                        value={locationToSearch}
                        icon={<LocationMarkerIcon />}
                        onChange={event => setLocationToSearch(event.target.value)}
                        onClick={() => setDisplayTo(!displayTo)}
                    />
                    {displayTo && (
                        <div className="flex flex-col items-center w-full bg-slate-100">
                        {travelLocation.filter(({ locationname }) => locationname.indexOf(locationToSearch) > -1)
                            .map((value, i) => {
                            return (
                                <div
                                    onClick={() => updateLocationsTo(value.locationname)}
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
        </Card>
    );
}

export default AdminTransportSearch;
