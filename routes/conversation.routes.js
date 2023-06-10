const router = require('express').Router();
const conversationModel = require('../models/Conversation.model');
const ObjectId = require('mongoose').Types.ObjectId; 

//new conversation

router.post("/", async (req, res) => {
    if (!ObjectId.isValid(req.body.senderId))
        return res.status(400).send('Identifiant inconnu : ' + req.body.senderId);
    if (!ObjectId.isValid(req.body.receiverId))
        return res.status(400).send('Identifiant inconnu : ' + req.body.receiverId);
    const conversation = await conversationModel.find({
        membres : { $all: [req.body.senderId, req.body.receiverId] },
    });
    try {
        if (conversation.length!==0) {
            res.status(200).json(conversation);
        } 
        if (conversation.length===0) {
            const Newconversation = new conversationModel({
                membres : [req.body.senderId, req.body.receiverId]
            });
            const savedconversation = await Newconversation.save()
            res.status(200).json(savedconversation);
        }  
        
    } catch (err) {
        res.status(500).json(err);
    }

});

// get conversation
router.get("/:userId", async (req, res) => {
    try {
        const conversations = await conversationModel.find({
            membres : { $in: [req.params.userId] },
        }).sort({ createdAt: -1});
        res.status(200).json(conversations);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;