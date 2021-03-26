// recipe seeds

const { Recipe } = require("../models");

const recipeData = [
    {
        recipe_name: "Mac & Cheese",
        description: "the easiest pasta",
        servings: 2,
        prep_time: "3 minutes",
        cook_time: "20 - 30 minutes",
        cooking_instructions: "follow box instructions",
        is_spicy: false,

        // === check back on the following ======================= 

        ingredient_id: 1,
        // weekday: "Wednesday", // can be NULL

        // ^^^^^^^^^^^^^ Come back to this!

        user_id: 1
    }
];

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;