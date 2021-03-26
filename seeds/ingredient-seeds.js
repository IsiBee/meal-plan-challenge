// ingredient seeds

const { Ingredient } = require("../models");

const ingredientData = [
    {
        ingredient_name: "Cheddar",
        is_gluten_free: true,
        is_vegetarian: true,
        is_vegan: false,
        is_keto: true
    }
];

const seedIngredients = () => Ingredient.bulkCreate(ingredientData);

module.exports = seedIngredients;