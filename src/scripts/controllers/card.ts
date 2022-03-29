import BookModel from "../models/book";
import UserModel from "../models/user";
import HireRequestModel from '../models/hireRequest';
import CardView from "../views/card";

export default class CardController {
  cardView: CardView
  bookModel: BookModel;
  userModel: UserModel;
  hireRequestModel: HireRequestModel;
  constructor(cardView: CardView, bookModel: BookModel, userModel: UserModel, hireRequestModel: HireRequestModel) {
    this.cardView = cardView;
    this.bookModel = bookModel;
    this.userModel = userModel;
    this.hireRequestModel = hireRequestModel;
  }

  // Call handler from hire request view
  callViewHandler() {
    this.displayOnView();
  }

  displayOnView = async () => {
    // Get the book and handle data displayed on the view
    const books = await this.bookModel.getBooks();
    this.cardView.displayBooks(books);

    // Get the user and handle data displayed on the view
    const users = await this.userModel.getUsers();
    this.cardView.displayUsers(users);

    // Get the completed hire request and handle data displayed on the view
    const count = await this.hireRequestModel.displayDataCompletes();
    this.cardView.displayDataCompletes(count);
  };
}