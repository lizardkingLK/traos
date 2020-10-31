const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderID: {
        type: String,
        unique: true,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    colour: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    stationedIn: {
        type: String,
        default: 'Station A'
    },
    stationedStatus: {
        type: String,
        default: 'Pending'
    },
    orderStatus: {
        type: String,
        default: 'In progress'
    }
})

module.exports = Order = mongoose.model('order', OrderSchema);

