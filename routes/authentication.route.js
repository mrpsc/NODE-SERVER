const express = require('express');
const router = express.Router();
const userRepository = require('../repositories/users.repository');
router.post('/register', function (req, res) {
    userRepository.register(req.body, function (result, err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

module.exports = router;