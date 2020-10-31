const express = require('express');
const router = express.Router();

const Order = require('../../models/Order');

// initialize socket.io
const users = [];
require('../../io').io().sockets.on('connection', (socket) => {
    socket.on('connected', () => {
        console.log('tracker connected...');
        users.push(socket);
    });
});

// notify users on a create or an update event
const notifyUsers = () => {
    users.forEach(socket => {
        socket.emit('orders_updated')
    });
}

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

// @route   GET api/orders/
// @desc    GET message
// @access  Public
router.get('/', (req, res) => {
    res.send('orders...')
})

// @route   GET api/orders/:limit
// @desc    GET orders with limit
// @access  Public
router.get('/:limit', (req, res) => {
    const limit = parseInt(req.params.limit);
    Order.find()
        .limit(limit)
        .exec((err, orders) => {
            res.json(orders);
        })
});

// @route   GET api/orders/get
// @desc    GET orders without limit
// @access  Public
router.get('/get', (req, res) => {
    Order.find()
        .exec((err, orders) => {
            res.json(orders);
        })
});

// @route   POST api/orders/search
// @desc    POST search order
// @access  Public
router.post('/search', (req, res) => {
    const KW = req.body.keyword;
    Order.find({ $text: { $search: KW } })
        .then(orders => {
            if (orders)
                res.json(orders);
            else
                res.json({ msg: "No orders found" });
        })
});

// @route   POST api/orders/filterA
// @desc    POST filter AND from orders
// @access  Public
router.post('/filterA', (req, res) => {
    const { colour, style, size } = req.body.tags;
    Order.find({ colour: colour, style: style, size: size })
        .then(orders => {
            if (orders)
                res.json(orders);
            else
                res.json({ msg: "No orders found" });
        })
});

// @route   POST api/orders/filterB
// @desc    POST filter OR from orders
// @access  Public
router.post('/filterB', (req, res) => {
    const { colour, style, size } = req.body.tags;
    Order.find({ $or: [{ colour: colour }, { style: style }, { size: size }] })
        .then(orders => {
            if (orders)
                res.json(orders);
            else
                res.json({ msg: "No orders found" });
        })
});

// @route   DELETE api/orders/:id
// @desc    DELETE delete order
// @access  Public
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Order.findById(id)
        .then(order => {
            Order.deleteOne(order)
                .then(() => {
                    res.json({ success: true });
                    notifyUsers();
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ success: false });
                })
        });
});

// @route   GET api/orders/getOrder/:id
// @desc    GET get orders from id
// @access  Public
router.get('/getOrder/:id', (req, res) => {
    const id = req.params.id;
    Order.find({ orderID: id })
        .then(order => {
            if (order)
                res.json(order);
        })
});

// @route   POST api/orders/
// @desc    POST add new order
// @access  Public
router.post('/', (req, res) => {
    const newOrder = new Order({
        orderID: req.body.orderID,
        createdDate: req.body.createdDate,
        colour: req.body.colour,
        style: req.body.style,
        size: req.body.size,
        stationedIn: req.body.stationedIn,
        stationedStatus: req.body.stationedStatus,
        orderStatus: req.body.orderStatus,
    })

    newOrder.save().then(order => res.json(order));
    notifyUsers();
})

// @route   PUT api/orders/updateOrder
// @desc    PUT update an order
// @access  Public
router.put('/updateOrder', (req, res) => {
    const orderID = req.body.orderID;
    const colour = req.body.colour;
    const style = req.body.style;
    const size = req.body.size;
    const stationedIn = req.body.stationedIn;
    const stationedStatus = req.body.stationedStatus;
    const orderStatus = req.body.orderStatus;

    Order.findOneAndUpdate({ orderID: orderID }, {
        $set: {
            colour: colour,
            style: style,
            size: size,
            stationedIn: stationedIn,
            stationedStatus: stationedStatus,
            orderStatus: orderStatus
        },
    }, { useFindAndModify: false })
        .then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        })

    notifyUsers();
})

module.exports = router;