const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')

//limit
router.get('/limit/:quanlity', async (req,res)=>{
    try{
        const quanlity = JSON.parse(req.params.quanlity);
        const list_blog = await Post.find().limit(quanlity)
        res.status(200).json(list_blog)
    }catch(error){
        res.status(500).json(error)
    }
})


//store
router.post('/', async (req,res)=>{
    const newPost = await Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})

//update 

router.put('/:id', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updatedPost)
        }else{
            res.status(401).json('You can uploads only your post!')
        }
    }catch(error){
        res.status(500).json(error)
    }
})

//delete

router.delete('/:id', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json('delete success')
        }else{
            res.status(401).json('You can delete only your post')
        }
    }catch(error){
        res.status(500).json(error)
    }
})

//get all
router.get('/', async (req,res)=>{
    const searchByCat = req.query.category
    const page = parseInt(req.query.page)
    const PAGE_SIZE = 2
    const searchKey = req.query.searchKey
    const start = (page-1)*PAGE_SIZE
    if(page && searchByCat){
        try{
            let list_post = []
            const posts = await Post.find()
            var length = 0;
            posts.forEach((post)=>{
                if(post.categories.map(cat=>cat.toLowerCase()).includes(searchByCat.toLowerCase())){
                    if(list_post.length < 2*page){
                        list_post.push(post)
                    }
                    length++;
                }
            })
            res.status(200).json({
                list_post: list_post,
                length: length
            })
        }catch(error){
            res.status(200).json(error)
        }
    }else if(page){
        try{
            const posts = await Post.find().skip(start).limit(PAGE_SIZE)
            res.status(200).json(posts)
        }catch(error){
            res.status(500).json(error)
        } 
    }else if(searchByCat){
        try{
            let list_post = []
            const posts = await Post.find()
            // posts.filter(post => post.categories.map(cat=>cat.toLowerCase()).includes(searchByCat.toLowerCase()));
            posts.forEach(post=>{
                if(post.categories.map(cat=>cat.toLowerCase()).includes(searchByCat.toLowerCase())){
                    list_post.push(post);
                }
            })
            res.status(200).json(list_post)
        }catch(error){
            res.status(200).json(error)
        }
    }else if(searchKey){
        try{
            let list_post = []
            const posts = await Post.find()
            console.log(searchKey.toLowerCase())
            posts.forEach((post)=>{
                if(post.name.toLowerCase().includes(searchKey.toLowerCase())){
                    list_post.push(post)
                }
            })
            res.status(200).json(list_post)
        }catch(error){
            console.log(error)
            res.status(500).json(error)
        }
    }
    else{
        try{
            const posts = await Post.find()
            res.status(200).json(posts)
        }catch(error){
            res.status(500).json(error)
        }
    }
})


//get category
router.get('/category', async (req,res)=>{
    try{
        const posts = await Post.find()
        res.status(200).json(posts)
    }catch(error){
        res.status(500).json(error)
    }
})

//get detail
router.get('/:id', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(error){
        res.status(500).json('not found')
    }
})

//delete all 
router.delete('/', async (req,res)=>{
    try{
        const savedDelete = await Post.deleteMany();
        res.status(200).json('Delete successfully!')
    }catch(error){
        console.log(error)
        res.status(500).json('not delete all')
    }
})



module.exports = router

