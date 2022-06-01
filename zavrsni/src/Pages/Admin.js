import React from "react";
import { useNavigate } from "react-router-dom";
import CarIcon from "../Components/CarIcon";
import { OfficeBuildingIcon, PlusCircleIcon, MinusCircleIcon} from "@heroicons/react/solid";
import Button from "../Components/Button";
import Card from "../Components/Card";
import AdminHotelSearch from "../Components/AdminHotelSearch";
import AdminTransportSearch from "../Components/AdminTransportSearch";
import UsersTransports from "../Components/UsersTransports";
import { NETWORK_CONFIG, API_CONFIG } from "../AppData/Constants";
import UsersHotels from "../Components/UsersHotels";
import AddTransportForm from "../Components/AddTransportForm";
import AddHotelForm from "../Components/AddHotelForm";

function Admin(props) {
    const [transportOption, setTransportOption] = React.useState(false);
    const [hotelOption, setHotelOption] = React.useState(false);
    const [addTransportOption, setAddTransportOption] = React.useState(false);
    const [addHotelOption, setAddHotelOption] = React.useState(false);
    const [removeTransportOption, setRemoveTransportOption] = React.useState(false);
    const [removeHotelOption, setRemoveHotelOption] = React.useState(false);
    const [filteredHotels, setFilteredHotels] = React.useState(undefined);
    const [filteredTransports, setFilteredTransports] = React.useState(undefined);

    let navigate = useNavigate();

    function DeleteTransport(idTransport) {
        var confirmation = window.confirm(
            "Are you sure you want to delete transport?"
        );
      
            if (confirmation) {
                const options = {
                    method: "DELETE",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    },
                };
                fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.deleteTransport + idTransport, options)
                    .then((response) => {
                        if(!response.ok) {
                            alert("Deleting Transport failed!");
                        }
                        else {
                            navigate("/admin");
                        }
                    })
                .catch(() => {
                    alert("Deleting Transport failed!");
                    }
                );
            }
    }

    function DeleteHotel(idHotel) {
        var confirmation = window.confirm(
            "Are you sure you want to delete hotel?"
        );
      
            if (confirmation) {
                const options = {
                    method: "DELETE",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    },
                };
                fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.deleteHotel + idHotel, options)
                    .then((response) => {
                        if(!response.ok) {
                            alert("Deleting Hotel failed!");
                        }
                        else {
                            navigate("/admin");
                        }
                    })
                .catch(() => {
                    alert("Deleting Hotel failed!");
                    }
                );
            }
    }


    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-center">
                <div className="flex justify-center md:w-2/3 w-auto mt-8">
                    <div className="flex justify-center w-1/2">
                        <div className="flex justify-center md:w-2/3 w-auto">
                            <Button label="TRANSPORTS" icon={<CarIcon />} className="space-x-2 py-5 rounded border-2 w-full" onClick={() => setTransportOption(!transportOption)} />
                        </div>
                    </div>
                    <div className="flex justify-center w-1/2">
                        <div className="flex justify-center md:w-2/3 w-auto">
                            <Button label="HOTELS" icon={<OfficeBuildingIcon />} className="space-x-2 py-5 rounded border-2 w-full" onClick={() => setHotelOption(!hotelOption)} />
                        </div>
                    </div>
                </div>
            </div>
            {transportOption && (
                <div className="flex justify-center">
                    <Card className="flex justify-center md:w-2/3 w-auto mt-8">
                        <div className="flex flex-col w-full" >
                            <div className="flex justify-center">
                                <div className="flex justify-center md:w-2/3 w-auto">
                                    <div className="flex justify-center w-1/2">
                                        <div className="flex justify-center w-full">
                                            <Button label="Add Transport" icon={<PlusCircleIcon />} className="space-x-2 py-5 rounded border-2 w-full mr-1" 
                                                onClick={() => {
                                                    setAddTransportOption(!addTransportOption);
                                                    !addTransportOption && setRemoveTransportOption(false);
                                                }} 
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center w-1/2">
                                        <div className="flex justify-center w-full">
                                            <Button label="Remove Transport" icon={<MinusCircleIcon />} className="space-x-2 py-5 rounded border-2 w-full ml-1" 
                                                onClick={() => {
                                                    setRemoveTransportOption(!removeTransportOption);
                                                    !removeTransportOption && setAddTransportOption(false);
                                                }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {addTransportOption &&
                                <div className="flex justify-center w-full">
                                    <AddTransportForm/>
                                </div>
                            }
                            {removeTransportOption && 
                                <div className="flex flex-col">
                                    <div className="flex justify-center w-full">
                                        <AdminTransportSearch setFilteredTransports={setFilteredTransports} />
                                    </div>
                                        {filteredTransports != undefined && (
                                            filteredTransports.length != 0 &&
                                            <>
                                                {filteredTransports.map((filteredTransport, index) => (
                                                    <div key={index}>
                                                        <div className="mt-4">
                                                            <span className="text-xxxl capitalize text-slate-500">{filteredTransport.transportType}</span>
                                                        </div>
                                                        {filteredTransport.transports.map((value, index) => (
                                                        <div key={index}>
                                                            <Card className="flex flex-col justify-center">
                                                                <div className="flex justify-center w-full">
                                                                    <UsersTransports transport={value}/>
                                                                </div>
                                                                <div className="flex justify-center mt-1">
                                                                    <Button label="Delete Transport" className="bg-[#F45B69]" 
                                                                        onClick={() =>  {
                                                                            DeleteTransport(value.idtransport);
                                                                            filteredTransport.transports.splice(filteredTransport.transports.indexOf(value), 1);
                                                                        }
                                                                    }/>
                                                                </div>
                                                            </Card>
                                                        </div>
                                                        ))}
                                                    </div> 
                                                ))}
                                            </>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    </Card>
                </div>
            )}
            {hotelOption && (
                <div className="flex justify-center">
                    <Card className="flex justify-center md:w-2/3 w-auto mt-8">
                        <div className="flex flex-col w-full" >
                            <div className="flex justify-center">
                                <div className="flex justify-center md:w-2/3 w-auto">
                                    <div className="flex justify-center w-1/2">
                                        <div className="flex justify-center w-full">
                                            <Button label="Add Hotel" icon={<PlusCircleIcon />} className="space-x-2 py-5 rounded border-2 w-full mr-1" 
                                                onClick={() => {
                                                    setAddHotelOption(!addHotelOption);
                                                    !addHotelOption && setRemoveHotelOption(false);
                                                }} 
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center w-1/2">
                                        <div className="flex justify-center w-full">
                                            <Button label="Remove Hotel" icon={<MinusCircleIcon />} className="space-x-2 py-5 rounded border-2 w-full ml-1" 
                                                onClick={() => {
                                                    setRemoveHotelOption(!removeHotelOption);
                                                    !removeHotelOption && setAddHotelOption(false);
                                                }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {addHotelOption &&
                                <div className="flex justify-center w-full">
                                    <AddHotelForm />
                                </div>
                            }
                            {removeHotelOption &&
                                <div className="flex flex-col">
                                    <div className="flex justify-center w-full">
                                        <AdminHotelSearch setFilteredHotels={setFilteredHotels} />
                                    </div>
                                    {filteredHotels != undefined && (
                                            filteredHotels.length != 0 &&
                                            <>
                                                {filteredHotels.map((filteredHotel, index) => (
                                                    <div key={index}>
                                                        <Card className="flex flex-col justify-center">
                                                            <div className="flex justify-center w-full">
                                                                <UsersHotels hotel={filteredHotel}/>
                                                            </div>
                                                            <div className="flex justify-center mt-1">
                                                                <Button label="Delete Hotel" className="bg-[#F45B69]" 
                                                                    onClick={() =>  {
                                                                        DeleteHotel(filteredHotel.idhotelroom);
                                                                        filteredHotels.splice(filteredHotels.indexOf(filteredHotel), 1);
                                                                    }
                                                                }/>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                ))}
                                            </>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    </Card>
                </div>    
            )}
        </div>
    );
}

export default Admin;