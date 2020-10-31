const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    orderID: {
        type: String,
        required: true
    },
    context: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: Object,
        default: null
    }
})

module.exports = History = mongoose.model('history', HistorySchema);

