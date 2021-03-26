// Recipe DB Model

const {Model, DataTypes } = require ('sequelize');

const sequelize = require('../config/connection.js');

class Recipe extends Model {}

Recipe.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoNull: false, 
            primaryKey: true, 
            autoIncrement: true, 
        },
        
        recipe_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        description_id:{
            type: DataTypes.STRING, 
            allowNull: false,
        },

        prep_time:{
            type: DataTypes.INTEGER,
            allowNull: false, 
        },

        cook_time:{
            type: DataTypes.INTEGER, 
            allowNull: false, 
        },

        cooking_instructions:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        ingredient_id:{
            type: DataTypes.INTEGER,
            allowNull: false, 
        },

        is_spicy:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
   
    },
    {
        sequelize,
        timestamps: false, 
        freezeTablename: true,
        underscored: true, 
        modelName: 'Recipe',
    },
)

module.exports = Recipe;