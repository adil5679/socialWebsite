
import express from 'express';
import { client } from '../mongodb.mjs'
import { stringToHash, verifyHash, validateHash } from "bcrypt-inzi";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
let router = express.Router()


const db = client.db("myblog");
const col = db.collection("SocailMediaAppUsers");

router.post('/signup', async (req, res, next) => {

    if (
        !req.body.email ||
        !req.body.password ||
        !req.body.username ||
        !req.body.firstName ||
        !req.body.lastName
    ) {
        res.status(401)
        res.send(
            `require parammetter is missing 
             "please provide require input"
            `
        )

        return;
    }

    req.body.email = req.body.email.toLowerCase()

    try {


        const document = await col.findOne({ email: req.body.email});

        if (!document) {
            const hash = await stringToHash(req.body.password);
            const insertResponce = await col.insertOne(
                {
                    isAdmin : false,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                    created_at: new Date().getTime(),
                })

            console.log('insertResponce', insertResponce);
            res.send('signup  sucssesfully authenticated');
        }
        else {
            res.send('user already exist')
        }

    }


    catch (err) {
        console.log(err);
    }

})
router.post('/login', async (req, res, next) => {

    if (
        !req.body.email ||
        !req.body.password
    ) {
        res.status(401)
        res.send(
            `require parammetter is missing 
             "please provide require input"
       
             `

        )
        return;
    }

    try {

        const result = await col.findOne({ email: req.body.email });

        if (!result) {
            res.status(403)
            res.send(`email and password is incorrect `)

        }
        else {
            const isMatch = await verifyHash(req.body.password, result.password);
            if (isMatch) {

                let expireAfter2Min = new Date().getTime() + (24 * 60 * 60 * 1000)

                const token = jwt.sign({
                    lastName: result.lastName,
                    firstName: result.firstName,
                    username: result.username,
                    email: req.body.email,
                    _id: result._id,
                    isAdmin: result.isAdmin

                }, process.env.SECRET, {
                    expiresIn: '24h'
                });


                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    expires: new Date(expireAfter2Min)
                })


                res.send({
                    message: 'logIn Succsessfully',
                    data : {
                        isAdmin: result.isAdmin,
                        firstName:result?.firstName,
                        lastName:result?.lastName,
                        email: req.body?.email,
                        _id : result?._id
                        
                    }

                })
            }
            else {
                res.send(`email and password is incorrect `)

            }



        }
    }
    catch (e) {
        console.log(e)
    }

})




// router.post('/logout', async (req, res, next) => {
// })
export default router