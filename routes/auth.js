const router = require('express').Router();
const User = require('../model/User');

const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
    // //VALIDATE DATA WITH JOY BEFORE SUBMIT USE
    // const { error } = schema.validate(req.body);
    // //res.send(error.details[0].message);
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
