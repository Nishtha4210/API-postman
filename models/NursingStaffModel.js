const mongoose = require("mongoose");

const NursingStaffSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const NursingStaff = mongoose.model('NursingStaff', NursingStaffSchema);

module.exports = NursingStaff;


