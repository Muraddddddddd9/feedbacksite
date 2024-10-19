import React, { useState, useEffect } from "react";
import "./Register.css";
import { useRegister } from "../../hook/allHook";

const Register = () => {
    const { registerData, name,
        email, pass1, pass2,
        setName, setEmail,
        setPass1, setPass2,
        linkLogin, sendRegis, } = useRegister()

    return (
        <div className="form-register-container">
            <div className="form">
                <h2>Registration</h2>
                <label>Username</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    value={pass1}
                    onChange={(e) => setPass1(e.target.value)}
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    value={pass2}
                    onChange={(e) => setPass2(e.target.value)}
                />

                <input className="button" type="submit" value="Send" onClick={sendRegis} />
                <p style={{ display: "flex", justifyContent: "center", fontSize: "16px" }}>OR</p>
                <input className="but-reg" type="submit" value="Login" onClick={linkLogin} />
            </div>
        </div>
    );
}

export default Register;
