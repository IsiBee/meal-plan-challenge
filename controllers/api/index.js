const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const recipeRoutes = require('./recipe-routes.js');
const ingredientRoutes = require('./ingredientRoutes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/comments', commentRoutes);

module.exports = router;