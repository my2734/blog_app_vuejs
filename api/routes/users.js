const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Post = require('../models/Post')

const router = express.Router()

//update
router.put('/:id', async (req,res)=>{
    if(req.params.id === req.body.id){
        if(req.body.params){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true})
            const {password, ...other} = updateUser._doc
            res.status(200).json(other)
        }catch(error){
            res.status(500).json(error)
        }
    }else{
        res.status(401).json('You can delete your account')
    }
})

//delete
router.delete('/:id', async (req,res)=>{
    if(req.params.id === req.body.id){
        try{
            const user = await User.findById(req.params.id)
            try{
                await Post.deleteMany({username: user.username})
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json('User has been deleted')
            }catch(error){
                res.status(500).json(error)
            }
        }catch(error){
            res.status(404).json('Not found')
        }
    }else{
        res.status(401).json('You can delete only your account')
    }
})
//get user 

module.exports = router