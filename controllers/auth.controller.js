const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { create } = require('../models/user.model');
const {signUpErrors, signInErrors} = require('../utils/errors.utils');


module.exports.signUp = async (req, res) => {
    console.log(req.body)
    const {name, pseudo, email, password} = req.body
    try {
        const user = await UserModel.create({name, pseudo, email, password});
        res.status(201).json({ user : user._id});
    }
    catch(err) {
        const errors = signUpErrors(err);
        res.status(200).send({errors})
    }
}

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signIn = async (req, res) => {
    const { pseudo, password} = req.body

    try {
        const user = await UserModel.login(pseudo, password);
        if (user.errorPassword) {
            const errors = {pseudo:'', password:'mot de passe inconnu'}
            res.status(200).json({errors}); 
        } else {
            const token = createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge});
            res.status(200).json({ user: user._id })
        }
    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).json({errors});  
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge : 1});
    res.redirect('/');
}