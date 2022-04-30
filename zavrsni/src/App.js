import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { NETWORK_CONFIG, API_CONFIG } from "./AppData/Constants";
import Header from './Header';


function App() {
    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState("");

    function getUserData() {
        fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.userEndpoint+"/1")
        .then((data) => data.json())
        .then((response) => {
            if (!response.ok) {
                setError("Fetch failed");
                setUser(response);
            } else {
                setUser(response);
            }
        })
        .catch((error) => {
            setError("Fetch failed");
        });
    }

    return (
        <div className="App">
            <BrowserRouter>
                <div className="flex flex-col justify-center text-center bg-scroll h-full">
                    <Header/>
           
                <button onClick={() => {getUserData()}}>User</button>
                {user == null ? 
                (<></>) : 
                (<div>{user.username}</div>)
                }
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
