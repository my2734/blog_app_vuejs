const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')

//store

router.post('/', async (req,res)=>{
    const newPost = await Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }catch(error){
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

module.exports = router

