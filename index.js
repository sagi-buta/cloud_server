require("dotenv").config()
require('./DL/database').connect();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./root'))




const maineRouter = require('./ROUTERS/main.router')
maineRouter(app)

app.listen(8000, () => console.log("server is running- 8000"))
















