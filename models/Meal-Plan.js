
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class MealPlan extends Model {}

MealPlan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "recipe",
                key: "id"
            }
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTablename: true,
        underscored: true,
        modelName: 'meal_plan',
        tableName: 'meal_plan'
    }
);

module.exports = MealPlan;