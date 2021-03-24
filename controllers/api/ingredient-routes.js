const router = require('express').Router();
const { Ingredient, Recipe, User } = require('../../models');

// GET all ingredients ".../api/ingredients"
router.get('/', (req, res) => {
    Ingredient.findAll({
        attributes: [
            "id",
            "ingredient_name",
            "is_gluten_free",
            "is_vegetarian",
            "is_vegan",
            "is_keto"
        ],
        include: [
            // maybe this will allow searching by ingredients?
            {
                model: Recipe,
                attributes: [
                    "id",
                    "recipe_name",
                    "servings",
                    "is_spicy",
                    "user_id"
                ],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbIngredientData => res.json(dbIngredientData))
        .catch(err => res.status(500).json(err));
});
// ^^^ REQUIRES ATTENTION ^^^^^^

// GET single ingredient ".../api/ingredients/:id"
router.get("/:id", (req, res) => {
    Ingredient.findOne({
        where: { id: req.params.id },
        attributes: [
            "id",
            "ingredient_name",
            "is_gluten_free",
            "is_vegetarian",
            "is_vegan",
            "is_keto"
        ],
        include: [
            // maybe this will allow searching by ingredients?
            {
                model: Recipe,
                attributes: [
                    "id",
                    "recipe_name",
                    "servings",
                    "is_spicy",
                    "user_id"
                ],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbIngredientData => {
            if(!dbIngredientData) return res.status(404).json({ message: "No ingredient found with this id" });

            res.json(dbIngredientData);
        })
        .catch(err => res.status(500).json(err));
});
// ^^^ REQUIRES ATTENTION ^^^^^^

// POST create ingredient ".../api/ingredients"

// PUT update ingredient ".../api/ingredients/:id"

// DELETE ingredient ".../api/ingredients/:id"

module.exports = router;