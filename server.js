const express = require('express');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const messageRoutes = require('./routes/message.routes');
const conversationRoutes = require('./routes/conversation.routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './config/.env' })
const mongoose = require('mongoose');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');
const multer = require('multer');
const UserModel = require('./models/user.model');


const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
}


app.use(cors(corsOptions));

//connection bdd
mongoose.connect("mongodb://localhost:27017", (err) => {
    if (!err) console.log("connected");
    else console.log("error");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//security jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    if (res.locals.user!==null) {
        res.status(200).send(res.locals.user._id)
    }/*else {
        res.status(200).send("pas de user")
        
    }
    */
   return;
    
});

//routes
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/conversation', conversationRoutes);
app.use('/message', messageRoutes);


//upload cover
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./client/public/uploads/cover");
    },
    filename: (req,file,cb) => {
        //coverFileUniqueName=Date.now()+file.originalname
        cb(null, file.originalname);
    },
});
 upload = multer({storage});
app.use('/user/coverUpload', upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            throw Error("FILE_MISSING");
        } else {
            await UserModel.findByIdAndUpdate(
                req.body.userId,
                {
                    $set : { cover: "./uploads/cover/" + req.file.originalname}
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



//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})