const router = require('express').Router();
const { Recipe, User, Schedule } = require('../../models');

const chalk = require('chalk');

// GET all schedules ".../api/schedules"
router.get('/', (req, res) => {
    Schedule.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
        .then(dbScheduleData => res.json(dbScheduleData))
        .catch(err => res.status(500).json(err));
});

// GET one schedule ".../api/schedules/:id"
router.get('/:id', (req, res) => {
    Schedule.findOne({
        where: { user_id: req.params.id },
        include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbScheduleData => {
            if (!dbScheduleData) return res.status(404).json({ message: "No schedule found with this id" });

            res.json(dbScheduleData);
        })
        .catch(err => res.status(500).json(err));
});

// POST create a schedule ".../api/schedules"
router.post("/", (req, res) => {
    // expects {
    //     user_id: 1,
    //     sunday: 3,
    //     monday: null,
    //     tuesday: null,
    //     wednesday: 2,
    //     thursday: null,
    //     friday: 4,
    //     saturday: null
    // }

    Schedule.create({
        user_id: req.session.user_id,

        sunday: req.body.sunday,
        monday: req.body.monday,
        tuesday: req.body.tuesday,
        wednesday: req.body.wednesday,
        thursday: req.body.thursday,
        friday: req.body.friday,
        saturday: req.body.saturday
    })
        .then(dbScheduleData => res.json(dbScheduleData))
        .catch(err => res.status(500).json(err));
})

// PUT update schedule ".../api/schedules/:id"
router.put("/:id", (req, res) => {
    Schedule.update(req.body,
        {
            individualHooks: true,
            where: { id: req.params.id }
        }
    )
        .then(dbScheduleData => {
            if (!dbScheduleData) return res.status(404).json({ message: "No schedule found with this id" });

            res.json(dbScheduleData);
        })
        .catch(err => res.status(500).json(err));
});

// DELETE a schedule ".../api/schedules/:id"
router.delete("/:id", (req, res) => {
    Schedule.destroy({
        where: { id: req.params.id }
    })
        .then(dbScheduleData => {
            if (!dbScheduleData) return res.status(404).json({ message: "No schedule found with this id" });

            res.json(dbScheduleData);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;