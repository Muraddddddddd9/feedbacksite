import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainLink } from '../components/data'

function useLogin() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [errorLogin, setErrorLogin] = useState(null);

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

    function linkReg() {
        navigate("/regstr");
    }

    function sendLogin() {
        const loginData = {
            name: name,
            email: email,
            password: pass,
        };

        fetch(`${mainLink}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(loginData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setLoginData(data);
                localStorage.setItem("userIDandCookieKeyForLoginAndRegister", `${data.cookieKey}`);
                navigate('/home', { replace: true });
            })
            .catch(error => setErrorLogin(error.message));
    }

    return {
        loginData, name,
        email, pass, errorLogin,
        setName, setEmail, setPass,
        linkReg, sendLogin,
    };
}

export default useLogin;
