const mongoose = require("mongoose")

async function calldb() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/books')
      console.log("you connected to mongoose")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = calldb;