const express = require('express');

const route = express.Router();

console.log("Routing....");

const User = require('../models/UserModel');

const userCtl = require('../controllers/userController')

route.post("/registerUser", userCtl.UserRegister);

route.post("/userLogin", userCtl.userLogin);

module.exports = route;