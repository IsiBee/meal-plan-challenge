const router = require("express").Router();
const { Recipe, User, Comment, Ingredient } = require("../models");
const withAuth = require("../utils/auth");

// GET recipes user created "/dashboard"
router.get("/", /*withAuth,*/ (req, res) => {
    Recipe.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            "id",
            "recipe_name",
            "description",
            "created_at",
            "servings",
            "prep_time",
            "cook_time",
            "cooking_instructions",
            "is_spicy",
            // "ingredient_id",
            // "weekday",
            "user_id"
        ],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "recipe_id", "user_id", "created_at"],
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
            const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));
            res.render("dashboard", { recipes, loggedIn: true });
        })
        .catch(err => res.status(500).json(err));
});

// user clicks edit recipe link on dashboard "/dashboard/edit/:id"
router.get("/edit/:id", /*withAuth,*/ (req, res) => {
    Recipe.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "recipe_name",
            "description",
            "created_at",
            "servings",
            "prep_time",
            "cook_time",
            "cooking_instructions",
            "is_spicy",
            // "ingredient_id",
            // "weekday",
            "user_id"
        ],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "recipe_id", "user_id", "created_at"],
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
            if (!dbRecipeData) {
                res.status(404).end();
                return;
            }

            const recipe = dbRecipeData.get({ plain: true });

            res.render("edit-recipe", {
                recipe,
                loggedIn: true
            });
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;