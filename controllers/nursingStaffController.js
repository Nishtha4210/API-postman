const NursingStaff = require('../models/NursingStaffModel');

module.exports.getDetails = async (req, res) => {
    try {
        let details = await NursingStaff.find({});
        if (details) {
            return res.status(200).json({ "msg": "Response received.", allDetails: details });
        } else {
            return res.status(200).json({ "msg": "No record found." });
        }
    } catch (err) {
        return res.status(400).json({ "msg": "Something went wrong." });
    }
}

module.exports.addNursingStaff = async (req, res) => {
    try {
        let created = await NursingStaff.create(req.body);
        if (created) {
            return res.status(200).json({ "msg": "Nursing staff record inserted successfully." });
        } else {
            return res.status(400).json({ "msg": "Failed to insert record." });
        }
    } catch (err) {
        return res.status(400).json({ "msg": "Something went wrong." });
    }
}

module.exports.deleteNursingStaff = async (req, res) => {
    try {
        let del = await NursingStaff.findByIdAndDelete(req.params.id);
        if (del) {
            return res.status(200).json({ "msg": "Nursing staff record deleted successfully." });
        } else {
            return res.status(400).json({ "msg": "Record not found." });
        }
    } catch (err) {
        return res.status(400).json({ "msg": "Something went wrong." });
    }
}

module.exports.updateNursingStaff = async (req, res) => {
    try {
        let updated = await NursingStaff.findByIdAndUpdate(req.params.id, req.body);
        if (updated) {
            return res.status(200).json({ "msg": "Nursing staff record updated successfully." });
        } else {
            return res.status(400).json({ "msg": "Record not updated." });
        }
    } catch (err) {
        return res.status(400).json({ "msg": "Something went wrong." });
    }
}


