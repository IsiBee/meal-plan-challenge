const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Comment, Ingredient } = require("../models");
const withAuth = require("../utils/auth");

// render recipes on homepage "/"
router.get("/", (req, res) => {
    Recipe.findAll({
        attributes: [
            "id",
            "recipe_id",
            "recipe_name",
            "description",
            "created_at",
            "servings",
            "prep_time",
            "cook_time",
            "cooking_instructions",
            "is_spicy",
            "user_id"
        ],
        order: [["created_at", "DESC"]],
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

            res.render("homepage", {
                recipes,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => res.status(500).json(err));
});

// render login page "/login"
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

// render login page "/login"
router.get("/sign-up", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("sign-up");
});

// render single-recipe page "/recipe/:id"
router.get("/recipe/:id", (req, res) => {
    Recipe.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "recipe_id",
            "recipe_name",
            "description",
            "created_at",
            "servings",
            "prep_time",
            "cook_time",
            "cooking_instructions",
            "is_spicy",
            "user_id"
        ],
        include: [
            {
                model: Ingredient,
                attributes: [
                    "id",
                    "ingredient_name",
                    "quantity",
                    "preparation",
                    "recipe_id"
                ]
            },
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
            if (!dbRecipeData) {
                res.status(404).json({ message: "No recipe found with this id" });
                return;
            }

            const recipe = dbRecipeData.get({ plain: true });

            res.render("single-recipe", {
                recipe,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;