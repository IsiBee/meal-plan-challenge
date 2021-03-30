const User = require("./User");
const Favorite = require("./Favorite");
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
    through: Favorite,
    as: "favorited_recipes",
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

Recipe.belongsToMany(User, {
    through: Favorite,
    as: "favorited_recipes",
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

// ==== User/Favorit ===========
User.hasMany(Favorite, {
    foreignKey: "user_id"
});

Favorite.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
});

// ==== Favorit/Recipe ===========
Favorite.belongsTo(Recipe, {
    foreignKey: "recipe_id",
    onDelete: "SET NULL"
});

Recipe.hasMany(Favorite, {
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


module.exports = { User, Favorite, Ingredient, Comment, Recipe };