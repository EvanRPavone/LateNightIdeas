const Idea = require('../models/ideaModel');
const mongoose = require('mongoose');
// const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH); https://www.twilio.com/blog/send-scheduled-sms-node-js-twilio

// get all ideas
const getIdeas = async (req, res) => {
  const user_id = req.user._id

  const ideas = await Idea.find({ user_id }).sort({createdAt: -1})

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
    const user_id = req.user._id

    // client.messages
    //   .create({
    //     body: 'Hello from twilio-node',
    //     to: '+1'+ req.user.phone, // TODO set to users phone number https://www.twilio.com/blog/send-scheduled-sms-node-js-twilio
    //     from: env.process.TWILIO_NUMBER, // From a valid Twilio number
    //   })
    //   .then((message) => console.log("MSG ID: ",message.sid));
    // ! Toll Free Number needs verified and this cost money soooo

    // TODO use email as temporary notification solution

    console.log(req.user.email)
    const idea = await Idea.create({ description, acknowledged, privacy, user_id })
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
