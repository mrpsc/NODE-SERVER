const express = require('express');
const router = express.Router();
const authorize= require('../middlewares/authorize');
const patientsRepository = require('../repositories/patients.repository');

router.get('/getPatientById/:patientId', function(req,res){
    let patientId= req.params['patientId'];
    console.log(patientId);
    patientsRepository.getPatientById(patientId,function (result,err){
        if (err) {
            res.status(400).send(err);
        } else{
            res.status(200).send(result);
        }
    })
})


router.post('/addPatient', function (req, res) {
    patientsRepository.addPatient(req.body, function (result, err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});


module.exports = router;