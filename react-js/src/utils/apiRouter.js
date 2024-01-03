const host = "http://localhost:5000/api/v2";

//auth
export const loginRoute = `${host}/auth/login`
export const registerRoute = `${host}/auth/register`
export const getUserAccount = `${host}/auth/account`
export const logoutRoute = `${host}/auth/logout`

//customer
export const createCustomer = `${host}/cus/create`
export const getListCustomer = `${host}/cus/list-user`
export const getCustomer = `${host}/cus/get`
export const updateCustomer = `${host}/cus/update`
export const deleteCustomer = `${host}/cus/delete`
