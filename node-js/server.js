require('dotenv').config();
const express = require('express');
const http = require("http");
const cors = require("cors");
var cookies = require("cookie-parser");
const configViewEngine = require('./src/config/viewEngine');
const webRoutes = require('./src/routes/index');
// const db = require('./src/models/index');
const bodyParser = require('body-parser');
// const jwt = require('./src/middlewares/JWT')

const sequelize = require("./src/databases/connectdb");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || 'localhost';

const bcrypt = require('bcryptjs');
const db = require('./src/models/index'); // Replace with the actual path to your database model
const Token = require('./src/middlewares/generateToken'); // Replace with the actual path to your token module


// config cors
app.use(
    cors({
        credentials: true,
        allowedHeaders: "Content-Type,Authorization",
        origin: process.env.CLIENT_URL ?? "http://localhost:3000",
    })
);
app.use(cookies());

app.use(bodyParser.json());

// Parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: false }));


//test JWT
// jwt.createToken();
// jwt.vertifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSldUIiwiY291cnNlIjoiRnVsbF9KcyIsImlhdCI6MTcwNDA5NjQ0NX0.3NZWKBF63Uvk2Xx6Odk5-r_XnAs0f-JTTZgFAkXqhkc');

// Parse JSON bodies


// Configure template engine
configViewEngine(app);

// Configure routes
app.use('/api/v2', webRoutes);

// Connect to the database
sequelize
    .authenticate()
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log("Error" + err);
    });

server.listen(port, hostname, () => {
    console.log(`Example app listening on http://${hostname}:${port}`);
});
