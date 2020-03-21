const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user')
const auth = require('../middleware/auth')

router.route('/').post((req, res) => {

    const { email, password } = req.body;

    if (!email || !password) { return res.status(400).json({ msg: 'fill all fields' }) };

    User.findOne({ email }).then(user => {

        if (!user) { return res.status(400).json({ msg: 'user does not exist' }) };

        bcrypt.compare(password, user.password).then(isMatch => {

            if (!isMatch) { return res.status(400).json({ msg: 'credencials not match' }) }
            jwt.sign(
                { id: user.id },
                config.get('jwtSecred'),
                { expiresIn: 3600 },
                (err, token) => {
                    res.json({
                        token,
                        user: {
                            username: user.username,
                            id: user.id,
                            email: user.email
                        }
                    })
                }

            )
        })
    })


})
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id).select('-password').then(user => res.json(user))
})
module.exports = router;