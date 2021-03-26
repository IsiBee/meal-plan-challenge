const User = require("./User");

const Ingredient = require("./Ingredient");

const Comment = require("./comment");
const Recipe = require("./Recipe");

// ==== User/Recipe ===========
User.hasMany(Recipe, {
    foreignKey: "user_id"
});

Recipe.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
});
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

// Recipe.hasMany(Ingredient);

// Ingredient.hasMany(Recipe);

//=== Recipe/Comment ========

Recipe.hasMany(Comment, {
    foreignKey: "recipe_id",
    onDelete: "SET NULL"
});

Comment.belongsTo(Recipe, {
    foreignKey: "recipe_id",
    onDelete: "SET NULL"
});


module.exports = { User, Ingredient, Comment, Recipe };