const router = require('express').Router();
const { Ingredient, Recipe } = require('../../models');

// GET all ingredients ".../api/ingredients"
router.get('/', (req, res) => {
    Ingredient.findAll({
        attributes: [
            "id",
            "ingredient_name",
            "recipe_id"
        ],
        include: [
            {
                model: Recipe,
                attributes: [
                    "id",
                    "recipe_name"
                ]
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
            "preparation",
            "recipe_id"
        ],
        include: [
            {
                model: Recipe,
                attributes: [
                    "id",
                    "recipe_name",
                ]
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
    //     preparation: "shredded",
    //     recipe_id: 1
    // }
    Ingredient.create({
        ingredient_name: req.body.ingredient_name,
        preparation: req.body.preparation,
        recipe_id: req.body.recipe_id
    })
        .then(dbIngredientData => res.json(dbIngredientData))
        .catch(err => res.status(500).json(err));
});

// PUT update ingredient ".../api/ingredients/:id"
router.put("/:id", (req, res) => {
    Ingredient.update(
        {
            ingredient_name: req.body.ingredient_name,
            preparation: req.body.preparation,
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