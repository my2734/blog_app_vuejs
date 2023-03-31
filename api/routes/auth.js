const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//register
router.post('/register', async (req, res) => {  
    try{
        const userExist = await User.findOne({ username: req.body.username })
        // userExist &&
        if(userExist){
            return res.status(401).json("user exist")
        }
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)
        const user = new User(req.body)
        try{
            const userSaved = await user.save()
            const {password, ...other} = userSaved._doc

            res.status(200).json(other)
        }catch(error){
            res.status(500).json(error)
        }
    }catch(error){

        res.status(500).json(error)
    }

})

//login

router.post('/login' ,async (req,res)=>{
    const username = req.body.username
    try{      
        const user = await User.findOne({username: username})
        if(!user){
            res.status(401).json('User not exist')
        }else{
            try{
                const verify = await bcrypt.compare(req.body.password, user.password)
                if(!verify){
                    res.status(401).json('Password wrong')
                }else{
                    const {password,...userInfo} = user._doc
                    const TOKEN_SERECT = process.env.TOKEN_SERECT
                    const token = jwt.sign(userInfo, TOKEN_SERECT)
                    res.status(200).json(token)
                }
            }catch(error){
                res.status(500).json('verify error')
            }

        }

    }catch(error){
        res.status(500).json('Not found user')
    }
})

module.exports = router