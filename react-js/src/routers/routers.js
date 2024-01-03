import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Login from "../components/login/Login";
import Register from "../components/login/Register";
import UserPage from "../components/pages/userPage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "user",
                element: <UserPage />,
            },

        ]
    },

]);
export default router;