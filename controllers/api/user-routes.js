const router = require('express').Router();
const { User } = require('../../models');

// GET all users ".../api/users"
router.get("/", (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(500).json(err));
});

module.exports = router;