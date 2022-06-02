const mongoose = require("mongoose")
const uri = "mongodb+srv://admin:admin@cluster0.829gx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const db = mongoose.connect(uri)



exports.db = mongoose