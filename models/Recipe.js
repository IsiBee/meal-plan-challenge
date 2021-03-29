// Recipe DB Model

const {Model, DataTypes } = require ('sequelize');

const sequelize = require('../config/connection.js');

class Recipe extends Model {}

Recipe.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true, 
        },
        
        recipe_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        description:{
            type: DataTypes.STRING, 
            allowNull: false,
        },

        servings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        prep_time:{
            type: DataTypes.STRING,
            allowNull: false, 
        },

        cook_time:{
            type: DataTypes.STRING, 
            allowNull: false, 
        },

        cooking_instructions:{
            type: DataTypes.TEXT,
            allowNull: false,
        },

        is_spicy:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
   
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },
    },
    {
        sequelize,
        freezeTablename: true,
        underscored: true, 
        modelName: 'recipe',
        tableName: 'recipe'
    },
)

module.exports = Recipe;