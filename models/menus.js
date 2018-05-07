var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a schema
var menusSchema = new Schema({
    menu : String,
    link : String,
    title : String,
    description : String,
    list : Array,
    begin_date : Date,
    end_date : Date,
    img : String,
    header : String,
    detail : Array
})

// compile our model
module.exports = mongoose.model('menus', menusSchema);