const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const multer = require('multer');
//const upload = multer();

const { Router } = require('express');
const UserModel = require('../models/user.model');

//for register
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/logout", authController.logout);


// get all users
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userData);
router.put('/:id', userController.updateUserData);
router.delete('/:id', userController.deleteUser);
router.put('/follow/:id', userController.follow);
router.put('/unfollow/:id', userController.unfollow);

//profil picture
//var fileUniqueName=""
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./client/public/uploads/profil");
    },
    filename: (req,file,cb) => {
        //fileUniqueName=Date.now()+file.originalname
        cb(null, file.originalname);
    },
});
 upload = multer({storage});
router.post("/upload",upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            throw Error("FILE_MISSING");
        } else {
            await UserModel.findByIdAndUpdate(
                req.body.userId,
                {
                    $set : { picture: "./uploads/profil/" + req.file.originalname}
                },
                { new: true, upsert: true, setDefaultsOnInsert: true},
                (err, docs) => {
                    if (!err) return;
                    else return res.status(500).send({message: err});
                }
            );
        }        
    } catch (err) {
        return res.status(201).json(err)   
    }
});

module.exports = router;