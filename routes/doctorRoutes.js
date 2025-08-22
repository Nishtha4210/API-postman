const express = require('express');

const route = express.Router();

const Doctor = require('../models/DoctorModel');
const docCtl = require('../controllers/doctorController');
const authUser = require('../config/authUser');

route.get("/view", authUser.authUser, docCtl.viewDoctors);
route.post("/add", authUser.authUser, Doctor.uploadImage, docCtl.addDoctor);
route.delete("/delete/:id", authUser.authUser, docCtl.deleteDoctor);
route.put("/update/:id", authUser.authUser, Doctor.uploadImage, docCtl.updateDoctor);

module.exports = route;


