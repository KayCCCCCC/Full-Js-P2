require('dotenv').config();
const express = require('express')
const configViewEngine = require("./src/configs/viewEngine");
const initWebRoutes = require("./src/routes/api");
const http = require("http");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || 'localhost';

//configure body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

//config router
initWebRoutes(app)

server.listen(port, hostname, () => {
    console.log(`Example app listening on http://${hostname}:${port}`);
});
