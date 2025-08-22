const express = require('express');

const route = express.Router();

const NursingStaff = require('../models/NursingStaffModel');
const nsCtl = require('../controllers/nursingStaffController');

route.get("/", nsCtl.getDetails);
route.post("/add", nsCtl.addNursingStaff);
route.delete("/delete/:id", nsCtl.deleteNursingStaff);
route.put("/update/:id", nsCtl.updateNursingStaff);

module.exports = route;


