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

User.belongsToMany(Recipe, {
    through: MealPlan,
    as: "saved_recipes",
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

Recipe.belongsToMany(User, {
    through: MealPlan,
    as: "saved_recipes",
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

// ==== User/MealPlan ===========
User.hasMany(MealPlan, {
    foreignKey: "user_id"
});

MealPlan.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

// ==== MealPlan/Recipe ===========
MealPlan.belongsTo(Recipe, {
    foreignKey: "recipe_id",
    onDelete: "SET NULL"
});

Recipe.hasMany(MealPlan, {
    foreignKey: "recipe_id"
});

// ==== Ingredient/Recipe ========
Recipe.hasMany(Ingredient);
Ingredient.belongsTo(Recipe);

// ==== User/Comment ========
User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

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