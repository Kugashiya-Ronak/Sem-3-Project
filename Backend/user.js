const mongoose = require('mongoose');

const schema = mongoose.Schema({
    UserName : String,
    Password : String,
    UserEmail : String    
})

module.exports = mongoose.model("user",schema);