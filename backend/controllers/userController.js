const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'}); // user will remain logged in for 3 days and then expire
}

// login user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    //create a token
    // HEADER.PAYLOAD.SIGNATURE
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

// signup user
const signupUser = async (req, res) => {
  const {email, firstName, lastName, password} = req.body
  try {
    const user = await User.signup(email, firstName, lastName, password)

    //create a token
    // HEADER.PAYLOAD.SIGNATURE
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

module.exports = { loginUser, signupUser };
