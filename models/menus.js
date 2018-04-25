var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menusSchema = new Schema({
    menu : String,
    use_yn : String
})

module.exports = mongoose.model('menus', menusSchema);