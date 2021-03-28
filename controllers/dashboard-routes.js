const router = require("express").Router();
const { Recipe, User, Comment, Ingredient } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
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
        ]
    })
        .then(dbRecipeData => {
            const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));

            res.render("dashboard", {
                recipes,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => res.status(500).json(err));
});

router.get("/myRecipes", withAuth, (req, res) => {
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

            res.render("myRecipes", { recipes, loggedIn: req.session.loggedIn });
        })
        .catch(err => res.status(500).json(err));
});

router.get("/search/:name", (req, res) => {
    Recipe.findAll({
        where: {
            recipe_name: req.params.name
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
        ]
    })
        .then(dbRecipeData => {
            const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));

            res.render("dashboard", {
                recipes,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;