// comment seeds

const { Comment } = require("../models");

const commentData = [
    {
        comment_text: "Wow!",
        recipe_id: 3,
        user_id: 1
    },
    {
        comment_text: "I'm not sure how I feel about this...",
        recipe_id: 2,
        user_id: 3
    },
    {
        comment_text: "Amazing!",
        recipe_id: 1,
        user_id: 2
    },
    {
        comment_text: ":)",
        recipe_id: 2,
        user_id: 1
    },
    {
        comment_text: "Great job!",
        recipe_id: 1,
        user_id: 3
    },
    {
        comment_text: "Let me know what you think!",
        recipe_id: 1,
        user_id: 1
    },
    {
        comment_text: "Feel free to contact me directly",
        recipe_id: 2,
        user_id: 2
    },
    {
        comment_text: "Look what I did!",
        recipe_id: 3,
        user_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;