const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

const leaderSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    imgage: {
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    abbr: {
        type: String,
        require: true,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

var Leaders = mongoose.model('Leader', leaderSchema);
module.exports = Leaders;
