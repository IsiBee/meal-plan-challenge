const router = require('express').Router();
const { Ingredient, Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all ingredients ".../api/ingredients"
router.get('/', (req, res) => {
    Ingredient.findAll({
        attributes: [
            "id",
            "ingredient_name",
            "quantity",
            "preparation",
            "special_id"
        ],
        include: [
            {
                model: Recipe,
                attributes: [
                    "id",
                    "special_id",
                    "recipe_name"
                ]
            }
        ]
    })
        .then(dbIngredientData => res.json(dbIngredientData))
        .catch(err => res.status(500).json(err));
});

// GET single ingredient ".../api/ingredients/:id"
router.get("/:id", (req, res) => {
    Ingredient.findOne({
        where: { id: req.params.id },
        attributes: [
            "id",
            "ingredient_name",
            "quantity",
            "preparation",
            "special_id"
        ],
        include: [
            {
                model: Recipe,
                attributes: [
                    "id",
                    "special_id",
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

// POST create ingredient ".../api/ingredients"
router.post("/", withAuth, (req, res) => {
    // expects {
    //     ingredient_name: "Cheddar",
    //     quantity: 4oz,
    //     preparation: "shredded",
    //     special_id: 685177-274335-1617231796715 (or so...)
    // }
    Ingredient.create({
        ingredient_name: req.body.ingredient_name,
        quantity: req.body.quantity,
        preparation: req.body.preparation,
        special_id: req.body.special_id
    })
        .then(dbIngredientData => res.json(dbIngredientData))
        .catch(err => res.status(500).json(err));
});

// PUT update ingredient ".../api/ingredients/:id"
router.put("/:id", withAuth,(req, res) => {
    Ingredient.update(
        {
            ingredient_name: req.body.ingredient_name,
            quantity: req.body.quantity,
            preparation: req.body.preparation,
        },
        {
            individualHooks: true,
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
router.delete("/:id", withAuth,(req, res) => {
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