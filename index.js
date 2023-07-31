require("dotenv").config()
require('./DL/database').connect();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

