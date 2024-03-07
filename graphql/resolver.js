const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const BookService = require('../service/service')
const AuthService = require('../service/auth')

module.exports = {
  addBook: ({ bookInput }, req) => {

   if (!req.isAuth) {
      const error = new Error("Not authenticated.");
      error.code = 401;
      throw error;
   }
    const createdBook = {
      ...bookInput,
      id: uuidv4()
    }

    const result = BookService.addBook(createdBook)
    return result
  },

  books: () => BookService.getBooks(),
  book: ({ id }) => BookService.getBook(id),
  updateBook: ({ id, bookInput }) => BookService.updateBook(id, bookInput),
  deleteBook: ({ id }) => BookService.deleteBook(id),

  // users
  signup: async ({ userInput }) => {
    const hashedPassword = await bcrypt.hash(userInput.password, 12)

    const createdUser = {
      id: uuidv4(),
      email: userInput.email,
      password: hashedPassword
    }

    const result = await AuthService.signup(createdUser)

    return result
  },

  login: async ({ userInput }) => {
    const user = {
      email: userInput.email,
      password: userInput.password
    }

    const foundUser = await AuthService.login(user)

    if (foundUser === null) {
      const error = new Error('User data not found.')
      error.code = 404
      throw Error
    }

    const isValidPassword = await bcrypt.compare(
      user.password,
      foundUser.password
    )

    if (!isValidPassword) {
      const error = new Error('Kredential not valid.')
      error.code = 400
      throw Error
    }

    const token = jwt.sign(
      { userId: foundUser.id, email: foundUser.email },
      'secretme',
      { expiresIn: '1h' }
    );

    return { token, userId: foundUser.id }
  }
}
