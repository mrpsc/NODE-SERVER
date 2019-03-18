const express = require('express');
const cors = require('cors');
const authenticationRouter = require('./routes/authentication.route');
const formRouter = require('../NODE-SERVER/routes/form.route');
const patientRouter = require('../NODE-SERVER/routes/patient.route');
const subFormRouter = require('../NODE-SERVER/routes/sub-form.route');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlMongoDb = "mongodb://karina:12345@ds046047.mlab.com:46047/mrpdb";

mongoose.connect(urlMongoDb).then(()=>console.log('ok')).catch((err)=>console.log(err));
var app = express();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.listen(8000, () => {
    console.log('Running');
});


app.use('/api/authentication',authenticationRouter);
app.use('/api/form',formRouter);
app.use('/api/patient',patientRouter);
app.use('/api/subForm',subFormRouter);




