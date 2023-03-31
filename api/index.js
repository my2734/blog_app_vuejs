const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const categoryRouter = require('./routes/categories')
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const tagsRouter = require('./routes/tags')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

mongoose.set("strictQuery", true);
mongoose.connect('mongodb://127.0.0.1:27017/blog_app3')
.then(console.log('Connect mongodb success'))
.catch(error=>{
    console.log('Connect mongodb failed')
})

app.use(cors())

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended:true}))

app.use('/images', express.static(path.join(__dirname, "/images")))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
  })
   
  var upload = multer({ storage: storage })

app.post('/api/upload', upload.single("file"), (req,res)=> {
    res.status(200).json('Upload image success')
})

app.get('/api/isAdmin/:token',(req,res)=>{
    const token = req.params.token
    const TOKEN_SERECT = process.env.TOKEN_SERECT
    const data = jwt.verify(token, TOKEN_SERECT);
    console.log(data)
    if(data.role == 0){
        res.status(200).json('true')
    }else{
        res.status(200).json('false')
    }
})

app.use('/api/auth', authRouter)
app.use('/api/category', categoryRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/tags', tagsRouter)


app.listen(8080, ()=>{
    console.log("Server running on port 8080")
})