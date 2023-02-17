const mongoose = require('mongoose')
const TagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Tags', TagsSchema)