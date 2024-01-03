const db = require("../models/index");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = db.user;
const Token = require('./generateToken');
const nonSecurePath = ['/', '/login', '/register'];
class AuthMiddleware {


  static async checkJWT(req, res, next) {
    try {
      if (nonSecurePath.includes(req.path)) return next();
      let cookie = await req.cookies.accessToken;
      console.log('check cookie: ', cookie)
      // return
      if (cookie) {
        let access_token = cookie;
        console.log('>>> check token: ', access_token)
        // return
        let decoded = jwt.verify(access_token, `${process.env.ACCESS_TOKEN_SECRET}`)
        if (decoded) {
          req.user = decoded;
          req.token = access_token
          next();
        } else {
          return res.status(401).json({
            msg: 'Not authenticated the user'
          })
        }
      } else {
        return res.status(401).json({
          msg: 'Not cookie'
        })
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async checkUserPermission(req, res, next) {

    if (req.user && req.user.user) {
      try {
        let email = req.user.user.email;
        let roles = req.user.user.group.roles;

        console.log('>>> check roles: ', roles)

        let currentUrl = req.path;

        console.log('>>> check url: ', currentUrl)

        if (!roles || roles.length === 0) {
          return res.status(403).json({
            msg: `You don't have permission to access this resource`
          });
        }

        let canAccess = roles.some(item => item.url === currentUrl);

        if (canAccess) {
          next();
        } else {
          return res.status(403).json({
            msg: `You don't have permission to access this resource`
          });
        }
      } catch (error) {
        console.error('Error checking user permission:', error);
        return res.status(500).json({
          error: 'Internal Server Error',
          msg: 'An unexpected error occurred while checking user permission.'
        });
      }
    } else {
      return res.status(401).json({
        msg: 'Not authenticated user'
      });
    }
  }
  static async refresh_token(req, res, next) {
    try {
      const rf_token = req.cookies.refreshToken;
      console.log('>>> check rf_token: ', rf_token)
      if (!rf_token) {
        return res.status(400).json({ message: "Please login now" });
      }

      let decode;
      try {
        decode = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
      } catch (error) {
        return res.status(400).json({ message: "Invalid refresh token" });
      }

      if (!decode.id) {
        return res.status(400).json({ message: "Invalid refresh token data" });
      }

      const user = await User.findByPk(decode.id, {
        attributes: ["id", "name", "email"],
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

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const access_token = await Token.generateAccessToken({ user: user });
      res.cookie('accessToken', access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 30days
        sameSite: "none",
        secure: true,
      });
      req.token = access_token;

      // Optionally, log the generated access token (remove in production)
      console.log('>>> check req.Token: ', access_token);

      next();
    } catch (error) {
      console.error('Error in refresh_token:', error);
      return res.status(500).json({ message: "Failed to refresh token" });
    }
  }


}

module.exports = AuthMiddleware;
