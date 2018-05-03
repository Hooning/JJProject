var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a schema
var menusSchema = new Schema({
    menu : String,
    link : String
})

// compile our model
module.exports = mongoose.model('menus', menusSchema);