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
    "flex flex-col items-center w-full": true,
  });

  const ButtonStyle = cx({
    "flex justify-between": true,
  });

  const InputStyle = cx({
    "md:w-80 w-auto": true,
  });

  return (
    <div className="flex justify-center">
      <Card title="Register your account" className="md:w-1/3 w-96">
        <form onSubmit={onSubmit}>
          <div className={FormStyle}>
            <Input
                icon={<UserCircleIcon fill="gray" />}
                name="username"
                onChange={onChange}
                value={registerForm.username}
                placeholder="Username"
                required={true}
            />
            <Input
                icon={<MailIcon fill="gray" />}
                type="email"
                name="email"
                onChange={onChange}
                value={registerForm.email}
                placeholder="E-mail"
                required={true}
            />
            <Input
                icon={<UserIcon fill="gray" />}
                name="name"
                onChange={onChange}
                value={registerForm.name}
                placeholder="First Name"
                required={true}
            />
            <Input
                icon={<UserIcon fill="gray" />}
                name="surname"
                onChange={onChange}
                value={registerForm.surname}
                placeholder="Last Name"
                required={true}
            />
            <Input
                icon={<PhoneIcon fill="gray" />}
                name="phoneNumber"
                onChange={onChange}
                value={registerForm.phoneNumber}
                placeholder="Phone Number"
                required={true}
            />
            <Input
                icon={<HomeIcon fill="gray" />}
                name="address"
                onChange={onChange}
                value={registerForm.address}
                placeholder="Address"
                required={true}
            />
            <Input
                icon={<LockClosedIcon fill="gray" />}
                type="password"
                name="password"
                onChange={onChange}
                value={registerForm.password}
                placeholder="Password"
                required={true}
            />
            <Input
                icon={<LockClosedIcon fill="gray" />}
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
                <Button label="Register" type="submit" />
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
