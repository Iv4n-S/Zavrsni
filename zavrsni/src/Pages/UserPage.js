import React from "react";
import { useNavigate } from "react-router-dom";
import { NETWORK_CONFIG, API_CONFIG } from "../AppData/Constants";
import Button from "../Components/Button";
import cx from "classnames";
import Card from "../Components/Card";
import Input from "../Components/Input";
import {
    LockClosedIcon,
    MailIcon,
    HomeIcon,
    UserIcon,
    PhoneIcon,
    UserCircleIcon,
  } from "@heroicons/react/solid";


function UserPage(props) {
    const [error, setError] = React.useState();
    const [user, setUser] = React.useState();
    const [initialUser, setInitialUser] = React.useState();
    const [password2, setPassword2] = React.useState();
    const [edit, setEdit] = React.useState(false);
    const [userChanged, setUserChanged] = React.useState();
    let navigate = useNavigate();


    React.useEffect(() => {
        const options = {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        };
        fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.currentUser, options)
            .then((response) => {
                if(!response.ok) {
                    navigate("/");
                }
                else {
                    response.json().then((value) => {
                        setUser(value);
                        setInitialUser(value);
                        setPassword2(value.password);
                    })
                }
            })
        .catch(() =>
            navigate("/")
        );
    }, [])

    function onChange(event) {
        const { name, value } = event.target;

        setUser((oldForm) => ({
          ...oldForm,
          [name]: value,
        }));
    }

    function changePass2(event) {
        setPassword2(event.target.value);
    }

    function onSubmit() {
        setError("");
        if(user.password != password2) {
            setError("New password and repeated password don't match!");
        } 
        else {
            const body = `{
                "username": "${user.username}",
                "email": "${user.email}",
                "name": "${user.name}",
                "surname": "${user.surname}",
                "phoneNumber": "${user.phoneNumber}",
                "address": "${user.address}",
                "password": "${user.password}"
            }`;

            const options = {
            method: "PUT",
            body: body,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
            };
    
            fetch(NETWORK_CONFIG.apiFullHost + API_CONFIG.userEndpoint, options)
            .then((response) => {
                if (!response.ok) {
                    setError("Updating profile failed");
                } else {
                    navigate("/user");
                }
            })
            .catch((error) => {
                setError("Updating profile failed");
            });
            setEdit(false);
        
        }
    }
    

    const FormStyle = cx({
        "flex flex-col items-center w-full px-6 pt-2": true,
    });

    const ButtonStyle = cx({
        "flex justify-between pt-3": true,
    });
    


    return(
        <div>
            <div className="flex justify-center">
                {user == undefined ? (<></>) : (
                    <p className="text-xxxl py-5 text-slate-400">Welcome {user.username}!</p>
                )}
            </div>
            {user == undefined ? (<></>) : (
                <div className="flex justify-center">
                    <Card className="md:w-1/3 w-96">
                        <div className={FormStyle}>
                        <Input
                            icon={<UserCircleIcon />}
                            name="username"
                            onChange={onChange}
                            value={user.username}
                            placeholder="Username"
                            required={true}
                            disabled={!edit}
                        />
                        <Input
                            icon={<MailIcon />}
                            type="email"
                            name="email"
                            onChange={onChange}
                            value={user.email}
                            placeholder="E-mail"
                            required={true}
                            disabled={!edit}
                        />
                        <Input
                            icon={<UserIcon />}
                            name="name"
                            onChange={onChange}
                            value={user.name}
                            placeholder="First Name"
                            required={true}
                            disabled={!edit}
                        />
                        <Input
                            icon={<UserIcon />}
                            name="surname"
                            onChange={onChange}
                            value={user.surname}
                            placeholder="Last Name"
                            required={true}
                            disabled={!edit}
                        />
                        <Input
                            icon={<PhoneIcon />}
                            name="phoneNumber"
                            onChange={onChange}
                            value={user.phoneNumber}
                            placeholder="Phone Number"
                            required={true}
                            disabled={!edit}
                        />
                        <Input
                            icon={<HomeIcon />}
                            name="address"
                            onChange={onChange}
                            value={user.address}
                            placeholder="Address"
                            required={true}
                            disabled={!edit}
                        />
                        <Input
                            icon={<LockClosedIcon />}
                            type="password"
                            name="password"
                            onChange={onChange}
                            value={user.password}
                            placeholder="Password"
                            required={false}
                            disabled={!edit}
                        />
                        <Input
                            icon={<LockClosedIcon />}
                            type="password"
                            name="password2"
                            onChange={changePass2}
                            value={password2}
                            placeholder="Repeat Password"
                            required={false}
                            disabled={!edit}
                        />
                        {error && (
                            <div className="border-red-100 rounded p-2 text-red-700 mb-2 bg-red-100">
                                {error}
                            </div>
                        )}
                        {edit ? (
                            <div className={ButtonStyle}>
                                <Button label="Save" type="submit" onClick={onSubmit}/>
                                <Button
                                    type="button"
                                    className="bg-gray-100 rounded text-gray-900"
                                    label="Cancel"
                                    onClick={() => {
                                        setUser(initialUser);
                                        setEdit(false);
                                        setPassword2(initialUser.password);
                                    }}
                                />
                            </div>
                            )
                            :
                            (
                            <div className={ButtonStyle}>
                                <Button
                                    type="button"
                                    className="bg-gray-100 rounded text-gray-900"
                                    label="Edit"
                                    onClick={() => {
                                        setEdit(true);
                                    }}
                                />
                            </div>
                            )
                        }
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default UserPage;
