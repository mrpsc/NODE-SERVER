const express = require('express');
const router = express.Router();
const userRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');
const config = require('../configurations/config');


router.post('/register', function (req, res) {
    userRepository.register(req.body, function (result, err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

router.get('/login/:username/:password',function (req,res){
    let username = req.params['username'];
    let password = req.params['password'];
    userRepository.login(username,password,function(currentUser,err){
        if (err) {
            res.status(400).send(err);
        } else {
             const token = jwt.sign({},config.jwt_secret,{expiresIn:config.jwt_expiredTime,subject:currentUser[0]._id.toString()});
            res.status(200).send({currentUser,token});
        }
    })
})





module.exports = router;