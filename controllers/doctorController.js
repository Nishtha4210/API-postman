const Doctor = require('../models/DoctorModel');
const bcrypt = require("bcrypt");
const moment = require("moment");
const path = require('path');
const fs = require('fs');

module.exports.addDoctor = async (req, res) => {
    try {
        var image = '';
        if (req.file) {
            image = Doctor.doctorImagePath + "/" + req.file.filename;
        }
        req.body.image = image;
        req.body.name = req.body.fname + " " + req.body.lname;
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.created_date = moment().format('DD/MM/YYYY, h:mm:ss A');
        req.body.updated_date = moment().format('DD/MM/YYYY, h:mm:ss A');
        let details = await Doctor.create(req.body);
        if (details) {
            return res.status(200).json({ "msg": "Doctor record inserted successfully." });
        } else {
            return res.status(400).json({ "msg": "Failed to insert record." });
        }
    } catch (err) {
        return res.status(400).json({ "msg": "Something went wrong." });
    }
}

module.exports.viewDoctors = async (req, res) => {
    try {
        let all = await Doctor.find({});
        if (all) {
            return res.status(200).json({ "msg": "Response received.", allDetails: all });
        } else {
            return res.status(200).json({ "msg": "No record found." });
        }
    } catch (err) {
        return res.status(400).json({ "msg": "Something went wrong." });
    }
}

module.exports.deleteDoctor = async (req, res) => {
    try {
        let single = await Doctor.findById(req.params.id);
        if (single) {
            try {
                if (single.image) {
                    let imgPath = path.join(__dirname, '..', single.image);
                    try {
                        await fs.unlinkSync(imgPath);
                    } catch (err) {}
                }
                let del = await Doctor.findByIdAndDelete(req.params.id);
                if (del) {
                    return res.status(200).json({ "msg": "Doctor record deleted successfully." });
                } else {
                    return res.status(400).json({ "msg": "Record not deleted." });
                }
            } catch (err) {
                return res.status(400).json({ "msg": "Something went wrong." });
            }
        } else {
            return res.status(400).json({ "msg": "Record not found." });
        }
    } catch (err) {
        return res.status(400).json({ "msg": "Something went wrong." });
    }
}

module.exports.updateDoctor = async (req, res) => {
    try {
        let old = await Doctor.findById(req.params.id);
        if (old) {
            if (req.file) {
                try {
                    if (old.image) {
                        let oldImagePath = path.join(__dirname, '..', old.image);
                        await fs.unlinkSync(oldImagePath);
                    }
                } catch (err) {}
                req.body.image = Doctor.doctorImagePath + '/' + req.file.filename;
            } else {
                req.body.image = old.image;
            }
            req.body.name = req.body.fname + " " + req.body.lname;
            req.body.password = await bcrypt.hash(req.body.password, 10);
            req.body.created_date = old.created_date;
            req.body.updated_date = moment().format('DD/MM/YYYY, h:mm:ss A');
            let updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updated) {
                return res.status(200).json({ "msg": "Doctor record updated successfully." });
            } else {
                return res.status(400).json({ "msg": "Doctor record not updated." });
            }
        } else {
            return res.status(400).json({ "msg": "Doctor record not found." });
        }
    } catch (err) {
        return res.status(400).json({ "msg": "Something went wrong." });
    }
}


