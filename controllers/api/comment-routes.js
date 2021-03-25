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

// DELETE a comment ".../api/comments/:id"

module.exports = router;