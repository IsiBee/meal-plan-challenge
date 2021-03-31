const router = require('express').Router();
const { Recipe, User, Comment, Ingredient, Favorite } = require('../../models');

const chalk = require('chalk');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const log = console.log;

// GET all recipes ".../api/recipes"
router.get("/", (req, res) => {
    Recipe.findAll({
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
        .then(dbRecipeData => res.json(dbRecipeData))
        .catch(err => res.status(500).json(err));
});

// Request to query recipes database for a recipe
router.get("/search/:name", (req, res) => {
    Recipe.findAll({
        where: {
            recipe_name: { [Op.like]: `%${req.params.name}%` }
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
            if (!dbRecipeData) return res.status(404).json({ message: "No recipe found with this name" });

            res.json(dbRecipeData);
        })
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
            if (!dbRecipeData) return res.status(404).json({ message: "No recipe found with this id" });

            console.log(chalk.blueBright(JSON.stringify(dbRecipeData)));
            res.json(dbRecipeData);
        })
        .catch(err => res.status(500).json(err));
});


// POST create new recipe ".../api/recipes"
router.post("/", (req, res) => {
    // expects {
    //     recipe_name: "Mac & Cheese",
    //     description: "the easiest pasta",
    //     servings: 2,
    //     prep_time: "3 minutes",
    //     cook_time: "20 - 30 minutes",
    //     cooking_instructions: "follow box instructions",
    //     is_spicy: false,
    //     user_id: 1
    // }

    Recipe.create({
        recipe_name: req.body.recipe_name,
        description: req.body.description,
        servings: req.body.servings,
        prep_time: req.body.prep_time,
        cook_time: req.body.cook_time,
        cooking_instructions: req.body.cooking_instructions,
        is_spicy: req.body.is_spicy,

        // get user_id from session
        user_id: req.session.user_id

        // FOR INSOMNIA CORE TESTING
        // user_id: req.body.user_id
    })
        .then(dbRecipeData => res.json(dbRecipeData))
        .catch(err => res.status(500).json(err));
});


// FAVORITE route
router.put("/saverecipe", (req, res) => {
    if (req.session) {
        Recipe.saveRecipe(
            {
                ...req.body,
                user_id: req.session.user_id
            },
            { Favorite, Ingredient, User, Comment }
        )
            .then(updatedRecipeData => res.json(updatedRecipeData))
            .catch(err => res.status(500).json(err));
    }
});

// PUT update recipe ".../api/recipes/:id"
router.put('/:id', (req, res) => {
    Recipe.update(
        {
            recipe_name: req.body.recipe_name,
            description: req.body.description,
            servings: req.body.servings,
            prep_time: req.body.prep_time,
            cook_time: req.body.cook_time,
            cooking_instructions: req.body.cooking_instructions,
            is_spicy: req.body.is_spicy,
            user_id: req.session.user_id

            // FOR INSOMNIA CORE TESTING
            // user_id: req.body.user_id
        },
        {
            individualHooks: true,
            where: { id: req.params.id }
        }
    )
        .then(dbRecipeData => {
            log(chalk.red(dbRecipeData));

            if (!dbRecipeData) {
                res.status(404).json({ message: "No recipe found with this id" });
                return
            }

            res.json(dbRecipeData);
        })
        .catch(err => res.status(500).json(err));
});
// ^^^ REQUIRES ATTENTION ^^^^^^

// DELETE a recipe ".../api/recipes/:id"
router.delete("/:id", (req, res) => {
    Recipe.destroy({
        where: { id: req.params.id }
    })
        .then(dbRecipeData => {
            if (!dbRecipeData) return res.status(404).json({ message: "No recipe found with this id" });

            res.json(dbRecipeData);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;