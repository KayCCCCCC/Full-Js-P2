import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getListCustomer, deleteCustomer, createCustomer, updateCustomer, getCustomer, getUserAccount, logoutRoute } from "../../utils/apiRouter";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import ConfirmDeleteModal from "../modal/modalDelete";
import CreateUserModal from "../modal/modalCreate";
import UpdateUserModal from "../modal/modalUpdate";
import { UserContext } from "../../context/UserContext";


const UserPage = () => {
    const [listUser, setListUser] = useState([]);
    const [count, setCount] = useState(0);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const { user, loginContext, logoutContext } = useContext(UserContext)
    //  Refresh data
    const [dataChanged, setDataChanged] = useState(false);
    const handleDataChange = () => {
        setDataChanged(true);
        setTimeout(() => setDataChanged(false), 1000);
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPass: "",
        groupId: "",
    });

    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState({
        name: "",
        email: "",
        phone: "",
        groupId: "",
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page");


    const BearToken = localStorage.getItem('BearToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${BearToken}`;

    console.log('>>> check bearToken: ', BearToken)
    // const { user } = useContext(UserContext)
    // console.log('>>>> check user context: ', user)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${getListCustomer}?page=${page ? page : 1}`, { withCredentials: true });
                if (response && response.data && response.data.data) {
                    setListUser(response.data.data);
                    setCount(response.data.count || 0);
                }
            } catch (error) {
                console.error(error);
                toast.error(error.response.data.msg);
                setCount(0);
            }
        };

        fetchData();
    }, [page, dataChanged]);

    const handleChangePage = (e, value) => {
        navigate(`/user?page=${value}`);
    };


    //Create User
    const handleCreateUser = () => {
        setCreateModalOpen(true);
    };

    const handleChange = (field) => (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: event.target.value,
        }));
        setSelectedValue(event.target.value);
    };

    const handleConfirmCreate = async () => {
        try {
            const response = await axios.post(createCustomer, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                groupId: formData.groupId,
            }, { withCredentials: true });

            if (response.data && response.data.data) {
                await handleDataChange();
                toast.success('User created successfully');
            } else {
                toast.error('Failed to create user');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.msg);
        } finally {
            setCreateModalOpen(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                confirmPass: "",
                groupId: ""
            });
        }
    };


    //Update User
    const handleUpdateUser = async (item) => {
        try {
            const response = await axios.get(`${getCustomer}/${item.id}`);
            if (response && response.data && response.data.data) {
                setUserToUpdate(response.data.data);
                setUpdateModalOpen(true);
            } else {
                toast.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.msg);
        }
    };

    // const handleSelectChange = (event) => {
    //     setSelectedValue(event.target.value);
    //     setUserToUpdate({
    //         ...userToUpdate,
    //         groupId: event.target.value,
    //     });
    // };

    const handleChangeUpdate = (field) => (event) => {
        setSelectedValue(event.target.value);
        setUserToUpdate({ ...userToUpdate, [field]: event.target.value });
    };

    const handleConfirmUpdate = async () => {
        try {
            // await axios.patch(`${updateCustomer}/${userToUpdate.id}`, userToUpdate, { withCredentials: true });
            await axios.patch(`${updateCustomer}`, userToUpdate, { withCredentials: true });
            handleDataChange();
            toast.success("User updated successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.msg);
        } finally {
            setUpdateModalOpen(false);
            setUserToUpdate({
                name: "",
                email: "",
                phone: "",
                groupId: "",
            });
        }
    };

    //Delete User
    const handleDeleteUser = (item) => {
        setUserToDelete(item);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            // const response = await axios.delete(`${deleteCustomer}/${userToDelete.id}`, { withCredentials: true });
            const response = await axios.delete(`${deleteCustomer}`, { data: userToDelete, withCredentials: true });
            handleDataChange();
            if (response.status === 200) {
                toast.success("User deleted successfully");
            } else {
                toast.error("Failed to delete user");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.msg);
        } finally {
            setDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post(logoutRoute, {}, {
                withCredentials: true,
            });


            logoutContext();
            console.log('>>> check out: ', user);
            navigate('/login')

            if (response.status === 200) {
                // navigate('/login');
            } else {
                console.error('Logout failed with status code:', response.status);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    // get account
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${getUserAccount}`, { withCredentials: true });
            console.log('>>> check response: ', response)
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

            loginContext(data);
        } catch (error) {
            console.error('Error fetching user:', error);
            if (error.response.data.msg === 'jwt expired') {
                navigate('/login')
            }
        }
    }
    // const fetchUser = async () => {
    //     let response = await axios.get(`${getUserAccount}`, { withCredentials: true });
    //     // console.log('>> check data client: ', response.data.token)
    //     let roles = response.data.data.user.group.roles;
    //     let email = response.data.data.user.email;
    //     let name = response.data.data.user.name;
    //     let data = {
    //         isLoading: false,
    //         isAuthenticated: true,
    //         token: response.data.token,
    //         account: {
    //             roles, email, name
    //         }
    //     }

    //     loginContext(data);
    // }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <React.Fragment>
            <div className="max-w-full grid grid-cols-12 p-2">
                <div className="col-span-7 flex justify-end font-bold text-2xl items-center mr-4">Table User</div>
                <div className="col-span-5 flex justify-end">
                    <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCreateUser}
                    >
                        Add new User
                    </button>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-separate border border-gray-500 dark:border-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 border-gray-700">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3 border-gray-700">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 border-gray-700">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 border-gray-700">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3 border-gray-700">
                                GroupName
                            </th>
                            <th scope="col" className="px-6 py-3 border-gray-700">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser.map((item, index) => (
                            <tr className="hover:bg-gray-300 " key={item.id}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-gray-500">
                                    {item.id}
                                </th>
                                <td className="px-6 py-4 border-gray-500">{item.name}</td>
                                <td className="px-6 py-4 border-gray-500">{item.email}</td>
                                <td className="px-6 py-4 border-gray-500">{item.phone}</td>
                                <td className="px-6 py-4 border-gray-500">{item.group.name}</td>
                                <td className="px-6 py-4 border-gray-500">
                                    <button
                                        className="p-2 px-3 rounded bg-green-500 text-black  hover:bg-green-700 mr-6"
                                        onClick={() => handleUpdateUser(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="p-2 px-3 rounded bg-purple-500 text-black  hover:bg-purple-700"
                                        onClick={() => handleDeleteUser(item)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                className="h-20 flex justify-end"
                count={Math.ceil(Number.isNaN(count) ? 10 : count / 7)}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}
            />
            <ConfirmDeleteModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                name={userToDelete ? userToDelete.name : ""}
            />
            <CreateUserModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onConfirm={handleConfirmCreate}
                formData={formData}
                selectedValue={selectedValue}
                handleChange={handleChange}
            />
            <UpdateUserModal
                open={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                onUpdate={handleConfirmUpdate}
                userData={userToUpdate}
                selectedValue={selectedValue}
                handleChange={handleChangeUpdate}
            // handleSelectChange={handleChangeUpdate}
            />
        </React.Fragment>
    );
};

export default UserPage;
