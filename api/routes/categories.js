const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

//store
router.post('/', async (req,res)=>{
    const newcat = new Category(req.body)
    try{
        const savedCat = await newcat.save()
        res.status(200).json(savedCat)
    }catch(error){
        res.status(500).json(error)
    }
})

//get all category
router.get('/', async (req,res)=>{
    try{
        const listCat = await Category.find();
        res.status(200).json(listCat)
    }catch(error){
        res.status(500).json(error)
    }
})

//Get detail 
router.get('/:id',async (req,res)=>{
    try{
        const cat = await Category.findById(req.params.id)
        res.status(200).json(cat)
    }catch(error){
        res.status(200).json(error)
    }
})
//delete all 
router.delete('/', async (req,res)=>{
    try{
        const savedDelete = await Category.deleteMany();
        res.status(200).json("Delete all success")
    }catch(error){
        res.status(500).json(error)
    }
})
//delete 
router.delete('/:id', async (req,res)=>{
    try{
        const deletedCat = await Category.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedCat)
    }catch(error){
        res.status(500).json(error)
    }
})
//update 
router.patch('/:id', async (req,res)=>{
    try{
        const savedUpdate =  await Category.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(savedUpdate)
    }catch(error){
        res.status(500).json(error)
    }
})
module.exports = router