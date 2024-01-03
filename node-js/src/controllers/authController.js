const db = require('../models/index');
const User = db.user
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const Token = require('../middlewares/generateToken');
const { use } = require('../routes');
class authController {
    static async Register(req, res) {
        try {
            const { email, password, name, phone, confirmPass } = req.body;
            let hashPassWord = bcrypt.hashSync(password, salt);

            const checkEmail = async () => {
                let exitsUser = await User.findOne({
                    where: {
                        email: email
                    }
                });
                return exitsUser ? true : false;
            };

            if (!(await checkEmail())) {
                let ss = bcrypt.compareSync(password, hashPassWord);
                let info = {
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashPassWord,
                    groupId: 4
                };

                const user = await User.create(info);
                res.status(200).send({
                    data: user
                });
            } else {
                res.status(200).send({
                    msg: 'Email is exist please enter a new email'
                });
            }
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async Login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await db.user.findOne({
                where: { email: email },
                include: [
                    {
                        model: db.group,
                        attributes: ["id", "name"],
                        include: [
                            {
                                model: db.role,
                                attributes: ["id", "url", "description"]
                            }
                        ]
                    },
                ]
            });
            if (user) {
                const isPasswordCorrect = bcrypt.compareSync(password, user.password);
                if (isPasswordCorrect) {
                    const access_token = await Token.generateAccessToken({ user: user });

                    const refresh_token = await Token.generateRefreshToken({ user: user });

                    // await res.cookie("refreshToken", refresh_token, {
                    //     httpOnly: false,
                    //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
                    //     sameSite: "none",
                    //     secure: true,
                    // });
                    res.cookie('accessToken', access_token, {
                        httpOnly: true,
                        maxAge: 60 * 60 * 1000, // 30days
                        sameSite: "none",
                        secure: true,
                    });
                    console.log('Cookies: ', req.cookies)
                    console.log('Signed Cookies: ', req.signedCookies)

                    return res.status(200).send({
                        msg: "Login successful",
                        access_token: access_token,
                        refreshToken: refresh_token,
                        data: user

                    });
                } else {
                    res.status(401).send({
                        msg: 'Password is not correct'
                    });
                }
            } else {
                res.status(404).send({
                    msg: 'User not found'
                });
            }


        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async logout(req, res) {
        try {
            await res.clearCookie("accessToken", {
                secure: true,
                httpOnly: true,
                sameSite: "none",  // Adjust based on your application's needs
            });
            return res.status(200).send({ msg: "Logged out" });
        } catch (error) {
            console.error("Logout error:", error);
            return res.status(500).send({ msg: "Logout error" });
        }
    }

    static async getUserAccount(req, res) {
        try {
            console.log('>>> check user: ', req.user);
            console.log('>>> check token: ', req.token)
            res.status(200).send({
                data: req.user,
                token: req.token
            })
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Failed to do somthing exceptional" });
        }
    }


}
exports.authController = authController;