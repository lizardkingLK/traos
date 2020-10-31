const express = require('express');
const router = express.Router();

const Station = require('../../models/Station');

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

// @route   GET api/stations/
// @desc    GET message
// @access  Public
router.get('/', (req, res) => {
    res.send('stations...')
})

// @route   GET api/stations/:limit
// @desc    GET stations with limit
// @access  Public
router.get('/:limit', (req, res) => {
    const limit = parseInt(req.params.limit);
    Station.find()
        .limit(limit)
        .exec((err, stations) => {
            res.json(stations);
        })
});

// @route   GET api/stations/get
// @desc    GET stations without limit
// @access  Public
router.get('/get', (req, res) => {
    Station.find()
        .exec((err, stations) => {
            res.json(stations);
        })
});

// @route   POST api/stations/search
// @desc    POST search stations
// @access  Public
router.post('/search', (req, res) => {
    const KW = req.body.keyword;
    Station.find({ $text: { $search: KW } })
        .then(stations => {
            if (stations)
                res.json(stations);
            else
                res.json({ msg: "No stations found" });
        })
});

// @route   DELETE api/stations/:id
// @desc    DELETE delete station
// @access  Public
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Station.findById(id)
        .then(station => {
            Station.deleteOne(station)
                .then(() => {
                    res.json({ success: true });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ success: false });
                })
        });
});

// @route   GET api/stations/:id
// @desc    GET get single station
// @access  Public
router.get('/getStation/:id', (req, res) => {
    const id = req.params.id;
    Station.findById(id)
        .then(station => {
            if (station)
                res.json(station);
        })
});

// @route   POST api/stations/
// @desc    POST add new station
// @access  Public
router.post('/', (req, res) => {
    const newStation = new Station({
        stationID: req.body.stationID,
        stationOrder: req.body.stationOrder,
        stationBefore: req.body.stationBefore,
        stationNext: req.body.stationNext
    })

    newStation.save().then(station => res.json(station));
})

// @route   PUT api/stations/updateStation
// @desc    PUT update an station
// @access  Public
router.put('/updateStation', (req, res) => {
    const stationID = req.body.stationID;
    const stationOrder = req.body.stationOrder;
    const stationBefore = req.body.stationBefore;
    const stationNext = req.body.stationNext;

    Order.findOneAndUpdate({ stationID: stationID }, {
        $set: {
            stationOrder: stationOrder,
            stationBefore: stationBefore,
            stationNext: stationNext
        },
    }, { useFindAndModify: false })
        .then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
})

module.exports = router;