const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type: String, 
        required: false,
    },
    name: {
        type: String, 
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    author: {
        type: String, 
        required: true,
    },
    categories: {
        type: Array,
        required: false,
    },
    tags: {
        type: Array,
        required: false,
    },
    comment: [
        {
            username: String,
            content: String
        }
    ]
},{
    timestamps: true
})

module.exports = mongoose.model('Post', PostSchema)