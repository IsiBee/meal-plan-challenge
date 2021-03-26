// USER DB Model

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTablename: true,
<<<<<<< HEAD
        underscored: true,
        modelName: 'user',
=======
        underscored: true, 
        modelName: 'user',
        tableName: 'user'
>>>>>>> cc940df5ee923c337cc41e95e256d39fdb43eb16
    },

)

module.exports = User;

