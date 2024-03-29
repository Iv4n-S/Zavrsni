import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../Components/Button";
import Card from "../Components/Card";
import TransportSearchForm from "../Components/TransportSearchForm";
import TransportList from "../Components/TransportList";
import { NETWORK_CONFIG, API_CONFIG } from "../AppData/Constants";
import ClipLoader  from "react-spinners/ClipLoader";

function Transport(props) {
    let navigate = useNavigate();
    const [filteredTransports, setFilteredTransports] = React.useState();
    const [selectedDate, setSelectedDate] = React.useState();
    const [selectedTransport, setSelectedTransport] = React.useState(null);
    const [error, setError] = React.useState("");
    let location = useLocation();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if(location.state != undefined) {
            setFilteredTransports(location.state.filteredTransports);
            setSelectedDate(location.state.selectedDate);
            localStorage.removeItem('historyPage');
            localStorage.removeItem('historyCapacity');
            localStorage.removeItem('historyDates');
        }
    });

    function BookTransport() {
        if(localStorage.getItem('token') == null) {
            localStorage.setItem('historyPage', JSON.stringify("transport"));
            localStorage.setItem('historyCapacity', JSON.stringify(filteredTransports));
            localStorage.setItem('historyDates', JSON.stringify(selectedDate));
            alert("Log in to book transport");
            navigate("/login");
        }
        else if(selectedTransport == null) {
            setError("Selecting departure time is required!")
        }
        else {
            setLoading(true);
            const body = `{
                "IdTransport": ${selectedTransport.idtransport},
                "SelectedDate": ${selectedDate}
            }`;

            const options = {
                method: "POST",
                body: body,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                },
            };
        
            fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.bookTransport, options)
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

    return(
        <div className="flex flex-col justify-center">
            <div className="z-40">
                <TransportSearchForm setFilteredTransports={setFilteredTransports} setSelectedDate={setSelectedDate} />
            </div>
            <div className="flex justify-center">
                <ClipLoader color="#06b6d4" loading={loading} size={150} />
            </div>
            <div className="flex justify-center">
                {filteredTransports == undefined ? (<></>) : (
                <Card className="md:w-2/3 w-auto">
                    {filteredTransports.map((transports, index) => (
                        <TransportList transports={transports} selectedDate={selectedDate} 
                            selectedTransport={selectedTransport} setSelectedTransport={setSelectedTransport} key={index} />    
                    ))}
                    <div className="flex justify-center my-4">
                        {error && (
                            <div className="border-red-100 rounded p-2 text-red-700 mb-2 bg-red-100 md:w-3/4 w-auto">
                                {error}
                            </div>
                        )}
                    </div>
                    {selectedTransport == null ? (<></>) : (
                        <div className="flex justify-center my-6">
                            <Card className="md:w-2/3 w-auto">
                                <div>
                                    <span className="font-semibold text-slate-500">{selectedTransport.transportname}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-500">From: </span>{selectedTransport.locationFrom}
                                </div>
                                <div>
                                    <span className="font-semibold text-slate-500">To: </span>{selectedTransport.locationTo}
                                </div>
                                <div className="flex justify-center">
                                    <Button label="Book Transport" onClick={() => BookTransport()} className="px-3 py-2 border-2 rounded-lg mt-4" />
                                </div>
                            </Card>
                        </div>
                    )}
                </Card>
                )}
            </div>
        </div>
        
    );
}

export default Transport;
