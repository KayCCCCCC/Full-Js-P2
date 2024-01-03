import React, { useEffect, useContext, useState } from "react";
import { Outlet, useNavigate, useLocation, useLoaderData } from "react-router-dom";
import Navbar from "./components/Navbar/Nav";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "./context/UserContext";
import axios from "axios";
import { getUserAccount } from "./utils/apiRouter";
import { BallTriangle } from 'react-loader-spinner'

const App = () => {
  const [isShow, setIsShow] = React.useState(false);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);


  useEffect(() => {
    console.log('>>> check user set in App: ', user);
    if (user.isAuthenticated === true) {
      setIsShow(true);
      navigate('/user');
    } else {
      setIsShow(false)
      navigate('/login');
    }
  }, [navigate, user.isAuthenticated]);

  return (
    <React.Fragment>
      {user.isAuthenticated === true && isShow === true && <Navbar />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* {user.isLoading === true ?
        <div className="flex justify-center items-center content-center min-h-screen py-14">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <div>Loading data...</div>
        </div>
        :
        <Outlet />} */}
      <Outlet />

    </React.Fragment>
  );
};

export default App;
