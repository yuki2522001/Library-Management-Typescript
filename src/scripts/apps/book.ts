import BookController from "../controllers/book";
import BookModel from "../models/book";
import BookView from "../views/book";

const BookApp = new BookController(new BookView(), new BookModel());
BookApp.callViewBookHandle();
