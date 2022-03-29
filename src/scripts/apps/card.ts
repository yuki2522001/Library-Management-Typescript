import CardController from "../controllers/card";
import BookModel from "../models/book";
import HireRequestModel from "../models/hireRequest";
import UserModel from "../models/user";
import CardView from "../views/card";

const CardApp = new CardController(
  new CardView(),
  new BookModel(),
  new UserModel(),
  new HireRequestModel(),
);

CardApp.callViewHandler();
