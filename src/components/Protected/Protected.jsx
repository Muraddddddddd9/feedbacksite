import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
    const navigate = useNavigate();
    const { Component } = props;

    useEffect(() => {
        const loginData = localStorage.getItem("userIDandCookieKeyForLoginAndRegister");
        if (!loginData) {
            localStorage.setItem("loginStatus", "Please login to view dashboard");
            navigate("/", { replace: true });
        }
        
    }, [navigate]);

    return <Component />;
}

export default Protected;
