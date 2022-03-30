const mongoose = require('mongoose')

const entrySchema = mongoose.Schema({
    id: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: String, required: false},
    description: {type: String, required: true},
    location: {type: String, required: false},
    images: {type: Array, required: false}
});

module.exports = mongoose.model('Entry', entrySchema);