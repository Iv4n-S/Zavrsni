import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Components/Button.js";
import {
    HomeIcon,
    LoginIcon,
    LogoutIcon,
    UserIcon,
    OfficeBuildingIcon,
} from "@heroicons/react/solid";
import cx from "classnames";
import CarIcon from "./Components/CarIcon.js";


function Header(props) {
    var navigate = useNavigate();
    const [userMenuDisplay, setUserMenuDisplay] = React.useState(false);
    const wrapperRef = React.useRef(null);
    const HeaderStyle = cx({
        "flex py-4 justify-between align-center drop-shadow bg-cyan-500 text-lg text-white z-50": true,
    });

    React.useEffect(() => {
        if(!props.isLoggedIn) {
            setUserMenuDisplay(false);
        }
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });
      
    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setUserMenuDisplay(false);
        }
    };

    return (
        <header className={HeaderStyle}>
        {props.isLoggedIn ? (
            <> 
                <div className="flex flex-row space-x-4 pl-6">
                    <Link to="/">
                        <Button label="HOME" icon={<HomeIcon />} className="space-x-2" />
                    </Link>
                    <Link to="/transport">
                        <Button label="TRANSPORT" icon={<CarIcon />} className="space-x-2" />
                    </Link>
                    <Link to="/hotels">
                        <Button label="HOTELS" icon={<OfficeBuildingIcon />} className="space-x-2" />
                    </Link>
                </div>
                
                <div className="flex flex-row space-x-4 pr-10 z-50">
                    <div ref={wrapperRef}>
                        <Button label="USER" icon={<UserIcon />} className="space-x-2 pr-10" onClick={() => setUserMenuDisplay(!userMenuDisplay)}/>                  
                        {userMenuDisplay && (
                            <div className="flex flex-col items-center absolute w-full bg-cyan-500 rounded">
                                <div
                                    onClick={() => navigate("/user")}
                                    className="flex flex-col items-start w-full border-1 rounded-sm p-2 pl-4 py-4 hover:bg-cyan-600"
                                >
                                    <span>User Profile</span>
                                </div>
                                <div
                                    onClick={() => navigate("/usersBookings")}
                                    className="flex flex-col items-start w-full border-1 rounded-sm p-2 pl-4 py-4 hover:bg-cyan-600"
                                >
                                    <span>User's Bookings</span>
                                </div>
                                {JSON.parse(localStorage.getItem('user')).role == "admin" ? (
                                    <div
                                    onClick={() => navigate("/admin")}
                                    className="flex flex-col items-start w-full border-1 rounded-sm p-2 pl-4 py-4 hover:bg-cyan-600"
                                >
                                    <span>Admin</span>
                                </div>
                                ) : (<></>)}
                                <div
                                    onClick={props.logOut}
                                    className="flex flex-col items-start w-full border-1 border-t-2 rounded-sm p-2 pl-4 py-4 hover:bg-cyan-600"
                                >
                                    <div className="flex flex-row justify-center">
                                        <p>LOGOUT</p><div className="flex flex-col justify-center w-6 pl-2">{<LogoutIcon/>}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
        ) : (
            <> 
                <div className="flex flex-row space-x-4 pl-6">
                    <Link to="/">
                        <Button label="HOME" icon={<HomeIcon />} className="space-x-2" />
                    </Link>
                    <Link to="/transport">
                        <Button label="TRANSPORT" icon={<CarIcon />} className="space-x-2" />
                    </Link>
                    <Link to="/hotels">
                        <Button label="HOTELS" icon={<OfficeBuildingIcon />} className="space-x-2" />
                    </Link>
                    <Link to="/postImage">
                        <Button label="Post Image" className="space-x-2" />
                    </Link>
                </div>
                <div className="flex flex-row space-x-4 pr-10">
                    <Link to="/login">
                        <Button label="LOGIN" icon={<LoginIcon />} className="space-x-2 pr-10" />
                    </Link>
                </div>
            </>
        )}
        </header>
    );
}

export default Header;
