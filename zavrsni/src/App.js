import React from "react";
import { BrowserRouter, Redirect, Route, Routes } from "react-router-dom";
import { NETWORK_CONFIG, API_CONFIG } from "./AppData/Constants";
import Header from './Header';
import Login from "./Pages/Login";


function App() {
    const [user, setUser] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

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

    const LogOut = (e) => {
        e.preventDefault();
        setUser(null);
        setError("");
        setIsLoggedIn(false);
        /*
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
    
        fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.logoutEndpoint, options)
          .then((response) => {
            if (!response.ok) {
              setError("Logout failed");
            } else {
              setIsLoggedIn(false);
              window.location.replace("/");
            }
          })
          .catch((error) => {
            setError("Logout failed");
          });
          */
      };

    const login = (loginForm) => {
        if (loginForm.email !== "") {
          setUser({ email: loginForm.email, isAdmin: loginForm.isAdmin});
          setIsLoggedIn(true);
        }
      };

    return (
        <div className="App">
            <BrowserRouter>
                <div className="flex flex-col justify-center text-center bg-scroll h-full">
                    <Header logOut={LogOut} isLoggedIn={isLoggedIn} />
           
                    <button onClick={() => {getUserData()}}>User</button>
                    {user == null ? 
                    (<></>) : 
                    (<div>{user.username}</div>)
                    }
                    {user == null ? 
                    (<></>) : 
                    (<div>{user.email}</div>)
                    }
                    <Routes>
                        <Route path="/login" element={<Login logIn={login} setLoggedIn={setIsLoggedIn}/>} exact={true} />
                    </Routes> 
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
