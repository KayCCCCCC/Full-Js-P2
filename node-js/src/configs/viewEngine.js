const express = require('express');

// param app - express app
const configViewEngine = (app) => {
    app.use(express.static('./src/publics'));

    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

module.exports = configViewEngine