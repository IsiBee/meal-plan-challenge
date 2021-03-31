const { Schedule } = require("../models");

const scheduleData = [
    {
        user_id: 1,
        sunday: [1],
        monday: [3, 2],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        recipe_id: [1, 2, 3],
    }
];

const seedSchedules = () => Schedule.bulkCreate(scheduleData);

module.exports = seedSchedules;