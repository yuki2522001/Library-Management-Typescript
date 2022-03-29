import { v4 as uuid4 } from "uuid";
import { urlBook } from "../constants/apis";
import { get, post, update, remove } from "../helpers/fetchApi";
import BookType from '../interfaces/book';

export default class BookModel {
  response: BookType[];
  
  async getBooks(): Promise<BookType[]> {
    this.response = await get<BookType[]>(urlBook);
    return this.response;
  };

  // Add new book
  async addBook(dataBook: BookType): Promise<BookType> {
    // Use uuid to render unique id
    const bookId: string = uuid4();
    const newBook: BookType = {
      id: bookId,
      title: dataBook.title,
      author: dataBook.author,
      price: dataBook.price,
      totalQty: dataBook.totalQty,
      availableQty: dataBook.availableQty,
    };

    const book = await post(urlBook, newBook);
    this.response.push(book);
    return book;
  }

  // Delete book
  deleteBook(id: string): Promise<BookType> {
    const url = `${urlBook}/${id}`;
    return remove(url);
  }

  // Update book
  async updateBook(id: string, dataBooks: BookType): Promise<BookType> {
    const updateBook = {
      id: dataBooks.id,
      title: dataBooks.title,
      author: dataBooks.author,
      price: dataBooks.price,
      totalQty: dataBooks.totalQty,
      availableQty: dataBooks.availableQty,
    };

    return update(`${urlBook}/${id}`, updateBook);
  }

  // Update available quantity after borrowing books
  async updateBookQuantity(id: string): Promise<BookType> {
    const book = await get(`${urlBook}/${id}`) as BookType;
    book.availableQty -= 1;
    return update(`${urlBook}/${id}`, book);
  }

   // Update available quantity after complete hire request books
   async updateCompleteBorrowBooks(id: string): Promise<BookType> {
    const book = await get(`${urlBook}/${id}`) as BookType;
    book.availableQty += 1;
    return update(`${urlBook}/${id}`, book);
  }

}