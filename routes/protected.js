const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

router.get('/', verify, (req, res) => {
    // res.json({
    //     posts: {
    //         title: 'My title',
    //         description: 'Private data!!',
    //     },
    // });
    res.send(req.user);
    //User.findOne({ _id: req.user });
});

module.exports = router;
