const Book = require('../model/book')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class BookRepository {
  static async addBook (data) {
    try {
      // with sequelize
      // const insertedBook = await Book.create(data)
      // return insertedBook

      // with prisma
      const insertedBook = await prisma.book.create({
        data
      });

      return insertedBook;
    } catch (error) {
      console.log(error)
    }
  }

  static async getBooks () {
    try {
      // sequelize
      // const books = await Book.findAll()

      // prisma
      const books = await prisma.book.findMany();

      return books
    } catch (error) {
      console.log(error)
    }
  }

  static async getBook (id) {
    try {
      // sequelize
      // const book = await Book.findByPk(id)

      const book = await prisma.book.findFirst({
        where: { id }
      });

      return book
    } catch (error) {
      console.log(error)
    }
  }

  static async updateBook (id, data) {
    try {
      // sequelize
      // await Book.update(
      //   {
      //     title: data.title,
      //     author: data.author,
      //     isRead: data.isRead
      //   },
      //   {
      //     where: { id }
      //   }
      // )

      // prisma
      await prisma.book.update({
        where: { id },
        data: {
          title: data.title,
          author: data.author,
          isRead: data.isRead,
        }
      });

      const updatedBook = await this.getBook(id)
      return updatedBook
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteBook (id) {
    try {
      // sequelize
      // const result = await Book.destroy({ where: { id } })

      // prisma
      const result = await prisma.book.delete({ where: { id } });
      console.log(result);

      if (result !== 0) {
        return true
      }
      return false
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = BookRepository
