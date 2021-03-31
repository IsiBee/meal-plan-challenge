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

// GET one schedule ".../api/schedules/:id"
router.get('/:id', (req, res) => {
    Schedule.findOne({
        where: { id: req.params.id },
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
        .then(dbScheduleData => {
            if (!dbScheduleData) return res.status(404).json({ message:"No schedule found with this id" });
            
            res.json(dbScheduleData);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;