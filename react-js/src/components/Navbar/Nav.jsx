import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
    const [activeLink, setActiveLink] = useState(null);
    const [isHome, setIsHome] = useState(false)
    const location = useLocation();
    // Tailwind CSS classes
    const navLinkStyle = "block float-left text-white text-center py-2 px-4 text-base no-underline hover:bg-gray-300 hover:text-black";
    const activeLinkStyle = "bg-green-500 text-black";
    const { user } = useContext(UserContext);
    // Function to handle link click
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    // Update active link on route change
    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    if (user && user.isAuthenticated === true || location.pathname === '/user') {
        return (
            <React.Fragment>
                <div className="bg-black overflow-hidden">
                    <NavLink
                        to="/user"
                        className={`${navLinkStyle} ${activeLink === "/user" ? activeLinkStyle : ""}`}
                        onClick={() => handleLinkClick("/user")}
                    >
                        User
                    </NavLink>
                    <NavLink
                        to="/project"
                        className={`${navLinkStyle} ${activeLink === "/project" ? activeLinkStyle : ""}`}
                        onClick={() => handleLinkClick("/project")}
                    >
                        Project
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={`${navLinkStyle} ${activeLink === "/about" ? activeLinkStyle : ""}`}
                        onClick={() => handleLinkClick("/about")}
                    >
                        About
                    </NavLink>

                </div>
            </React.Fragment>
        );
    } else if (location.pathname === '/login') {
        return <React.Fragment></React.Fragment>
    }

};

export default Navbar;
