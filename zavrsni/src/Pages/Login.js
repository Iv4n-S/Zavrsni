import React from "react";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";
import { NETWORK_CONFIG, API_CONFIG } from "../AppData/Constants";
import cx from "classnames";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { MailIcon, LockClosedIcon } from "@heroicons/react/solid";
import { saveTokenInLocalStorage } from "../AuthService";

function Login(props) {
    const [loginForm, setLoginForm] = React.useState({ usernameOrEmail: "", password: "", isAdmin: false });
    const [error, setError] = React.useState("");
    let navigate = useNavigate();

    React.useEffect(() => {
        console.log(localStorage.getItem('historyPage'));
        console.log(JSON.parse(localStorage.getItem('historyCapacity')));
        console.log(JSON.parse(localStorage.getItem('historyDates')));
    })

    function onChange(event) {
        const { name, value } = event.target;
        setLoginForm((oldForm) => ({ ...oldForm, [name]: value }));
    }

    function onSubmit(e) {
    e.preventDefault();
    setError("");

    const body = `{
            "UsernameOrEmail": "${loginForm.usernameOrEmail}",
            "Password": "${loginForm.password}"
        }`;

    const options = {
        method: "POST",
        body: body,
        headers: { "Content-Type": "application/json" },
    };

    fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.loginEndpoint, options)
        .then((response) => {
        if (!response.ok) {
            props.setLoggedIn(false);
            setError("Wrong username or password!");
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
                if(localStorage.getItem('historyPage') != null) {
                    if(JSON.parse(localStorage.getItem('historyPage')) == 'hotelpage') {
                        navigate("/hotelpage", {state : { hotel: JSON.parse(localStorage.getItem('historyCapacity')), selectedDates: JSON.parse(localStorage.getItem('historyDates')) }});
                    }
                    else if(JSON.parse(localStorage.getItem('historyPage')) == 'transport') {
                        navigate("/transport", {state : { filteredTransports: JSON.parse(localStorage.getItem('historyCapacity')), selectedDate: JSON.parse(localStorage.getItem('historyDates')) }});
                    }
                }
                else {
                    navigate("/");
                }
            }).catch((error) => setError("Wrong username or password!"));
        }
        })
        .catch((error) => setError("Wrong username or password!"));
    }

    const FormStyle = cx({
        "flex flex-col items-center w-full px-6": true,
    });

    const ButtonStyle = cx({
        "flex justify-between pt-3": true,
    });

    return (
        <div className="flex justify-center">
            <Card title="Login to browse the site" className="md:w-1/3 w-auto">
            <form onSubmit={onSubmit}>
                <div className={FormStyle}>
                <Input
                    icon={<MailIcon />}
                    name="usernameOrEmail"
                    placeholder="Enter Your Username or Email"
                    onChange={onChange}
                    value={loginForm.usernameOrEmail}
                    required={true}
                />
                <Input
                    icon={<LockClosedIcon />}
                    name="password"
                    type="password"
                    placeholder="Enter Your Password"
                    onChange={onChange}
                    value={loginForm.password}
                    required={true}
                />
                {error && (
                    <div className="border-red-100 rounded p-2 text-red-700 mb-2 bg-red-100">
                        {error}
                    </div>
                )}
                <div className={ButtonStyle}>
                    <Button label="Login" type="submit" onSubmit={onSubmit} />
                    <Button
                    className="bg-gray-100 rounded text-gray-900"
                    label="Register"
                    onClick={() => {
                        navigate("/register");
                    }}
                    />
                </div>
                </div>
            </form>
            </Card>
        </div>
    );
}

export default Login;
