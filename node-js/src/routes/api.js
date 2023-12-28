const express = require('express');

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello World")
    })

    return app.use("/api/v2", router);
}

module.exports = initWebRoutes

