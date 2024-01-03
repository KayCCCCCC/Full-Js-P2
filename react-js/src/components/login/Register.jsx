import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from "../../utils/apiRouter";
const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setconfirmPass] = useState('');
    const navigate = useNavigate();
    const defaultValueInput = {
        isvalidEmail: true,
        isvalidName: true,
        isvalidPhone: true,
        isvalidPassword: true,
        isvalidConformPass: true
    }

    // useEffect(() => {
    //     const postApi = async () => {
    //         await axios.post('http://localhost:5000/api/v2/auth/register', {
    //             email, phone, name, password, confirmPass
    //         })
    //     }
    //     postApi();
    //     console.log(1)
    // }, [])

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
        if (!name) {
            toast.error('User Name is required');
            setObjectInput({ ...defaultValueInput, isvalidName: false })
            return false;
        }
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
        if (!phone) {
            toast.error('Phone is required');
            setObjectInput({ ...defaultValueInput, isvalidPhone: false })
            return false;
        }
        if (!password) {
            toast.error('Password is required');
            setObjectInput({ ...defaultValueInput, isvalidPassword: false })
            return false;
        }
        if (password !== confirmPass) {
            setObjectInput({ ...defaultValueInput, isvalidConformPass: false })
            toast.error('Your password is not the same');
            setObjectInput({ ...defaultValueInput, isvalidConformPass: false })
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        let userData = {
            email: email,
            name: name,
            phone: phone,
            password: password,
            confirmPass: confirmPass
        };
        if (validateInput()) {

            try {
                const response = await axios.post(registerRoute, {
                    email: email,
                    phone: phone,
                    name: name,
                    password: password,
                    confirmPass: confirmPass
                });

                if (response.data && response.data.data) {
                    // Registration successful
                    console.log('Registration successful', response.data.data);
                    toast.success('Register successful');
                    navigate('/login')
                    setEmail('');
                    setName('');
                    setPhone('');
                    setPassword('');
                    setconfirmPass('');
                } else if (response.data && response.data.msg) {
                    // Email already exists
                    console.warn('Email already exists', response.data.msg);
                    toast.warn(response.data.msg);
                } else {
                    // Handle other response scenarios if needed
                    console.error('Unexpected response:', response.data);
                    toast.error('Unexpected response');
                }
            } catch (error) {
                // Handle errors
                console.error('Registration failed', error.response ? error.response.data : error.message);
                toast.error('Registration failed');
            }
        }
        console.log('>>> check Data: ', userData);
    };

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleRegister(event);
        }
        console.log('Enter')
    };
    return (
        <div className="App grid grid-cols-12  bg-slate-300 min-h-screen">
            {/* SERN Info Section - Hidden on Small Screen */}
            <div className="col-span-7 flex flex-col gap-14 items-center mt-[25%]">
                <div className="text-5xl font-bold text-blue-500">
                    Hello world! with SERN
                </div>
                <div className="text-2xl font-semibold">SQL + Express + React + Node</div>
            </div>

            {/* Registration Form Section */}
            <div className="col-span-5 mt-[10%]">
                <div className="form max-w-md bg-gray-50 p-6 rounded shadow-lg">
                    <div className="flex items-center justify-center font-bold text-lg">
                        Create an Account
                    </div>
                    {/* Username */}
                    <div className="input-container mb-4">
                        <label className="block text-gray-700">Username </label>
                        <input
                            type="text"
                            name="name"
                            required
                            className={objectInput.isvalidName ? 'mt-1 p-2 border rounded w-full' : inputClasses}
                            placeholder="Your username"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="input-container mb-4">
                        <label className="block text-gray-700">Email </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className={objectInput.isvalidEmail ? 'mt-1 p-2 border rounded w-full' : inputClasses}
                            placeholder="name@company.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    {/* Phone */}
                    <div className="input-container mb-4">
                        <label className="block text-gray-700">Phone </label>
                        <input
                            type="number"
                            name="phone"
                            required
                            className={objectInput.isvalidPhone ? 'mt-1 p-2 border rounded w-full' : inputClasses}
                            placeholder="Your phone number"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="input-container mb-4">
                        <label className="block text-gray-700">Password </label>
                        <input
                            type="password"
                            name="password"
                            required
                            className={objectInput.isvalidPassword ? 'mt-1 p-2 border rounded w-full' : inputClasses}
                            placeholder="••••••••"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => handleEnter(event)}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="input-container mb-4">
                        <label className="block text-gray-700">Confirm Password </label>
                        <input
                            type="password"
                            name="confirm-password"
                            required
                            className={objectInput.isvalidConformPass ? 'mt-1 p-2 border rounded w-full' : inputClasses}
                            placeholder="••••••••"
                            value={confirmPass}
                            onChange={(event) => setconfirmPass(event.target.value)}
                            onKeyDown={(event) => handleEnter(event)}
                        />
                    </div>

                    {/* Terms and Conditions Checkbox */}
                    {/* <div className="flex items-start mb-4">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    aria-describedby="terms"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="terms"
                                    className="font-light text-gray-500 dark:text-gray-300"
                                >
                                    I accept the{" "}
                                    <NavLink
                                        to="#"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Terms and Conditions
                                    </NavLink>
                                </label>
                            </div>
                        </div> */}

                    {/* Submit Button */}
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700 w-full"
                            onClick={(event) => handleRegister(event)}
                        >
                            Create an account
                        </button>
                    </div>


                    {/* Login Link */}
                    <div className="flex justify-center mt-4 text-gray-400 cursor-pointer">
                        <span className="hover:underline hover:text-blue-500">
                            Already have an account?
                            <NavLink to={"/login"}>Login here</NavLink>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
