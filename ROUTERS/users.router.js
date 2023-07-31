const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.send(error);
    }

});

module.exports = router;