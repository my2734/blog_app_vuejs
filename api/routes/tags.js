const express = require('express')
const router = express.Router()
const Tags = require('../models/Tags')

//store
router.post('/', async (req,res)=>{
    const name = req.body.name;
    try{
        const tags = await Tags.findOne({name: name})
        if(tags){
            return res.status(404).json('Tags da ton tai')
        }
        const tags_new = new Tags(req.body)
        const savedStore =await tags_new.save()
        res.status(200).json(savedStore)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})

//get all 
router.get('/', async (req,res)=>{
    try{
        const data = await Tags.find();
        res.status(200).json(data);
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})
//get detail
router.get('/:id',async (req,res)=>{
    try{
        const id = req.params.id
        const tags = await Tags.findById(id)
        res.status(200).json(tags)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})
//delete all 
router.delete('/', async (req,res)=>{
    try{
        const deleteTags = await Tags.deleteMany();
        res.json(deleteTags)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
})
//delete 
router.delete('/:id', async (req,res)=>{
    try{
        const deleteTags = await Tags.findByIdAndDelete(req.params.id)
        res.json(deleteTags)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
})

//update 
router.patch('/:id', async (req,res)=>{
    try{
        const new_tags = await Tags.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(new_tags)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router