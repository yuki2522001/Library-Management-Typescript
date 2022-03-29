import { VALIDATE_MSG, SUCCESS_MSG } from "../constants/message";
import {
  isRequired, isFormatEmail, isFormatPhone, isFormatAddress,
} from "../helpers/validation";

import UserModel from '../models/user';
import UserView from '../views/user';
import UserType from '../interfaces/user';

export default class UserController {
  userModel: UserModel;
  userView: UserView;

  constructor(userModel: UserModel, userView: UserView ) {
    this.userModel = userModel;
    this.userView = userView;
  }

  // Call handler from hire request view
  callViewUserHandle() {
    this.getUsers();
    this.userView.bindOpenTask();
    this.userView.bindCloseTask();
    this.userView.bindCloseDeleteModal();
    this.userView.bindConfirmDeleteUser();
    this.userView.bindDisplayUserOnModal();
    this.userView.bindAddUserElement(this.handlerAddUser);
    this.userView.bindDeleteUserElement(this.handlerDeleteUser);
    this.userView.bindUpdateUser(this.handlerUpdateUser);
  }

  // Display data on dom
  getUsers = async () => {
    const userData = await this.userModel.getUsers();
    // Render user list
    this.userView.renderUser(userData);
  };

  // Handle add user in both view and model
  handlerAddUser = async (dataUsers: UserType) => {
    // Display validate message if input text value is empty
    if (!isRequired(dataUsers.firstName)) {
      this.userView.checkFirstNameIsNotEmpty(VALIDATE_MSG.REQUIRED);
      return;
    }

    if (!isRequired(dataUsers.lastName)) {
      this.userView.checkLastNameIsNotEmpty(VALIDATE_MSG.REQUIRED);
      return;
    }

    // Display validate message if input email value is empty
    if (!isRequired(dataUsers.email)) {
      this.userView.checkFormatEmail(VALIDATE_MSG.REQUIRED);
      return;
    }

    // Display validate message if email is malformed
    if (!isFormatEmail(dataUsers.email)) {
      this.userView.checkFormatEmail(VALIDATE_MSG.MESSAGE_EMAIL_FORMAT);
      return;
    }

    // Display validate message if input phone value is empty
    if (!isRequired(dataUsers.phone)) {
      this.userView.checkFormatPhone(VALIDATE_MSG.REQUIRED);
      return;
    }

    // Display validate message if phone is malformed
    if (!isFormatPhone(dataUsers.phone)) {
      this.userView.checkFormatPhone(VALIDATE_MSG.MESSAGE_PHONE_FORMAT);
      return;
    }

    // Display validate message if input address value is empty
    if (!isRequired(dataUsers.address)) {
      this.userView.checkFormatAddress(VALIDATE_MSG.REQUIRED);
      return;
    }

    // Display validate message if address is malformed
    if (!isFormatAddress(dataUsers.address)) {
      this.userView.checkFormatAddress(VALIDATE_MSG.MESSAGE_ADDRESS_FORMAT);
      return;
    }

    try {
      const newUser = await this.userModel.addUser(dataUsers);
      this.userView.appendUser(newUser);
      this.userView.showSuccessMsg(SUCCESS_MSG.MESSAGE_ADD_USER);
    } catch (err) {
      this.userView.showErrorMsg(err);
    }
  };

    // Handle delete user in both view and model
    handlerDeleteUser = async (id: string) => {
      try {
        this.userModel.deleteUser(id);
        this.userView.deleteUserElement(id);
        this.userView.showSuccessMsg(SUCCESS_MSG.MESSAGE_DELETE_USER);
      } catch (error) {
        this.userView.showErrorMsg(error);
      }
    };

  // Handle update user in both view and model
  handlerUpdateUser = async (id: string, dataUsers: UserType) => {
    try {
      const user = await this.userModel.updateUser(id, dataUsers);
      this.userView.updateUserElement(user);
      this.userView.showSuccessMsg(SUCCESS_MSG.MESSAGE_UPDATE_USER);
    } catch (error) {
      this.userView.showErrorMsg(error);
    }
  };
}
