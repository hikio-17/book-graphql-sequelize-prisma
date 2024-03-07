require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql'
  }
)

const User = sequelize.define(
   "User",
   {
      id: {
         type: DataTypes.STRING,
         primaryKey: true,
         allowNull: false,
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false
      },
   },
   {
      tableName: 'users',
      createdAt: false,
      updatedAt: false
   }
)

module.exports = User;
