const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Schedule extends Model { }

Schedule.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },

        sunday: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            references: {
                model: 'recipe',
                key: 'id'
            }
        },

        monday: {
            type: DataTypes.ARRAY
        },

        tuesday: {
            type: DataTypes.ARRAY
        },

        wednesday: {
            type: DataTypes.ARRAY
        },

        thursday: {
            type: DataTypes.ARRAY
        },

        friday: {
            type: DataTypes.ARRAY
        },

        saturday: {
            type: DataTypes.ARRAY
        },

        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "recipe",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "schedule",
        tableName: "schedule"
    }
);

module.exports = Schedule;