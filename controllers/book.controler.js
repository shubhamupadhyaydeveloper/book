const Book = require('../models/book.model')
const Chapter = require('../models/chapter.model')
const Topic = require('../models/topics.model')
const SubTopic = require('../models/subtopics')

const createBook = async (req,res) => {
    try {
      const {author,name,booklength} = req.body;
      if(!author || !name  || !booklength) return res.status(400).json({message :  'missing fields'})

      const newBook = new Book({
        author,
        name,
        booklength
      })

      await newBook.save()

      res.status(201).json({message : 'bookcreated successfully'})

    } catch (error) {
        console.log('Error in createBook',error.message)
    }
}

const createChapter = async (req,res) =>  {
  try {
    const {bookId} = req.params
    const {title,pageNumber} = req.body;
    if(!title || !pageNumber) return res.status(400).json({message : 'missing fields'})
    const book = await Book.findById(bookId)
    if(!book) return res.status(404).json({message : 'book not found'})
  
    const newChapter =  new  Chapter({
      title,
      pageNumber
    })

    await newChapter.save()

    book.chapters.push(newChapter._id)
    await book.save()

    res.status(201).json({message : 'chapter created Successfully'})
    
  } catch (error) {
    console.log('Error  in createChapter',error.message)
  }
}

const createTopics = async (req,res) => {
  try {
    const {chapterId} = req.params;
    const {title,page}  = req.body;
    if(!title || !page) return res.status(400).json({message : 'missing fields'})
    const chapter = await Chapter.findById(chapterId)
    if(!chapter) return res.status(404).json({message : 'chapter not found'})

    const newTopic = new Topic({
       title,
       page
    })

    await newTopic.save()

    chapter.topics.push(newTopic._id)
    await chapter.save()

    res.send(201).json({message : 'topic is created'})

  } catch (error) {
    console.log("Error in createTopics",error.message)
  }
}

const createSubtopics = async (req,res) =>  {
  try {
    const {topicId} = req.params
    const {title,page} = req.body;
    if(!title || !page) return res.status(400).json({message : 'missing fields'})
    const topic = await Topic.findById(topicId)
    if(!topic) return res.status(404).json({message : 'Topic not found'})
    
    const newSubtopic = new SubTopic({
       title,
       page
    })

    await newSubtopic.save()

    topic.subtopics.push(newSubtopic._id)
    await topic.save()

    res.status(201).json({message : 'subtopic is createad'})

  } catch (error) {
    console.log('Error in createSubtopics',error.message)
  }
}

const getChapter = async (req,res) =>  {
  try {
    const {bookId} = req.params;
    const book = await Book.findById(bookId).populate({
      path : 'chapters',
      populate : {
        path : 'topics',
        populate : {
          path : 'subtopics'
        }
      }
    })
    if(!book) return res.status(404).json({message: "book not found"})
    
    res.status(200).json({chapter : book.chapters})
  } catch (error) {
    console.log('Error in getChapter',error.message)
  }
}

const updateChapter = async (req,res) => {
  try {
    const {chapterId} = req.params;
    const {title,pageNumber} = req.body
    const chapter = await Chapter.findById(chapterId).populate('topics')
    
    chapter.title = title || chapter.title
    chapter.pageNumber = pageNumber || chapter.pageNumber

    await chapter.save()

    res.status(201).json({message : 'chapter is updated',upadatedChaper : chapter})

  } catch (error) {
    console.log('Error in update Chapter',error.message)
  }
}

const deleteChapter = async (req,res) => {
  try {
    const {chapterId} = req.params
    const chapter = await Chapter.findById(chapterId)
    if(!chapter) return res.status(404).json({message : 'chapter not found'})
    const deleteChapter = await Chapter.findByIdAndDelete(chapterId)

    res.status(200).json({message : 'chapter is deleted'})
  } catch (error) {
    console.log('Error in deletechapter',error.message)
  }
}




module.exports = {createBook,createChapter,createTopics,getChapter,updateChapter,deleteChapter,createSubtopics}