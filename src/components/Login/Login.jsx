import React from "react";
import { useLogin } from '../../hook/allHook';
import "./Login.css";

const Login = () => {
    const {
        name, email, pass, 
        setName, setEmail, setPass,
        linkReg, sendLogin, errorLogin,
    } = useLogin();

    return (
        <div className="form-login-container">
            <div className="form">
                <h2>Login</h2>
                {errorLogin && <div style={{ color: 'red' }}>{errorLogin}</div>}

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
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />

                <input className="button" type="submit" value="Send" onClick={sendLogin} />
                <p style={{ display: "flex", justifyContent: "center", fontSize: "16px" }}>OR</p>
                <input className="but-reg" type="submit" value="Registration" onClick={linkReg} />
            </div>
        </div>
    );
}

export default Login;
