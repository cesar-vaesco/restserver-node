
const { Router } = require('express');

const router = Router();




router.get('/', (req, res) => {
    res.json({
        "msg": "get api"
    })
});

router.put('/', (req, res) => {
    res.status(400).json({
        "msg": "put api"
    })
});

router.post('/', (req, res) => {
    res.status(201).json({
        "msg": "post api"
    })
});

router.delete('/', (req, res) => {
    res.json({
        "msg": "delete api"
    })
});

router.patch('/', (req, res) => {
    res.json({
        "msg": "patch api"
    })
});











module.exports = router;
