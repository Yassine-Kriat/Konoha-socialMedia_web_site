const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const postModel = require('../models/post.models');

router.get('/', postController.readPost);
//router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.put('/liker-unliker/:id', postController.likePost_unlikePost);



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./client/public/uploads/posts");
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});
router.post("/",upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            throw Error("FILE_MISSING");
        } else {
            const newPost = new postModel({
                idOfPoster: req.body.idOfPoster,
                description: req.body.description,
                picture: "./uploads/posts/" + req.file.originalname,
                likers: [],
                commentaires: [],
            });
            try {
                const post = await newPost.save();
                return res.status(201).json(post);
            } catch (err) {
                console.log(err);
            }
        }        
    } catch (err) {
        return res.status(201).json(err)   
    }
});



//comments
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);


module.exports = router;