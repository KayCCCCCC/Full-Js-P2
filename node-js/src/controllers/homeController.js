const db = require('../models/index');
const user = require('../models/userModel');

class homeController {
    static async getHomePage(req, res) {
        res.render('homePage.ejs');
    }
}
exports.homeController = homeController;