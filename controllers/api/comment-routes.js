const router = require('express').Router();
const { Comment, User } = require('../../models');

// GET all comments ".../api/comments"
router.get("/", (req, res) => {
    Comment.findAll({
        attributes: [
            "id",
            "comment_text",
            "user_id",
            "recipe_id"
        ],
        order: [["created_at", "DESC"]],
        include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => res.status(500).json(err));
});

// POST create comment ".../api/comments"
router.post("/", (req, res) => {
    // expects {
    //     comment_text: "Wow!",
    //     recipe_id: 1,
    //     user_id: 1
    // }
    if (req.session) { // only signed in user can comment
        Comment.create({
            comment_text: req.body.comment_text,
            recipe_id: req.body.recipe_id,
            user_id: req.session.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => res.status(500).json(err));
    } 
});

// DELETE a comment ".../api/comments/:id"

module.exports = router;