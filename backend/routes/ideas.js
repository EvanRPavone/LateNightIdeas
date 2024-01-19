const express = require('express');
const {
  getIdeas,
  getIdea,
  createIdea,
  deleteIdea,
  updateIdea
} = require('../controllers/ideaController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all idea routes
router.use(requireAuth)

// GET ALL IDEAS
router.get('/', getIdeas);

// GET a single idea
router.get('/:id', getIdea);

// POST a new idea
router.post("/", createIdea);

// DELETE an idea
router.delete('/:id', deleteIdea);

// UPDATE an idea
router.patch('/:id', updateIdea);


module.exports = router;
