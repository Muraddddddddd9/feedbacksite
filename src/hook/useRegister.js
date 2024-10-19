import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { mainLink } from '../components/data'

function useRegister() {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    useEffect(() => {
        const loginData = localStorage.getItem("userIDandCookieKeyForLoginAndRegister");
        if (loginData) {
            navigate("/home", { replace: true });
        }
        const loginStatus = localStorage.getItem("loginStatus");
        if (loginStatus) {
            setTimeout(() => {
                localStorage.clear();
                window.location.reload();
            }, 10);
        }
    }, [navigate]);

    function linkLogin() {
        navigate("/");
    }

    function sendRegis() {
        if (name === '' || email === '' || pass1 === '' || pass2 === '') {
            console.log("Please fill in all fields");
            return;
        }

        if (pass1 !== pass2) {
            console.log("Passwords do not match");
            return;
        }

        const regisData = {
            name: name,
            email: email,
            password: pass2,
        };

        fetch(`${mainLink}/register`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(regisData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                setRegisterData(data);
                navigate('/')
            })
            .catch(err => console.log("Error registering: ", err));
    }

    return {
        registerData, name,
        email, pass1, pass2,
        setName, setEmail,
        setPass1, setPass2,
        linkLogin, sendRegis,
    };
}

export default useRegister;
