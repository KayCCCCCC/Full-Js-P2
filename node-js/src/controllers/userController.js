const db = require('../models/index');
const User = db.user;
const Group = db.group;
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
class userController {
    static async getUserPage(req, res) {
        let listUser = await User.findAll(
            // {
            //     where: { id: 1 },
            //     include: {
            //         model: Group,
            //         attributes: ["name"]
            //     },
            //     nest: true
            // }
        );
        // console.log('>>> check list User: ', listUser)
        // res.status(200).send({
        //     data: listUser
        // })

        res.render('userPage.ejs', { listUser });
    }

    static async createUserPage(req, res) {
        try {
            const { email, password, username } = req.body;
            let hashPassWord = bcrypt.hashSync(password, salt)
            // console.log('>>> check pass: ', hashPassWord)

            let ss = bcrypt.compareSync(password, hashPassWord);
            // console.log('>>> check ss: ', ss)
            let info = {
                name: username,
                email: email,
                password: hashPassWord
            };

            // Assuming that User is the Sequelize model for your users
            const user = await User.create(info);
            res.redirect('/api/v2/user')
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async getAllUser(req, res) {
        try {
            // Use await to wait for the promise to resolve
            const listUser = await User.findAll();

            // Send the response after the promise is resolved
            res.status(200).send({
                data: listUser
            });
        } catch (error) {
            // Handle errors properly
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findByPk(userId); // Correct the method name to findByPk

            if (user !== null) {
                await User.destroy({ where: { id: userId } }); // Use await with destroy, and provide a where clause

                res.redirect('/api/v2/user');
            } else {
                res.status(404).send({
                    error: 'User not found'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }


    static async getUserById(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findByPk(userId);
            res.render('userUpdate.ejs', { user });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async updateUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await User.findByPk(userId);
            if (user) {
                const newData = {
                    name: req.body.name || user.name,
                    email: req.body.email || user.email,
                };

                await user.update(newData);

                // res.status(200).send({ message: "Update user successfully", data: user });
                res.redirect('/api/v2/user');
            } else {
                res.status(404).send({ message: "User not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }




}
exports.userController = userController;