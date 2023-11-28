import express from 'express';
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import cookieParser from 'cookie-parser';


import authRouter from './routes/auth.mjs'
import postRouter from './routes/post.mjs'
import { ObjectId } from 'mongodb';



const app = express();
app.use(express.json()); // body parser
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser())


// /api/v1/login
app.use(express.static(path.join(__dirname, 'public')))
app.use("/hlo/v1", authRouter)

app.use((req, res, next) => { // JWT
    let token = req.cookies.token

    try {
        const decoded = jwt.verify(token, process.env.SECRET);


        req.body.currentUser = {
            email: decoded.email,
            isAdmin: decoded.isAdmin,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            _id :  decoded._id  ,
            username : decoded.username
        }
         
        console.log('currentUser',req.body.currentUser)
        // console.log('token',decoded)

        next();
    } catch (err) {
        // err
        res.status(401).send({ message: "invalid token" })
    }

})

app.use("/hlo/v1", postRouter) // Secure api
// app.use("/static", express.static(path.join(__dirname, 'static')))

app.get('/ping', (req, res) => {
    res.send({
        message: 'ping is okay',
        data: req.body.currentUser
    })
})

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
})
