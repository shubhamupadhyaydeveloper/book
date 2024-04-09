const mongoose = require('mongoose')

const bookSchema  = new mongoose.Schema({
    author : String,
    name : String,
    booklength : Number,
    chapters : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Chapter'
    }
})

const Book = mongoose.model('Book',bookSchema)

module.exports = Book;