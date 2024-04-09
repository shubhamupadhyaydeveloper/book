const express  = require('express')
const app =  express()
const port = 3000
const bookRouter = require('./routes/book.route')
const connectTomongodb = require('./mongodb.connect')

connectTomongodb()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/api', bookRouter)

app.listen(port ,()  => {
    console.log('listen on port 3000')
})

app.get('/',(req,res)  => {
    res.send('welcome to my app')
})