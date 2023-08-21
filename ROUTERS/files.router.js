const fs = require('fs');
const express = require('express');
const router = express.Router();
const upload = require('../BL/middlewares/multer');
const { downloadFile, readfile, readfolderfils, creatfile, creatfolder, deletes, rename, cut, setRoot } = require('../BL/fs.services');
const mime = require('mime-types');


router.use((req, res, next) => {
    // console.log('middleware');
//    const token = req.headers.authorization.split(" ")[1];

// process.env.SECRET
    // TODO - check the token.
    // find user by token.
    req.user = ""
    // req
    next()
})

//read all files in folder return array        
//http://localhost:8000/files/?id=some_id&dir=some_id/folder/...<-nesessary full path with id in dir--
router.get("/", async (req, res) => {
    let id = req.query.id
    let dir = req.query.dir
    try {
        setRoot(id, dir)
        let infArray = readfolderfils(dir)//nesessary full path with id in dir
        res.send(infArray)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

router.put("/rename", async (req, res) => {
    let id = req.query.id
    let dir = req.query.dir
    let dir2 = req.query.dir2
    try {
        setRoot(id, dir)
        let infArray = rename(dir, dir2)
        res.send(infArray)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

//http://localhost:8000/files/?id=some_id&dir=folder/...
router.get("/one", async (req, res) => {//to show file -or- download.
    let id = req.query.id
    let dir = req.query.dir
    let fileType = mime.lookup(`./root/${dir}`);
    try {
        setRoot(id, dir)
        let File = readfile(dir)//id+dir from client url.
        res.set('Content-Type', `${fileType}`)
        res.send(File)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
router.post('/upload', upload.single("upfile"), async (req, res) => {//upload a file.
    let formDataFile = req.file;//new file
    let id = `${req.query.id}`//folder drive user = the correct _id of usernow
    let dir = `${req.query.dir}`//the correct folder to add
    try {
        setRoot(id, dir)
        cut(formDataFile.path, dir + "/" + Date.now() + formDataFile.originalname);
        res.send(readfolderfils(dir));
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
router.delete("/", async (req, res) => {
    let id = req.query.id
    let dir = req.query.dir
    try {
        setRoot(id, dir)
        deletes(dir) //nesessary full path with id in dir
        let newdir = dir.split("/")
        newdir.pop()
        newdir = newdir.join("/")
        console.log(dir, newdir);
        let infArray = readfolderfils(newdir)
        res.send(infArray)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})


//  -----------to-do------------

// ---cut/copi/creat-folder/---







router.get('/download', (req, res) => {
    res.set('Content-Type', 'image/jpeg')
    res.download(`./${req.query.dir}`)
})

router.post('/newFolder', (req, res) => {
    let location = req.query.location
    let name = req.query.name
    try {
        creatfolder(location ? location : "", name)
        res.send(`on location ${location ? location : "root"} added a new folder named: ${name}`)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})



// router.put("/:id", async (req, res) => {
//     try {
//         let data = await updateFun(req.params.id, req.body)
//         res.send(data)
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message)
//     }
// })


module.exports = router;