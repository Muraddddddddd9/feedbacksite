import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../hook/allHook'
import { navbar } from '../data';

import { LogoInNavbar } from '../../SVGimg/SVG';

const Navbar = ({ onSelect }) => {
    const { userMainData, errorUserMainData } = useUserData();
    const [dataUser, setDataUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userMainData && userMainData.length > 0) {
            setDataUser(userMainData[0]);
        }
    }, [userMainData]);

    function Logout() {
        navigate("/");
        localStorage.setItem("login", false);
        localStorage.setItem("loginStatus", "Logged out successfully");
    }

    return (
        <nav>
            <ul>
                <li onClick={() => onSelect("Links")}>
                    <LogoInNavbar />
                    Links
                </li>
                {navbar.map(nav => {
                    if (nav.id === 3 || (dataUser && dataUser.status === "admin")) {
                        return (
                            <li
                                key={nav.id}
                                onClick={() => onSelect(nav.link)}
                            >
                                {nav.name}
                            </li>
                        )
                    } else {
                        return null;
                    }
                })}
                <li onClick={Logout}>Exite</li>
            </ul>
        </nav>
    );
}

export default Navbar;
