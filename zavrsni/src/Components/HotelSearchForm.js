import React from "react";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";
import { NETWORK_CONFIG, API_CONFIG } from "../AppData/Constants";
import cx from "classnames";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import dateFormat from "dateformat";
import add from 'date-fns/add';

function HotelSearchForm(props) {
    let navigate = useNavigate();
    const [error, setError] = React.useState("");
    const [dateFrom, setDateFrom] = React.useState(new Date());
    const [dateTo, setDateTo] = React.useState(add(new Date(), { days: 1 }));
    const [hotelLocation, setHotelLocation] = React.useState([]);
    const [locationSearch, setLocationSearch] = React.useState("");
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
                    setHotelLocation(value);        
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
        setLocationSearch(selectedLocation);
        setDisplay(false);
    };

      const FormStyle = cx({
        "flex flex-col items-center w-full": true,
    });

    function onSubmit() {
        if(locationSearch == "") {
            setError("Location is required!")
        }
        else {
            setError("");
            var selectedDatesList = [];
            var dateFromPom = dateFrom;

            while(dateFromPom < dateTo) {
                selectedDatesList.push(JSON.stringify(dateFormat(dateFromPom.toString(), "yyyy-mm-dd")));
                dateFromPom = add(dateFromPom, { days: 1 });
            }

            props.setSelectedDates(selectedDatesList);

            var locationCapitalized = locationSearch[0].toUpperCase() + locationSearch.substring(1);


            const body = `{
                "SelectedDates": [${selectedDatesList}],
                "Location": "${locationCapitalized}"
            }`;
    
            const options = {
                method: "POST",
                body: body,
                headers: { "Content-Type": "application/json" },
            };
        
            fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.searchHotels, options)
                .then((response) => {
                    if(!response.ok) {
                        setError("Hotel search failed!");
                    }
                    else {
                        response.json().then((value) => {
                            if(value.length == 0) {
                                setError(`No hotels available in ${locationSearch} on selected dates`);
                            }
                            else {
                                props.setFilteredHotels(value);
                                setLocationSearch("");
                            }
                        })
                    }})
                .catch(() => {
                    setError("Hotel search failed!");
            });
        } 
    }

    return (
        <div className="flex justify-center z-40">
            <Card className="md:w-1/3 w-auto">
                <div className="flex justify-center w-full">
                    <p className="text-lg pb-4 text-slate-500">Search hotels</p>
                </div>
                <div className="flex items-center w-full mb-2">
                    <div className="w-full">
                        <span>Date from </span>
                    </div>
                    <div className="w-full">
                        <span>Date to </span>
                    </div>
                </div>
                <div className="flex items-center w-full">
                    <DatePicker 
                        className="border-2 rounded-sm p-2 w-5/6 border-gray-400 hover:border-gray-600"
                        selected={dateFrom} 
                        onChange={(dateFrom) => { 
                            setDateFrom(dateFrom);
                            if(dateFrom >= dateTo) {
                                var dayAfter = new Date(dateFrom);
                                dayAfter.setDate(dayAfter.getDate() + 1);
                                setDateTo(dayAfter);
                            }
                        }} 
                        dateFormat='dd.MM.yyyy.'
                        minDate={new Date()}
                    />
                    <DatePicker 
                        className="border-2 rounded-sm p-2 w-5/6 border-gray-400 hover:border-gray-600"
                        selected={dateTo} 
                        onChange={(dateTo) => { setDateTo(dateTo) }} 
                        dateFormat='dd.MM.yyyy.'
                        minDate={add(dateFrom, { days: 1 })}
                    />
                </div>
                <div ref={wrapperRef} className={FormStyle}>
                    <div className="w-2/3">
                    <Input
                        className="flex mt-2 w-full"
                        name="location"
                        placeholder="Search location"
                        value={locationSearch}
                        icon={<LocationMarkerIcon />}
                        onChange={event => setLocationSearch(event.target.value)}
                        onClick={() => setDisplay(!display)}
                    />
                    {display && (
                        <div className="flex flex-col items-center w-full bg-slate-100">
                        {hotelLocation.filter(({ locationname }) => locationname.indexOf(locationSearch) > -1)
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
                {error && (
                    <div className="flex justify-center">
                        <div className="border-red-100 rounded p-2 text-red-700 mb-2 bg-red-100 w-2/3 mt-1">
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
        </div>
    );
}

export default HotelSearchForm;
