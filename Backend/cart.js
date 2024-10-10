const mongoose = require('mongoose');

const schema = mongoose.Schema({
    UserName : String,
    CartProducts : Array,
    HistoryProducts : Array  
})

module.exports = mongoose.model("cart",schema);