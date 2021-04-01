// Ingredient DB Model

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Ingredient extends Model { }

Ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        ingredient_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        quantity: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        preparation: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        special_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },

    {
        sequelize,
        timestamps: false,
        freezeTablename: true,
        underscored: true,
        modelName: 'ingredient',
        tableName: 'ingredient'
    },

);

module.exports = Ingredient;