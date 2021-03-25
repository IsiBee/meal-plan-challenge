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
router.post("/", (req, res) => {
    // expects {
    //     ingredient_name: "Cheddar",
    //     is_gluten_free: true,
    //     is_vegetarian: true,
    //     is_vegan: false,
    //     is_keto: true
    // }
    Ingredient.create({
        ingredient_name: req.body.ingredient_name,
        is_gluten_free: req.body.is_gluten_free,
        is_vegetarian: req.body.is_vegetarian,
        is_vegan: req.body.is_vegan,
        is_keto: req.body.is_keto
    })
        .then(dbIngredientData => res.json(dbIngredientData))
        .catch(err => res.status(500).json(err));
});

// PUT update ingredient ".../api/ingredients/:id"
router.put("/:id", (req, res) => {
    Ingredient.update(
        {
            ingredient_name: req.body.ingredient_name,
            is_gluten_free: req.body.is_gluten_free,
            is_vegetarian: req.body.is_vegetarian,
            is_vegan: req.body.is_vegan,
            is_keto: req.body.is_keto    
        },
        {
            where: { id: req.params.id }
        }
    )
        .then(dbIngredientData => {
            if (!dbIngredientData) return res.status(404).json({ message: "No ingredient found with this id" });

            res.json(dbIngredientData);
        })
        .catch(err => res.status(500).json(err));
});

// DELETE ingredient ".../api/ingredients/:id"
router.delete("/:id", (req, res) => {
    Ingredient.destroy({
        where: { id: req.params.id }
    })
        .then(dbIngredientData => {
            if (!dbIngredientData) return res.status(404).json({ message: "No ingredient found with this id" });

            res.json(dbIngredientData);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;