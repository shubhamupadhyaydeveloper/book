const mongoose = require('mongoose')

const subTopicSchema = new mongoose.Schema({
    title : String,
    page : Number,
})

const Subtopic = mongoose.model('Subtopic',subTopicSchema)
module.exports = Subtopic;