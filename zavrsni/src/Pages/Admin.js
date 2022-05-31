import React from "react";
import CarIcon from "../Components/CarIcon";
import { OfficeBuildingIcon, PlusCircleIcon, MinusCircleIcon} from "@heroicons/react/solid";
import Button from "../Components/Button";
import Card from "../Components/Card";
import AdminHotelSearch from "../Components/AdminHotelSearch";
import AdminTransportSearch from "../Components/AdminTransportSearch";
import UsersTransports from "../Components/UsersTransports";

function Admin(props) {
    const [transportOption, setTransportOption] = React.useState(false);
    const [hotelOption, setHotelOption] = React.useState(false);
    const [addTransportOption, setAddTransportOption] = React.useState(false);
    const [addHotelOption, setAddHotelOption] = React.useState(false);
    const [removeTransportOption, setRemoveTransportOption] = React.useState(false);
    const [removeHotelOption, setRemoveHotelOption] = React.useState(false);
    const [filteredHotels, setFilteredHotels] = React.useState([]);
    const [filteredTransports, setFilteredTransports] = React.useState(undefined);


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
                                    Add Transport
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
                                                                {value.active ? (
                                                                    <div className="flex justify-center mt-1">
                                                                        <Button label="Delete transport" className="bg-[#F45B69]" />
                                                                    </div>
                                                                ) : (<></>)}
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
                                    Add Hotel
                                </div>
                            }
                            {removeHotelOption &&
                                <div className="flex justify-center w-full">
                                    <AdminHotelSearch setFilteredHotels={setFilteredHotels} />
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