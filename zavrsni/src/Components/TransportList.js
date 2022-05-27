import React from "react";
import Button from "./Button";

function TransportList(props) {
    const transports = props.transports;

    return (
        <>
            <p className="text-lg py-5 text-slate-500">{transports.transportType}</p>
            <div className="flex flex-row justify-center items-center w-full">
                {transports.transports.sort((a, b) => a.departureTime > b.departureTime ? 1 : -1)
                .map((transport, index) => (
                    <div key={index} >
                        <Button label={transport.departureTime} key={index} className={props.selectedTransport == transport ?
                            "flex flex-row border-4 px-3 py-2 rounded-lg mx-1 border-cyan-500 relative" : "flex flex-row border-2 px-3 py-2 rounded-lg mx-1"} 
                            onClick={() => {
                                props.setSelectedTransport(transport);
                            }}/>
                    </div>
                ))}
            </div>
        </>
      );
}

export default TransportList;