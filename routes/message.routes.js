const router = require('express').Router();
const messageModel = require('../models/Message.model');

//add 
router.post("/", async (req, res) => {
    const newMessage = new messageModel(req.body);

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
        
    } catch (err) {
        res.status(500).json(err);
    }

});


//get
router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await messageModel.find({
            ConversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }

});


module.exports = router;