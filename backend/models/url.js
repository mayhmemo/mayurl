const mongoose = require('mongoose');

// Define URL Schema and Model
const urlSchema = new mongoose.Schema({
    shortUrl: { type: String, required: true },
    longUrl: { type: String, required: true },
});

module.exports = mongoose.model('Url', urlSchema);