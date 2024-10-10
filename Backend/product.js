const mongoose = require('mongoose');

const schema = mongoose.Schema({
    ProductID : String,
    ProductName : String,
    ProductType : String,
    Company : String,
    Cpu : String,
    Gpu : String,
    Ram : String,
    Storage : String,
    OS : String,
    Screen : String,
    Battery : String,
    images : Array,
    price : Number
})

module.exports = mongoose.model("product",schema);