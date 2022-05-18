import React from "react";
import { API_CONFIG, NETWORK_CONFIG } from "../AppData/Constants";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import PostImage from "./[temp]PostImage";
import HotelInScrollList from "../Components/HotelInScrollList";
import {LocationMarkerIcon} from "@heroicons/react/solid";


function Home() {
    const [topTenHotels, setTopTenHotels] = React.useState();
    const [error, setError] = React.useState(""); 

    React.useEffect(() => {
        const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.topTenHotels, options)
        .then((response) => {
            if(!response.ok) {
                setError("Retriving top ten hotels failed.");
            }
            else {
                response.json()
                .then((value) => {
                    setTopTenHotels(value);
                })
            }

        }).catch((error) =>
            setError("Retriving top ten hotels failed."))
    }, [])

    return (
        <div>
        <p className="text-xxxl py-5 text-slate-400">Welcome to a web page for booking transport!</p>


        <p className="text-lg py-5 text-slate-500 pt-16">Top booked hotels last week</p>

        <div className="justify-center border border-2 rounded-lg mx-6">
            {topTenHotels == undefined ? (
                error && (
                    <div className="border-red-100 rounded p-2 text-red-700 mb-2 bg-red-100">
                        {error}
                    </div>
                )
            ) : (
            <ScrollMenu>
                {topTenHotels.map((post, i) => (
                    <HotelInScrollList className="h-80 w-60" hotel={post} key={i}>
                    </HotelInScrollList> 
                ))
            }
            </ScrollMenu>
        )}
        </div>
        </div>

    );
}

export default Home;
