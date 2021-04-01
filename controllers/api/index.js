const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const recipeRoutes = require('./recipe-routes.js');
const ingredientRoutes = require('./ingredient-routes.js');
const commentRoutes = require('./comment-routes.js');
const scheduleRoutes = require('./schedule-routes.js');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/comments', commentRoutes);
router.use('/schedules', scheduleRoutes);

module.exports = router;