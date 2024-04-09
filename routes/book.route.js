const express =  require('express')
const router = express.Router()
const {createBook,createChapter,createTopics,getChapter,updateChapter,deleteChapter,createSubtopics} = require('../controllers/book.controler')

router.get('/book/getchapter/:bookId',getChapter)
router.put('/book/updatechapter/:chapterId',updateChapter)
router.post('/book' ,createBook)
router.post('/book/:bookId/createchapter',createChapter)
router.post('/book/newtopic/:chapterId',createTopics)
router.post('/book/newsubtopic/:topicId',createSubtopics)
router.delete('/book/deletechapter/:chapterId',deleteChapter)


module.exports = router;