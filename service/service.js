const BookRepository = require('../repository/repository')

class BookService {
   static addBook(data) {
      return BookRepository.addBook(data);
   }

   static getBooks() {
      return BookRepository.getBooks();
   }

   static getBook(id) {
      return BookRepository.getBook(id);
   }

   static updateBook(id, data) {
      return BookRepository.updateBook(id, data);
   }

   static deleteBook(id) {
      return BookRepository.deleteBook(id);
   }
}

module.exports = BookService;