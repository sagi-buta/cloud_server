require("dotenv").config()
require('./DL/database').connect();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());





const maineRouter = require('./ROUTERS/main.router')
maineRouter(app)

app.listen(8000, () => console.log("server is running- 8000"))
















