const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ideaSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  acknowledged: {
    // if user has seen the idea and acknowledges it
    type: Boolean,
    default: false
  },
  privacy: {
    // if idea is private or public
    type: Boolean,
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Idea', ideaSchema); // => Idea.find()
