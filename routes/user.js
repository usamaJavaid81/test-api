const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo
    });
    const addUser = await user.save();
    res.json(addUser);
});

module.exports = router;
