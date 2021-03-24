const router = require('express').Router();
const { Recipe, User, Comment } = require('../../models');

// GET all recipes ".../api/recipes"
router.get("/", (req, res) => {
    Recipe.findAll({
        attributes: [
            "id",
            "recipe_name",
            "description",
            "created_at",
            "prep_time",
            "cook_time",
            "cooking_instructions",
            "is_spicy",
            "ingredient_id",
            "weekday",
            "user_id"
        ],
        order: [["created_at", "DESC"]],
        include: [
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text",
                    "recipe_id",
                    "user_id",
                    "created_at"
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
        .then(dbRecipeData => res.json(dbRecipeData))
        .catch(err => res.status(500).json(err));
});

// GET single recipe ".../api/recipes/:id"
router.get("/:id", (req, res) => {
    Recipe.findOne({
        where: { id: req.params.id },
        attributes: [
            "id",
            "recipe_name",
            "description",
            "created_at",
            "prep_time",
            "cook_time",
            "cooking_instructions",
            "is_spicy",
            "ingredient_id",
            "weekday",
            "user_id"
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text",
                    "recipe_id",
                    "user_id",
                    "created_at"
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
        .then(dbRecipeData => {
            if (!dbRecipeData) return res.status(404).json({ message: "No recipe found with this id"});

            res.json(dbRecipeData);
        })
        .catch(err => res.status(500).json(err));
});

// POST create new recipe ".../api/recipes"

// UPVOTE route

// PUT update recipe ".../api/recipes/:id"

// DELETE a recipe ".../api/recipes/:id"

module.exports = router;