const express = require('express');

const port = 8002;

const app = express();

const db = require('./config/db');

app.use(express.urlencoded());
app.use(express.json());

app.use("/nursing-staff", require("./routes/nursingStaffRoutes"));
app.use("/doctors", require("./routes/doctorRoutes"));
app.use("/user", require("./routes/userRoutes"));

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log("Server is Running on Port : ", port);
})