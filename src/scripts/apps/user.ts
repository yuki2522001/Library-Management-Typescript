import UserView from "../views/user";
import UserModel from "../models/user";
import UserController from "../controllers/user";

const UserApp = new UserController(new UserModel(), new UserView());
UserApp.callViewUserHandle();
