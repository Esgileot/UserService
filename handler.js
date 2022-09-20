const express = require("express");
const serverless = require("serverless-http");
const router = require("./router/router");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors())
app.use("/service", router);


module.exports.handler = serverless(app);
