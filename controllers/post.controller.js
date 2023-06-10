const userModel = require('../models/user.model');
const postModel = require('../models/post.models');
const ObjectId = require('mongoose').Types.ObjectId; 

module.exports.readPost = (req, res) => {
    postModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log('erreur : '+ err );
    }).sort({ createdAt: -1});
}

module.exports.updatePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);
    
    const newDescription = {
        description: req.body.description
    }
    
    postModel.findByIdAndUpdate(
        req.params.id,
        {$set: newDescription},
        {new: true},
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("erreur de mise à jour "+err);
        }
    )
}

module.exports.deletePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);
    
    postModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs);
        else console.log("erreur de suppression "+ err);
    })
    
}

module.exports.likePost_unlikePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);
    try {
        const post = await postModel.findById(req.params.id);
        const user = await userModel.findById(req.body.id);
        if(!post.likers.includes(req.body.id)){
            await post.updateOne({$push:{likers:req.body.id}});
            await user.updateOne({$push:{likes:req.params.id}});
            res.status(200).json("the post has been liked");
        }else{
            await post.updateOne({$pull:{likers:req.body.id}});
            await user.updateOne({$pull:{likes:req.params.id}});
            res.status(200).json("the post has been disliked");
        }
        
    } catch (err) {
        return res.status(400).send(err);
        
    }
    
}

module.exports.commentPost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);
    
    try {
        
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    Commentaires: {
                        id0fCommenter: req.body.idOfCommenter,
                        pseudoOfCommenter: req.body.pseudoOfCommenter,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true},
            (err, docs) => {
                if(!err) return res.send(docs)
                else return res.status(400).send(err)
            }

        );

    } catch (err) {
        return res.status(400).send(err)
    }

}

module.exports.editCommentPost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);
    try {
        return postModel.findById(req.params.id, (err, docs) =>{
            const theComment = docs.Commentaires.find((comment) => 
                comment._id.equals(req.body.commentId)
            );
            if(!theComment) return res.status(404).send("comment not fund");
            theComment.text = req.body.text;
            return docs.save((err) => {
                if(!err) return res.status(200).send(docs);
                return res.status(500).send(err);
            });
        });
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    Commentaires : {
                        _id: req.body.commentId,
                    },
                },
            },
            { new : true },
            (err, docs) => {
                if(!err) return res.status(200).send(docs);
                else return res.status(400).send(err);
            }
        ); 
        
    } catch (err) {
        return res.status(400).send(err);
    }
    
}


