const mongoose = require('mongoose')
const {Topic}  = require('./topics.model')

const chapterSchema = new mongoose.Schema({
    title  : String,
    pageNumber : Number,
    topics : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Topic'
    }
})

const Chapter = mongoose.model('Chapter',chapterSchema)
module.exports  =  Chapter