import express from "express";
import { client } from '../mongodb.mjs'
import { ObjectId } from "mongodb";
import multer from 'multer'
import jwt from 'jsonwebtoken'
import bucket from './../firebaseAdmin/index.mjs'
import fs from 'fs'

const db = client.db("myblog");
const col = db.collection("posts");
const userCollection = db.collection("SocailMediaAppUsers");
let router = express.Router();

const storageConfig = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {

        console.log("mul-file: ", file);
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storageConfig })


router.post('/post', upload.any(), async (req, res, next) => {


      const currentUser = jwt.decode(req.cookies.token)

        if (
            !req.body.text
        ) {
            res.status(403);
            res.send(`required parameters missing, 
        example request body:
        {
            title: "abc post title",
            text: "some post text"
        } `);
            return;
        }

   bucket.upload(
        req.files[0].path,
        {
            destination : `allPosts/${req.files[0].path}`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        },
        function (err, file, apiResponse) {
            if (!err) {

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2999'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 
                        try {
                            fs.unlinkSync(req.files[0].path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }
                      
                            const insertResponse = col.insertOne({
                                text: req.body.text,
                                authorEmail: currentUser.email,
                                loginUserId: new ObjectId(currentUser._id),
                                authorName : currentUser.firstName + " " + currentUser.lastName,
                                createdOn: new Date(),
                                imageUrl :  urlData[0]
                            });
                            console.log("insertResponse: ", insertResponse);
                            res.send({ message: 'post created' });
                    }
                })
            } else {
                console.log("error inserting mongodb: ", e);
                res.status(500).send({ message: 'server error, please try later' });
            }
        });

       
})



router.get('/posts', async (req, res, next) => {

    const userId = req.query._id || req.body.currentUser._id


    if (!ObjectId.isValid(userId)) {
        res.status(403).send('invalid user id')
        return;
    }

    const cursor = col.find({ loginUserId: new ObjectId(userId) })
        .sort({ _id: -1 })
        .limit(100)
    try {
        let results = await cursor.toArray()
        res.send(results);

    }
    catch (e) {
        res.send('unfiafakb')
    }

})


router.get('/feed', async (req, res, next) => {

    const cursor = col.find({})
        .sort({ _id: -1 })
        .limit(100)
    try {
        let result = await cursor.toArray()
        res.send(result)
    }
    catch (e) {

    }
})

const getProfileMiddleware = async (req, res, next) => {

    const userId = req.params.userId || req.body.currentUser._id

    if (!ObjectId.isValid(userId)) {
        res.status(403);
        res.send('invalid id');
        return;
    }

    try {

        const result = await userCollection.findOne({ _id: new ObjectId(userId) })
        res.send({
            message: 'profile fatched',
            data: {
                isAdmin: result?.isAdmin,
                firstName: result?.firstName,
                lastName: result?.lastName,
                email: result?.email,
                _id: result?._id
            }

        })

    }
    catch (e) {
        console.log("error getting data mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
}




router.get('/profile', getProfileMiddleware)
router.get('/profile/:userId', getProfileMiddleware)


router.put('/post/:postId', async (req, res, next) => {


    console.log('this is many bhuuut sarii posts!', new Date());


})



router.delete('/post/:postId', async (req, res, next) => {
    try {
        const query = { _id: new ObjectId(req.params.postId) };
        const result = await col.deleteOne(query);

        if (result.deletedCount === 1) {

            console.log("Successfully deleted one document.");

        } else {
            console.log("No documents matched the query. Deleted 0 documents.");
        }
        res.send('Post deleted successfully');
    }
    catch (err) {

        res.send('Error Not Found: ' + err.message);
    }
})



router.post('/post/dolike', async (req, res, next) => {

    if (!ObjectId.isValid(req.body.theUser)) {
        res.status(403).send(`Invalid post id`);
        return;
    }

    try {
        const doLikeResponse = await col.updateOne(
            { _id: new ObjectId(req.body.theUser) },
            {
                $addToSet: {
                    likes: new ObjectId(req.body.theLikedPost)
                }
            }
        );
        console.log("doLikeResponse: ", doLikeResponse);
        res.send('like done');
    } catch (e) {
        console.log("error like post mongodb: ", e);
        res.status(500).send('server error, please try later');
    }
})
export default router;
