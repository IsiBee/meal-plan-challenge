// ingredient seeds

const { Ingredient } = require("../models");

const ingredientData = [
    {
        ingredient_name: "Cheddar",
        is_gluten_free: true,
        is_vegetarian: true,
        is_vegan: false,
        is_keto: true
    },
    {
        ingredient_name: "Bread",
        is_gluten_free: false,
        is_vegetarian: true,
        is_vegan: true,
        is_keto: false
    },
    {
        ingredient_name: "Butter",
        is_gluten_free: true,
        is_vegetarian: true,
        is_vegan: false,
        is_keto: true
    },
    {
        ingredient_name: "Macaroni",
        is_gluten_free: false,
        is_vegetarian: true,
        is_vegan: false,
        is_keto: false
    },
    {
        ingredient_name: "Mayonaise",
        is_gluten_free: true,
        is_vegetarian: true,
        is_vegan: false,
        is_keto: true
    },
    {
        ingredient_name: "Bologna",
        is_gluten_free: true,
        is_vegetarian: false,
        is_vegan: false,
        is_keto: false
    },
];

const seedIngredients = () => Ingredient.bulkCreate(ingredientData);

module.exports = seedIngredients;