const router = require('express').Router();
const User = require('../model/User');

const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
    //VALIDATE DATA WITH JOY BEFORE SUBMIT USE
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //CHECK IF USER ALREADY EXISTS IN DB
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Cet email est déjà utilisé');

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
