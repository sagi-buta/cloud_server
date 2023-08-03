const express = require('express');
const router = express.Router();
const upload = require('../BL/middlewares/multer');
const {downloadFile, readfile, readfolderfils, creatfile, creatfolder, deletes, rename, cut, setRoot } = require('../BL/fs.services');

let idUserNow
// router.get('/', async (req, res) => {
//     try {
//         let data = await readFun();
//         res.send(data);
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//
// });
router.get("/", async (req, res) => {
    let id = req.query.id
    let dir = req.query.dir
    setRoot(id, dir)
    try {
        let file = readfile(dir)
        res.send(file)
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message)
    }
})
router.post('/upload', upload.single("upfile"), async (req, res) => {
    let formDataFile = req.file;//new file
    idUserNow = `${req.query.id}`//folder driveuser = the correct _id of usernow
    const dir = `${req.query.dir}`//the correct folder nedded
    setRoot(idUserNow, dir)
    try {
        cut(formDataFile.path, dir + "/" + Date.now() + formDataFile.originalname);
        res.send(readfolderfils(dir));
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})
router.delete("/", async (req, res) => {
    try {
        deletes(req.query.dir);
        res.send(readfolderfils(req.query.dir));
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message)
    }
})

router.get('/download',(req, res) => {
    res.set('Content-Type', 'image/jpeg')
    res.download(`./${req.query.dir}/${req.query.fileName}`)
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