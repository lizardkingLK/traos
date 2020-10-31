const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StationSchema = new Schema({
    stationID: {
        type: String,
        unique: true,
        required: true
    },
    stationOrder: {
        type: Number,
        required: true
    },
    stationBefore: {
        type: String,
        default: null
    },
    stationNext: {
        type: String,
        default: null
    }
})

module.exports = Station = mongoose.model('station', StationSchema);

