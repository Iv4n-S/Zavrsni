import React from "react";
import Card from "../Components/Card";


function UsersTransports(props) {
    const transport = props.transport;


    return(
        <Card className={transport.active ? "md:w-2/3 w-auto m-2" : "md:w-2/3 w-auto m-2 bg-gray-200"}>
            <div className="flex flex-col justify-center">
                <div>
                    <span className="font-semibold text-slate-500 mx-2">{transport.transportname}</span>
                </div>
                <div className="flex justify-center">
                    <span className="font-semibold text-slate-500 mx-2">From:</span>{transport.locationFrom}
                </div>
                <div className="flex justify-center">
                    <span className="font-semibold text-slate-500 mx-2">To: </span>{transport.locationTo}
                </div>
                <div className="flex justify-center">
                    <span className="font-semibold text-slate-500 mx-2">Departure Time: </span>{transport.departureTime}
                </div>
                {transport.timeSlot != null && 
                    <div className="flex justify-center">
                        <span className="font-semibold text-slate-500 mx-2">Booked Date: </span>{transport.timeSlot}
                    </div>
                }
            </div>
        </Card>                    
    );
}

export default UsersTransports;
