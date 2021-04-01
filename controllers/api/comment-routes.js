const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

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
router.post("/", withAuth, (req, res) => {
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

            // FOR INSOMNIA CORE TESTING
            // user_id: req.body.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => res.status(500).json(err));
    } 
});

// DELETE a comment ".../api/comments/:id"
router.delete("/:id", withAuth,(req, res) => {
    Comment.destroy({ where: { id: req.params.id }})
        .then(dbCommentData => {
            if (!dbCommentData) return res.status(404).json({ message: "No comment found with this id" });

            res.json(dbCommentData);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;