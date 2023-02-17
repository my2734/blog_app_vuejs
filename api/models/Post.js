const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true,
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
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Post', PostSchema)