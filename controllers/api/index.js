const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const mealPlanRoutes = require('./meal-plan-routes.js');
const recipeRoutes = require('./recipe-routes.js');
const ingredientRoutes = require('./ingredient-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/users', userRoutes);
router.use('/mealplans', mealPlanRoutes);
router.use('/recipes', recipeRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/comments', commentRoutes);

module.exports = router;