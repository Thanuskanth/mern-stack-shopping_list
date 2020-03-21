const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const auth =require('../middleware/auth');

router.get('/',auth,(req, res) =>
    User.find()
        .then(user => res.json(user))
);

router.post('/add',(req, res) => {
    const { username, email, password } = req.body;
console.log(req.body,"req.body")
    if (!username || !email || !password) { return res.status(400).json({ msg: "fill all field" }) };
    User.findOne({ email }).then(user => { if (user) { return res.status(400).json({ msg: "user already exist" }) } });
    const newUser = new User({
        username: username,
        email: email,
        password: password
    });
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then((user) =>{
                jwt.sign(
                    {id:user.id},
                    config.get('jwtSecred'),
                    {expiresIn:3600},
                    (err,token)=>{
                        if(err) throw err;
                        res.json({

                                token,
                            user: {
                                name: user.username,
                                email: user.email,
                                id: user.id
                            }
                        })
                    }
                )
            }
            
           )
        })
    })



}
);

router.delete('/:id',auth,(req, res) => {
    const user = User.findByIdAndDelete(req.params.id)
        .then(() => res.json(user))
}
);

router.get('/:id',auth,(req, res) => {
    const user = User.findById(req.params.id)
        .then(() => res.json(user))


});
module.exports = router;