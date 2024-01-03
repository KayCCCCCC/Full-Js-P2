import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import { loginRoute } from "../../utils/apiRouter";
import { UserContext } from "../../context/UserContext";
const Login = () => {

    const { user, loginContext } = useContext(UserContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (user.isAuthenticated === false) {
            navigate('/login');
        }
    }, [])

    const defaultValueInput = {
        isvalidEmail: true,
        isvalidPassword: true,
    }
    const [objectInput, setObjectInput] = useState(defaultValueInput)
    //    const invalidInput = "mt-1 p-2 border rounded w-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-600 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
    const inputClasses = `
  mt-1 p-2 border rounded w-full
  focus:outline-none focus:ring focus:border-blue-300

  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none

  invalid:border-red-600 invalid:text-pink-600
  focus:invalid:border-red-500 focus:invalid:ring-red-400
`;
    const validateInput = () => {
        setObjectInput(defaultValueInput);
        if (!email) {
            toast.error('Email is required');
            setObjectInput({ ...defaultValueInput, isvalidEmail: false })
            return false;
        }
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            toast.error('Please enter a valid email');
            setObjectInput({ ...defaultValueInput, isvalidEmail: false })
            return false;
        }
        if (!password) {
            toast.error('Password is required');
            setObjectInput({ ...defaultValueInput, isvalidPassword: false })
            return false;
        }
        return true;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Your form validation logic here
        if (validateInput()) {
            try {
                const response = await axios.post(loginRoute, {
                    email: email,
                    password: password,
                }, { withCredentials: true });

                if (response.status === 200 && response.data && response.data.data) {
                    console.log(response.headers);
                    console.log('Login successful', response.data);
                    toast.success(response.msg);
                    setEmail('');
                    setPassword('');



                    let roles = response.data.data.group.roles;
                    let email = response.data.data.email;
                    let name = response.data.data.name;

                    let data = {
                        isAuthenticated: true,
                        token: response.data.access_token,
                        account: {
                            roles, email, name
                        }
                    }


                    //sessionStorage
                    // sessionStorage.setItem('account', JSON.stringify(data))
                    localStorage.setItem('BearToken', response.data.access_token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
                    //context
                    loginContext(data)
                    navigate('/user')

                    // window.location.reload()


                } else {
                    console.error('Unexpected response:', response.data);
                    toast.error('Unexpected response');
                }
            } catch (error) {
                // console.error('Login failed', error.response ? error.response.data : error.message);
                console.error(error)
                toast.error(error.response.data.msg);
            }
        }
    };

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
        console.log('Enter')
    };

    return (
        <React.Fragment>
            <div className="App grid grid-cols-12 bg-slate-300 min-h-screen">
                <div className="col-span-7 flex flex-col gap-14 items-center mt-[25%]">
                    <div className="text-5xl font-bold text-blue-500">
                        Hello world! with SERN
                    </div>
                    <div className="text-2xl font-semibold">SQL + Express + React + Node</div>
                </div>

                <div className="col-span-5 mt-[25%]">
                    <div className="form max-w-md  bg-gray-50 p-6 rounded shadow-lg">
                        <div className="flex items-center justify-center font-bold text-lg">
                            Login Form
                        </div>

                        <div className="input-container mb-4">
                            <label className="block text-gray-700">Email </label>
                            <input
                                type="email"
                                name="email"
                                required
                                className={objectInput.isvalidEmail ? "mt-1 p-2 border rounded w-full" : inputClasses}
                                placeholder="name@company.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="input-container mb-4">
                            <label className="block text-gray-700">Password </label>
                            <input
                                type="password"
                                name="pass"
                                required
                                className={objectInput.isvalidPassword ? "mt-1 p-2 border rounded w-full" : inputClasses}
                                placeholder="••••••••"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onKeyDown={(event) => handleEnter(event)}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700 w-full"
                                onClick={(event) => handleSubmit(event)}
                            >
                                Submit
                            </button>
                        </div>

                        <div className="flex justify-center mt-2 text-gray-400 cursor-pointer">
                            <span className="hover:underline hover:text-blue-500">
                                Forgot your password?
                            </span>
                        </div>


                        <div className="border-t-2 my-4"></div>

                        <div className="flex justify-center content-center">
                            <NavLink to={"/register"} className="bg-green-400 text-white hover:bg-green-600 rounded p-2">
                                Create new a account?
                            </NavLink>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>

    );
};

export default Login;
