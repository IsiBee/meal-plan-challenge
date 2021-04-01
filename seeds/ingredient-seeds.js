// ingredient seeds

const { Ingredient } = require("../models");

const ingredientData = [
    {
        ingredient_name: "Cheddar",
        quantity: "4oz",
        preparation: "finely shredded",
        recipe_id: 1
    },
    {
        ingredient_name: "Bread",
        quantity: "1 slice",
        preparation: null,
        recipe_id: 2
    },
    {
        ingredient_name: "Butter",
        quantity: "1tsp",
        preparation: null,
        recipe_id: 2
    },
    {
        ingredient_name: "Macaroni",
        quantity: "8oz",
        preparation: null,
        recipe_id: 1
    },
    {
        ingredient_name: "Mayonaise",
        quantity: "2tsp",
        preparation: null,
        recipe_id: 3
    },
    {
        ingredient_name: "Bologna",
        quantity: "1 slice",
        preparation: null,
        recipe_id: 3
    },
    {
        ingredient_name: "Bread",
        quantity: "2 slices",
        preparation: null,
        recipe_id: 3
    },
    {
        ingredient_name: "Chicken",
        quantity: "1 whole chicken",
        preparation: "salted and peppered",
        recipe_id: 4
    }
];

const seedIngredients = () => Ingredient.bulkCreate(ingredientData);

module.exports = seedIngredients;