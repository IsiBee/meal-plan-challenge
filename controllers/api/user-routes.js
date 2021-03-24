const router = require('express').Router();
const { User, Recipe, Comment } = require('../../models');

// GET all users ".../api/users"
router.get("/", (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(500).json(err));
});

// GET user by id ".../api/users/:id"
router.get("/:id", (req, res) => {
    User.findOne({
        attributes: { exclude: ["password"] },
        where: { id: req.params.id },
        include: [
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
                    "ingredient_id",
                    "weekday",
                    "user_id"
                ]
            },
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text",
                    "created_at"
                ],
                include: {
                    model: Recipe,
                    attributes: ["recipe_name"]
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) return res.status(404).json({ message: "No user found with this id" });

            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;