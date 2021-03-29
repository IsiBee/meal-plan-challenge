const User = require("./User");
const MealPlan = require("./Meal-Plan");
const Ingredient = require("./Ingredient");
const Comment = require("./Comment");
const Recipe = require("./Recipe");

// ==== User/Recipe ===========
User.hasMany(Recipe, {
    foreignKey: "user_id"
});

Recipe.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

// ==== User/MealPlan ===========
User.hasMany(MealPlan);
MealPlan.belongsTo(User);

// ==== MealPlan/Recipe ===========
MealPlan.hasMany(Recipe);
Recipe.belongsToMany(MealPlan);

// ==== User/Comment ========
User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

// ==== Ingredient/Recipe ========
Recipe.hasMany(Ingredient);
Ingredient.belongsTo(Recipe);

//=== Recipe/Comment ========

Recipe.hasMany(Comment, {
    foreignKey: "recipe_id",
    onDelete: "SET NULL"
});

Comment.belongsTo(Recipe, {
    foreignKey: "recipe_id",
    onDelete: "SET NULL"
});


module.exports = { User, MealPlan, Ingredient, Comment, Recipe };