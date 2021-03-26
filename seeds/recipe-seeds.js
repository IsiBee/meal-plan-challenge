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

        // ingredient_id: 1,
        // weekday: "Wednesday", // can be NULL

        // ^^^^^^^^^^^^^ Come back to this!

        user_id: 1
    },
    {
        recipe_name: "Buttered Toast",
        description: "toasted bread topped with butter",
        servings: 2,
        prep_time: "1 hour",
        cook_time: "3 hours",
        cooking_instructions: "gather all your bread, toast until golden, spread butter",
        is_spicy: false,

        user_id: 3
    },
    {
        recipe_name: "Bologna Sandwich",
        description: "your basic sandwich",
        servings: 1,
        prep_time: "1 minute",
        cook_time: "1 minute",
        cooking_instructions: "spread mayo on bread, place bologna and cheese in between slices, enjoy!",
        is_spicy: false,
        
        user_id: 2
    }
];

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;