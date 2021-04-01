// Recipe DB Model

const {Model, DataTypes } = require ('sequelize');

const sequelize = require('../config/connection.js');

class Recipe extends Model {
    static saveRecipe(body, models) {
        return models.Favorite.create({
            user_id: body.user_id,
            recipe_id: body.recipe_id
        })
            .then(() => {
                return Recipe.findOne({
                    where: { id: body.recipe_id },
                    attributes: [
                        "id",
                        "recipe_name",
                        "description",
                        "servings",
                        "prep_time",
                        "cook_time",
                        "cooking_instructions",
                        "is_spicy",
                        "user_id"
                    ],
                    include: [
                        {
                            model: models.Ingredient,
                            attributes: ["id", "ingredient_name", "preparation", "recipe_id"]
                        },
                        {
                            model: models.Comment,
                            attributes: ["id", "comment_text", "recipe_id", "user_id", "created_at"],
                            include: {
                                model: models.User,
                                attributes: ["username"]
                            }
                        }
                    ]
                });
            });
    }
}

Recipe.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true, 
        },

        special_id: {
            type: DataTypes.STRING,
            allowNull: false
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