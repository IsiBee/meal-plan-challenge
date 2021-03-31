const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Schedule extends Model {}

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
            type: DataTypes.INTEGER,
            references: {
                model: "recipe",
                key: "id"
            }
        },

        monday: {
            type: DataTypes.INTEGER,
            references: {
                model: "recipe",
                key: "id"
            }
        },

        tuesday: {
            type: DataTypes.INTEGER,
            references: {
                model: "recipe",
                key: "id"
            }
        },

        wednesday: {
            type: DataTypes.INTEGER,
            references: {
                model: "recipe",
                key: "id"
            }
        },

        thursday: {
            type: DataTypes.INTEGER,
            references: {
                model: "recipe",
                key: "id"
            }
        },

        friday: {
            type: DataTypes.INTEGER,
            references: {
                model: "recipe",
                key: "id"
            }
        },

        saturday: {
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