// Ingredient DB Model

const {Model, DataTypes } = require ('sequelize');

const sequelize = require('../config/connection.js');

class Ingredient extends Model {}

Ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        // IsGlutenFree: {
        //     type
        // }
    },
    {
        sequelize,
        timestamps: false, 
        freezeTablename: true,
        underscored: true, 
        modelName: 'Ingredient',
    },
)
