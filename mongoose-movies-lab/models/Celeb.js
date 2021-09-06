const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const celebSchema = new Schema({
    name: String, 
    occupation: String,
    catchphrase: String
});

const Celeb = mongoose.model('Book', celebSchema);
module.exports = Celeb;