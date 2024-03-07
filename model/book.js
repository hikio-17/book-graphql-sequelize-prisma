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

const Book = sequelize.define(
   "Book",
   {
      id: {
         type: DataTypes.STRING,
         primaryKey: true,
         allowNull: false
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      author: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      isRead: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      }
   },
   {
      tableName: 'books',
      createdAt: false,
      updatedAt: false
   }
);

module.exports = Book;
