const express = require('express');
const router = express.Router();

const History = require('../../models/History');

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

// @route   GET api/histories/
// @desc    GET message
// @access  Public
router.get('/', (req, res) => {
    res.send('histories...')
})

// @route   GET api/histories/:limit
// @desc    GET histories with limit
// @access  Public
router.get('/:limit', (req, res) => {
    const limit = parseInt(req.params.limit);
    History.find()
        .limit(limit)
        .exec((err, histories) => {
            res.json(histories);
        })
});

// @route   DELETE api/histories/:id
// @desc    DELETE delete history
// @access  Public
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    History.findById(id)
        .then(history => {
            History.deleteOne(history)
                .then(() => {
                    res.json({ success: true });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ success: false });
                })
        });
});

// @route   GET api/histories/getHistory/:id
// @desc    GET get histories from id
// @access  Public
router.get('/getHistory/:id', (req, res) => {
    const id = req.params.id;
    History.find({ orderID: id })
        .then(history => {
            if (history)
                res.json(history);
        })
});

// @route   POST api/histories/
// @desc    POST add new history
// @access  Public
router.post('/', (req, res) => {
    const newHistory = new History({
        orderID: req.body.orderID,
        context: req.body.context,
        createdDate: req.body.createdDate,
        description: req.body.description
    })

    newHistory.save().then(history => res.json(history));
})

module.exports = router;