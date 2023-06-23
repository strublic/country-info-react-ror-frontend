import React, {useEffect, useState} from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { useAppState } from "../AppState";

const Auth = (props) => {
    const type = useParams().form;
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    const [userData, setUserData] = useState();
    const {state, dispatch} = useAppState();
    const navigate = useNavigate()

    useEffect(() => {
        if (userData && userData.user){
            const {token, user } = userData;
            dispatch ({type: "auth", payload: {token, username: user.username}});
            window.localStorage.setItem("auth", JSON.stringify({token, username: user.username}))
            navigate("/")
        }
    }, [userData])
    
    const actions = {
        signup: () => {
            return fetch(state.url + "users", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
            .catch((error) => console.log("Error: ", error.message));
        },
        login: () => {
            return fetch(state.url + "login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            }).then((response) => response.json())
            .catch((error) => console.log("Error: ", error.message));
        },
    };

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        actions[type]().then((data) => {
            setUserData(data);
        });
    }
    
    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" value={formData.username} onChange={handleChange}/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}/>
                    <input type="submit" value={type}/>
                </form>
            </div>
            <h1>{type}</h1>
        </>
    );
}

export default Auth