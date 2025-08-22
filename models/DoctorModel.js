const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const imagePath = "uploads/doctors";

// Ensure uploads directory exists
const absoluteUploadDir = path.join(__dirname, '..', imagePath);
if (!fs.existsSync(absoluteUploadDir)) {
    fs.mkdirSync(absoluteUploadDir, { recursive: true });
}

const DoctorSchema = mongoose.Schema({
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
    },
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    created_date: {
        type: String,
        required: true
    },
    updated_date: {
        type: String,
        required: true
    }
});

const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, absoluteUploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

DoctorSchema.statics.uploadImage = multer({
    storage: imgStorage
}).single('image');

DoctorSchema.statics.doctorImagePath = imagePath;

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;


