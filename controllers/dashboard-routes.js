const router = require("express").Router();
const { Recipe, User, Comment, Ingredient, Schedule } = require("../models");
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
            "user_id"
        ],
    })
        .then(dbRecipeData => {
            const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));
            console.log(recipes)
            res.render("dashboard", {
                recipes,
                loggedIn: req.session.loggedIn,
                user_id: req.session.user_id
            });
        })
        .catch(err => res.status(500).json(err));
});

router.get("/addRecipes", withAuth, (req, res) => {
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

            res.render("addRecipes", { recipes, loggedIn: req.session.loggedIn });
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

module.exports = router;