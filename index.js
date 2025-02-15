import express from 'express';
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import likeRoutes from './routes/likes.js'
import commentRoutes from './routes/comments.js'
import reletionshipRoutes from './routes/reletionships.js'
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from "multer";
const port = process.env.PORT || 4000;

const app = express();
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://main--socialmeetup.netlify.app/",
    credentials: true
}))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  
const upload = multer({ storage: storage });

app.post("/api/upload",upload.single("file"), (req,res)=>{
    const file = req.file;
    res.status(200).json(file.filename)
})


app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/likes',likeRoutes);
app.use('/api/reletionships',reletionshipRoutes)
app.use('/api/auth',authRoutes);

app.listen(port,()=>{
    console.log("API Working");
})