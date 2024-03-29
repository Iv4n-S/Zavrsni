import React from "react";
import { useNavigate } from "react-router-dom";
import { NETWORK_CONFIG, API_CONFIG } from "../AppData/Constants";
import Button from "../Components/Button";
import cx from "classnames";
import Card from "../Components/Card";
import Input from "../Components/Input";
import { saveTokenInLocalStorage } from "../AuthService";

import {
  LockClosedIcon,
  MailIcon,
  HomeIcon,
  UserIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

function Register(props) {
  const [registerForm, setRegisterForm] = React.useState({});

  const [error, setError] = React.useState("");
  let navigate = useNavigate();

  function onChange(event) {
    const { name, value } = event.target;

    setRegisterForm((oldForm) => ({ ...oldForm, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    if(registerForm.password !== registerForm.password2) {
        setError("New password and repeated password don't match!");
        alert("New password and repeated password don't match!");

    }
    else {
        const body = `{
                "Username": "${registerForm.username}",
                "Email": "${registerForm.email}",
                "Name": "${registerForm.name}",
                "Surname": "${registerForm.surname}",
                "Phonenumber": "${registerForm.phoneNumber}",
                "Address": "${registerForm.address}",
                "Password": "${registerForm.password}"
            }`;

        const options = {
        method: "POST",
        body: body,
        headers: {
            "Content-Type": "application/json",
        },
        };

        fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.userEndpoint, options)
        .then((response) => {
            if (response.status !== 201) {
                setError("Register failed");
            } else {
                response.json().then((value) => {
                    saveTokenInLocalStorage(value);
                    props.setLoggedIn(true);
                    setTimeout(() => {
                        props.setLoggedIn(false);
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        localStorage.removeItem('expires');
                    }, Date.parse(value.expires) - Date.now());
                    navigate("/");
                }).catch((error) => setError("Register failed"));
            }
        }).catch((error) => {
            setError("Register failed");
        });
    }
  }

  const FormStyle = cx({
    "flex flex-col items-center w-full px-6": true,
  });

  const ButtonStyle = cx({
    "flex justify-between pt-3": true,
  });

  return (
    <div className="flex justify-center">
      <Card title="Register your account" className="md:w-1/3 w-auto">
        <form onSubmit={onSubmit}>
          <div className={FormStyle}>
            <Input
                icon={<UserCircleIcon />}
                name="username"
                onChange={onChange}
                value={registerForm.username}
                placeholder="Username"
                required={true}
            />
            <Input
                icon={<MailIcon />}
                type="email"
                name="email"
                onChange={onChange}
                value={registerForm.email}
                placeholder="E-mail"
                required={true}
            />
            <Input
                icon={<UserIcon />}
                name="name"
                onChange={onChange}
                value={registerForm.name}
                placeholder="First Name"
                required={true}
            />
            <Input
                icon={<UserIcon />}
                name="surname"
                onChange={onChange}
                value={registerForm.surname}
                placeholder="Last Name"
                required={true}
            />
            <Input
                icon={<PhoneIcon />}
                name="phoneNumber"
                onChange={onChange}
                value={registerForm.phoneNumber}
                placeholder="Phone Number"
                required={true}
            />
            <Input
                icon={<HomeIcon />}
                name="address"
                onChange={onChange}
                value={registerForm.address}
                placeholder="Address"
                required={true}
            />
            <Input
                icon={<LockClosedIcon />}
                type="password"
                name="password"
                onChange={onChange}
                value={registerForm.password}
                placeholder="Password"
                required={true}
            />
            <Input
                icon={<LockClosedIcon />}
                type="password"
                name="password2"
                onChange={onChange}
                value={registerForm.password2}
                placeholder="Repeat Password"
                required={true}
            />
            {error && (
                <div className="border-red-100 rounded p-2 text-red-700 mb-2 bg-red-100">
                    {error}
                </div>
            )}
            <div className={ButtonStyle}>
                <Button label="Register" type="submit"/>
                <Button
                    className="bg-gray-100 rounded text-gray-900"
                    label="Login"
                    onClick={() => {
                    navigate("/login");
                    }}
                />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Register;
