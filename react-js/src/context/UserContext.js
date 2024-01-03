import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserAccount } from "../utils/apiRouter";
const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoading: true,
        isAuthenticated: false,
        token: '',
        account: {}
    });

    const loginContext = (userData) => {
        // console.log('Setting user context:', userData);
        setUser({
            isLoading: false,
            isAuthenticated: userData.isAuthenticated,
            token: userData.token,
            account: userData.account
        });
        // console.log('User context after setting (inside loginContext):', user);
    };

    const logoutContext = () => {
        setUser({
            isLoading: true,
            isAuthenticated: false,
            token: '',
            account: {},
        });
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${getUserAccount}`, { withCredentials: true });
            let roles = response.data.data.user.group.roles;
            let email = response.data.data.user.email;
            let name = response.data.data.user.name;

            const data = {
                isLoading: false,
                isAuthenticated: true,
                token: response.data.token,
                account: {
                    roles, email, name
                }
            };

            setUser(data)
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    // useEffect(() => {
    //     fetchUser();
    // }, [window.location.reload])


    // console.log('User context before return (inside UserProvider):', user);
    // console.log('>>> check set', user.isAuthenticated)

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
