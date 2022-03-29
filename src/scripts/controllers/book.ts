import BookView from '../views/book';
import BookModel from '../models/book';
import BookType from '../interfaces/book';
import { VALIDATE_MSG, SUCCESS_MSG } from "../constants/message";
import {
  isRequired, isFormatNumber, isCompareNumber,
} from "../helpers/validation";

 
export default class BookController {
  bookView: BookView;
  bookModel: BookModel;
  constructor(bookView : BookView, bookModel: BookModel) {
    this.bookView  = bookView;
    this.bookModel = bookModel;
  };

  callViewBookHandle() {
    this.getBooks();
    this.bookView.bindOpenTask();
    this.bookView.bindCloseTask();
    this.bookView.bindCloseDeleteModal();
    this.bookView.bindConfirmDeleteBook();
    this.bookView.bindDisplayBookOnModal();
    this.bookView.bindAddBookElement(this.handlerAddBook);
    this.bookView.bindUpdateBook(this.handlerUpdateBook);
    this.bookView.bindDeleteBookElement(this.handlerDeleteBook);
  }

  // Display data on dom
  getBooks = async () => {
    const bookData = await this.bookModel.getBooks();
    // Render book list
    this.bookView.renderBook(bookData);
  };

   // Handle add book in both view and model
   handlerAddBook = async ( dataBook: BookType ) => {
    //Display validate message if input text value is empty
    if (!isRequired(dataBook.title)) {
      this.bookView.checkBookTitleIsNotEmpty(VALIDATE_MSG.REQUIRED);
      return;
    }

    if (!isRequired(dataBook.author)) {
      this.bookView.checkAuthorIsNotEmpty(VALIDATE_MSG.REQUIRED);
      return;
    }

    // Display validate message if price is empty
    if (!isRequired(dataBook.price.toString())) {
      this.bookView.checkFormatPrice(VALIDATE_MSG.REQUIRED);
      return;
    }

    //Display validate message if price is negative
    if (!isFormatNumber(dataBook.price)) {
      this.bookView.checkFormatPrice(VALIDATE_MSG.MESSAGE_NUMBER_FORMAT);
      return;
    }

    // Display validate message if total quantity is empty
    if (!isRequired(dataBook.totalQty.toString())) {
      this.bookView.checkFormatTotalQty(VALIDATE_MSG.REQUIRED);
      return;
    }

    // Display validate message if total quantity is negative
    if (!isFormatNumber(dataBook.totalQty)) {
      this.bookView.checkFormatTotalQty(VALIDATE_MSG.MESSAGE_NUMBER_FORMAT);
      return;
    }

    // Display validate message if available quantity is empty
    if (!isRequired(dataBook.availableQty.toString())) {
      this.bookView.checkFormatAvailableQty(VALIDATE_MSG.REQUIRED);
      return;
    }

    // Display validate message if available quantity is greater than total quantity
    if (!isCompareNumber(dataBook.totalQty, dataBook.availableQty)) {
      this.bookView.checkFormatAvailableQty(VALIDATE_MSG.MESSAGE_COMPARE_NUMBER);
      return;
    }

    try {
      const newBook = await this.bookModel.addBook(dataBook);
      this.bookView.appendBook(newBook);
      this.bookView.showSuccessMsg(SUCCESS_MSG.MESSAGE_ADD_BOOK);
    } catch (err) {
      this.bookView.showErrorMsg(err);
    }
  };

   // Handle delete book in both view and model
   handlerDeleteBook = (id: string) => {
    try {
      this.bookModel.deleteBook(id);
      this.bookView.deleteBookElement(id);
      this.bookView.showSuccessMsg(SUCCESS_MSG.MESSAGE_DELETE_BOOK);
    } catch (error) {
      this.bookView.showErrorMsg(error);
    }
  };

  // Handle update book in both view and model
  handlerUpdateBook = async (id: string, dataBooks: BookType) => {
    try {
      const book = await
      this.bookModel.updateBook(id, dataBooks);
      this.bookView.updateBookElement(book);
      this.bookView.showSuccessMsg(SUCCESS_MSG.MESSAGE_UPDATE_BOOK);
    } catch (error) {
      this.bookView.showErrorMsg(error);
    }
  };
}