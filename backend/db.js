const mongoose = require("mongoose")

const mongoURI = "mongodb://localhost:27017/namjyot"

const connectToMongo = async() => {
    await mongoose.connect(mongoURI)
    console.log("Connected to Database")
}

module.exports = connectToMongo;