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

        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "recipe",
                key: "id"
            }
        },

        // is_gluten_free: {
        //     type: DataTypes.BOOLEAN,
        // },

        // is_vegetarian: {
        //     type: DataTypes.BOOLEAN,
        // },

        // is_vegan: {
        //     type: DataTypes.BOOLEAN,
        // },

        // is_keto: {
        //     type: DataTypes.BOOLEAN,
        // },
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