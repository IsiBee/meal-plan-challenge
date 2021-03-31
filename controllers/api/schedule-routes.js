const router = require('express').Router();
const { Recipe, User, Schedule } = require('../../models');

const chalk = require('chalk');

// GET all schedules ".../api/schedules"
router.get('/', (req, res) => {
    Schedule.findAll({
        include: [
            {
                model: User,
                attributes: ["username"]
            },
            {
                model: Recipe,
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
                ]
            }
        ]
    })
        .then(dbScheduleData => res.json(dbScheduleData))
        .catch(err => res.status(500).json(err));
});

module.exports = router;