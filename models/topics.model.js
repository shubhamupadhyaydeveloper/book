const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    title : String,
    page : Number,
    subtopics : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Subtopic'
    }
})

const Topic = mongoose.model('Topic',topicSchema)

module.exports = Topic