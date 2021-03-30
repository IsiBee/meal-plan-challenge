const router = require('express').Router();
const { User, MealPlan, Recipe, Comment } = require('../../models');

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
                    "user_id"
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
                    model: Recipe,
                    attributes: ["recipe_name"]
                }
            },
            {
                model: Recipe,
                attributes: ["recipe_name"],
                through: MealPlan,
                as: "saved_recipes"
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) return res.status(404).json({ message: "No user found with this id" });

            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
});

// POST create new user ".../api/users"
router.post("/", (req, res) => {
    // expects {
    //     username: "DustyBunsen",
    //     email: "dustyb@fakemail.com",
    //     password: "EatMyDust!"
    // }
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                
                res.json(dbUserData);
            });
        })
        .catch(err => res.status(500).json(err));
});

// LOGIN route
router.post("/login", (req, res) => {
    // expects {
    //     email: "dustyb@fakemail.com",
    //     password: "EatMyDust!"
    // }
    User.findOne({
        where: { email: req.body.email }
    })
        .then(dbUserData => {
            if (!dbUserData) return res.status(404).json({ message: "No user found with this email!" });

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ 
                    user: dbUserData,
                    message: "You are now logged in!"
                });
            });
        });
});

// LOGOUT route
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// PUT update a user ".../api/users/:id"
router.put("/:id", (req, res) => {
    // expects {
    //     username: "DustyBunsen",
    //     email: "dustyb@fakemail.com",
    //     password: "EatMyDust!"
    // }
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    })
        .then(dbUserData => {
            if (!dbUserData) return res.status(404).json({ message: "No user found with this id" });

            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
});

// DELETE a user ".../api/users/:id"
router.delete("/:id", (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    })
        .then(dbUserData => {
            if (!dbUserData) return res.status(404).json({ message: "No user found with this id" });

            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;