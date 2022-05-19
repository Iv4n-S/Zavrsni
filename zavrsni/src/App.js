import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NETWORK_CONFIG, API_CONFIG } from "./AppData/Constants";
import Header from './Header';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import PostImage from "./Pages/[temp]PostImage";
import UserPage from "./Pages/UserPage";
import Hotels from "./Pages/Hotels";
import HotelPage from "./Pages/HotelPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        if(localStorage.getItem('token') != null) {
            setIsLoggedIn(true);
            let expireDate = JSON.parse(localStorage.getItem('expires'));
            setTimeout(() => {
                setIsLoggedIn(false);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('expires');
            }, Date.parse(expireDate) - Date.now());
        }
    }, []);

    const LogOut = (e) => {
        e.preventDefault();
        setError("");
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expires');
    };

    return (
        <div className="App">
            <BrowserRouter>
                <div className="flex flex-col justify-center text-center bg-scroll h-full">
                    <Header logOut={LogOut} isLoggedIn={isLoggedIn} />
                    <Routes>
                        <Route path="/" element={<Home />} exact={true} />
                    </Routes>
                    <Routes>
                        <Route path="/login" element={<Login /*logIn={login}*/ setLoggedIn={setIsLoggedIn}/>} exact={true} />
                    </Routes> 
                    <Routes>
                        <Route path="/register" element={<Register setLoggedIn={setIsLoggedIn} />} />
                    </Routes>
                    <Routes>
                        <Route path="/postImage" element={<PostImage setLoggedIn={setIsLoggedIn} />} />
                    </Routes>
                    <Routes>
                        <Route path="/user" element={<UserPage />} />
                    </Routes>
                    <Routes>
                        <Route path="/hotels" element={<Hotels />} />
                    </Routes>
                    <Routes>
                        <Route path="/hotelpage" element={<HotelPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
