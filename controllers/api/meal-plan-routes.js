const router = require('express').Router();
const { User, MealPlan, Recipe, Ingredient } = require('../../models');

const chalk = require('chalk');

// GET all meal plans ".../api/mealplans"
router.get("/", (req, res) => {
    console.log(chalk.green("GET all meal plans route"))

    MealPlan.findAll({
        include: [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Recipe,
                attributes: [
                    "id",
                    "recipe_name",
                    "description",
                    "created_at",
                    "prep_time",
                    "cook_time",
                    "cooking_instructions",
                    "is_spicy",
                    "user_id"
                ],
                include: [
                    {
                        model: User,
                        attributes: ["username"]
                    }
                ]
            },
            {
                model: Ingredient,
                attributes: [
                    "id",
                    "ingredient_name",
                    "preparation",
                    "recipe_id"
                ]
            }
        ]
    })
        .then(dbMealPlanData => res.json(dbMealPlanData))
        .catch(err => res.status(500).json(err));
});

// GET one meal plan ".../api/mealplans/:id"
router.get("/:id", (req, res) => {
    console.log(chalk.green("GET one meal plan route"))
});

// CREATE meal plan ".../api/mealplans"
router.post("/", (req, res) => {
    console.log(chalk.green("CREATE meal plan route"))

});

// UPDATE meal plan ".../api/mealplans/:id"
router.put("/:id", (req, res) => {
    console.log(chalk.green("UPDATE meal plan route"))

});

// DELETE meal plan ".../api/mealplans/:id"
router.delete("/:id", (req, res) => {
    console.log(chalk.green("DELETE meal plan route"))

});

module.exports = router;