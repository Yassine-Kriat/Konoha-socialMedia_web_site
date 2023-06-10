const { send } = require('express/lib/response');
const userModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req,res) => {
    const users = await userModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userData = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id)

    userModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('Identifiant inconnu : ' + err);

    }).select('-password');
}

module.exports.updateUserData = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id)
    try {
        await userModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    name: req.body.name,
                    password: req.body.password,
                    bio: req.body.bio,
                }
            },
            { 
                new: true,
                upsert: true,
                setDefaultsOnInsert: true 
            },
            (err, docs) => {
                if(!err) return res.send(docs);
                if(err) return res.status(500);send({message : err});
            }


        )
    } catch (err) {
        return res.status(500);send({message : err});
    }
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id)
    
    try {
        await userModel.remove({_id: req.params.id}).exec();
        res.status(200).json({message : "user deleted"});
    } catch (err) {
        return res.status(500).json({message : err});  
    }

}


module.exports.follow = async (req, res) => {
    if (req.params.id !== req.body.idToFollow){
        try {
            const user = await userModel.findById(req.params.id);
            const userToFollow = await userModel.findById(req.body.idToFollow);
            if(!user.following.includes(req.body.idToFollow)){
                await user.updateOne({$push: {following: req.body.idToFollow}});
                await userToFollow.updateOne({$push: {followers: req.params.id}});
                res.status(200).json("ok");

            }else {
                res.status(403).json("déjà suivi");
            }
        } catch (err) {
            res.status(500).json(err);
        }

    }else {
        res.status(403).json("tu peux pas te suivre");
    }
}


module.exports.unfollow = async (req, res) => {
    if (req.params.id !== req.body.idToUnfollow){
        try {
            const user = await userModel.findById(req.params.id);
            const userToUnfollow = await userModel.findById(req.body.idToUnfollow);
            if(user.following.includes(req.body.idToUnfollow)){
                await user.updateOne({$pull: {following: userToUnfollow._id}});
                await userToUnfollow.updateOne({$pull: {followers: req.params.id}});
                res.status(200).json("ok");
            }else {
                res.status(403).json("non suivi");
            }
        } catch (err) {
            res.status(500).json(err);
        }

    }else {
        res.status(403).json("id incorrect");
    }
}


