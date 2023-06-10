const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        idOfPoster: {
            type: String,
            required: true
        },
        description: {
            type: String,
            trim: true,
            maxlength: 700
        },
        picture: {
            type: String
        },
        likers: {
            type: [String],
            required: true
        },
        Commentaires: {
            type: [
                {
                    id0fCommenter: String,
                    pseudoOfCommenter: String,
                    text: String,
                    timestamp: Number,
                }
            ],
            required: true,
        },
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model('post', postSchema);