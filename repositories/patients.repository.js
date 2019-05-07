const mongoose = require('mongoose');


const PatientSchema = new mongoose.Schema({
    PatientId: String,
    Name: String,
    DateOfBirth: Date,
    Gender: Number
});

const Patient = mongoose.model('patients', PatientSchema);

function getPatientById(patientId, callback) {
    Patient.find({ PatientId: "11" }).then(patient => {
        if (!patient.length || !patient) {
            callback(null, { message: 'Patient is not exist' })
        }
        else {
            callback(patient);
        }
    })
}

function addPatient(patient,callback) {
    patient = new Patient({
        PatientId: patient.PatientId,
        Name: patient.Name,
        DateOfBirth: patient.DateOfBirth,
        Gender: patient.Gender
    });
    patient.save(function (err) {
        if (err) {
            callback(null, { message: err });
        } else {
            callback(patient);
        }

    });
}


module.exports = {
    getPatientById: getPatientById,
    addPatient: addPatient

}