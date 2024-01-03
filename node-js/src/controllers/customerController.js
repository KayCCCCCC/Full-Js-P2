const db = require('../models/index');
const User = db.user
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
class customerController {
    static async createUser(req, res) {
        try {
            const { email, password, name, phone, groupId } = req.body;

            const checkEmail = async () => {
                let exitsUser = await User.findOne({
                    where: {
                        email: email
                    }
                });
                return exitsUser ? true : false;
            };

            if (!(await checkEmail())) {
                const hashPassWord = bcrypt.hashSync(password, salt);

                const userInfo = {
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashPassWord,
                    groupId: groupId
                };

                const user = await User.create(userInfo);
                res.status(200).send({
                    data: user
                });
            } else {
                res.status(400).send({
                    msg: 'Email is exist please enter a new email'
                });
            }
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async getListUsers(req, res) {
        try {
            const page = parseInt(req.query.page) || 1; // Parse the page from the request query or default to page 1
            const perPage = 7; // Number of users to show per page
            const offset = (page - 1) * perPage; // Calculate the offset based on the page

            const { count, rows: listUser } = await User.findAndCountAll({
                attributes: ['id', 'email', 'name', 'phone', 'groupId'],
                include: [
                    {
                        model: db.group,
                        attributes: ['name'],
                    }
                ],
                limit: perPage,
                offset: offset,
            });

            // Send the response after the promise is resolved
            res.status(200).send({
                count: count,
                data: listUser
            });
        } catch (error) {
            // Handle errors properly
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }


    // Assuming this is your getUserById method in your User controller
    static async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId, {
                attributes: ['id', 'email', 'name', 'phone', 'groupId'],
                include: [
                    {
                        model: db.group,
                        attributes: ['id', 'name']
                    }
                ]
            });

            if (!user) {
                return res.status(404).send('User not found');
            }

            // Send the response after the promise is resolved
            res.status(200).send({
                data: user
            });
        } catch (error) {
            // Handle errors properly
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }


    static async updateUser(req, res) {
        const userId = req.body.id;
        try {
            const user = await User.findByPk(userId);
            if (user) {
                const newData = {
                    name: req.body.name || user.name,
                    email: req.body.email || user.email,
                    phone: req.body.phone || user.phone,
                    groupId: req.body.groupId || user.groupId
                };

                await user.update(newData);

                res.status(200).send({ msg: "Update user successfully", data: user });
            } else {
                res.status(404).send({ msg: "User not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    static async deleteUser(req, res) {
        const userId = req.body.id;
        try {
            const user = await User.findByPk(userId); // Correct the method name to findByPk

            if (user !== null) {
                await User.destroy({ where: { id: userId } }); // Use await with destroy, and provide a where clause

                res.status(200).send({
                    data: user,
                    msg: 'success'
                })
            } else {
                res.status(404).send({
                    msg: 'not found'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}
exports.customerController = customerController;