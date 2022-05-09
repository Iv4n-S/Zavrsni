import React from "react";
import { Link } from "react-router-dom";
import Button from "./Components/Button.js";
import {
  HomeIcon,
  LoginIcon,
  LogoutIcon,
} from "@heroicons/react/solid";
import cx from "classnames";

function Header(props) {
  const HeaderStyle = cx({
    "flex py-4 justify-center align-center drop-shadow bg-cyan-500 text-white": true,
  });

  return (
    <header className={HeaderStyle}>
      {props.isLoggedIn ? (
        <div className="flex md:flex-row flex-col space-y-2">
            <div className="flex flex-row space-x-4">
                <Link to="/">
                <Button label="HOME" icon={<HomeIcon  />} className="space-x-2" />
                </Link>
            </div>
            <div className="flex justify-center">
                <Button
                label="LOGOUT"
                onClick={props.logOut}
                icon={<LogoutIcon />}
                className="space-x-2"
                />
            </div>
        </div>
      ) : (
        <div className="flex flex-row space-x-4">
            <Link to="/">
                <Button label="HOME" icon={<HomeIcon />} className="space-x-2"/>
            </Link>
            <Link to="/login">
                <Button label="LOGIN" icon={<LoginIcon />} className="space-x-2" />
            </Link>
            <Link to="/postImage">
                <Button label="Post Image" className="space-x-2" />
            </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
