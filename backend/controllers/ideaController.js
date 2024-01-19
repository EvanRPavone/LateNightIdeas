const Idea = require('../models/ideaModel');
const mongoose = require('mongoose');


// get all ideas
const getIdeas = async (req, res) => {
  const ideas = await Idea.find().sort({createdAt: -1})

  res.status(200).json(ideas)
};


// get single idea
const getIdea = async (req, res) => { 
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "Idea doesn't exist..."})
  }

  const idea = await Idea.findById(id)

  if (!idea) {
    return res.status(400).json({error: "Idea doesn't exist..."})
  }

  res.status(200).json(idea)
};


// create new idea
const createIdea = async (req, res) => {
  const { description, acknowledged, privacy } = req.body

  let emptyFields = []

  if(!description) {
    emptyFields.push('description')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields", emptyFields})
  }

  // add document to db
  try {
    const idea = await Idea.create({ description, acknowledged, privacy })
    res.status(200).json(idea)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};


// delete an idea
const deleteIdea = async (req, res) => { 
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "Idea doesn't exist..."})
  }

  const idea = await Idea.findOneAndDelete({ _id: id })

  if (!idea) {
    return res.status(400).json({error: "Idea doesn't exist..."})
  }

  res.status(200).json(idea)
}

// update an idea
const updateIdea = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "Idea doesn't exist..."})
  }

  const idea = await Idea.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!idea) {
    return res.status(400).json({error: "Idea doesn't exist..."})
  }

  res.status(200).json(idea)
}

module.exports = {
  getIdeas,
  getIdea,
  createIdea,
  deleteIdea,
  updateIdea
};
