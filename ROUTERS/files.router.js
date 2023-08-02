const express = require('express');
const router = express.Router();
const upload = require('../BL/middlewares/multer');
const { readfile, readfolderfils, creatfile, creatfolder, deletes, rename, cut, root } = require('../BL/fs.services');

// router.get('/', async (req, res) => {
//     try {
//         let data = await readFun();
//         res.send(data);
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
// });
// router.get("/:id", async (req, res) => {
//     try {
//         let data = await readFun({ _id: req.params.id })
//         res.send(data)
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error.message)
//     }
// })
router.post('/upload', upload.single("upfile"), async (req, res) => {
    let file = req.file;
    let dir = req.query.dir;
    try {
        cut(file.path, dir + "/" + Date.now() + file.originalname);
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