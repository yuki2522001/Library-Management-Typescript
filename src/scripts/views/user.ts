import { createElement } from "../helpers/dom";
import Toast from "../components/toast";
import UserType from '../interfaces/user';
import { AddUserFunc, DeleteUserFunc, UpdateUserFunc } from "../types/function";

export default class UserView {
  userListElement: HTMLElement;
  taskDeleteModal: HTMLElement;
  taskModalElement: HTMLElement;
  inputFirstName: HTMLInputElement;
  inputLastName: HTMLInputElement;
  inputEmail: HTMLInputElement;
  inputPhone: HTMLInputElement;
  inputAddress: HTMLInputElement;
  btnAddUser: HTMLElement;
  btnUpdate: HTMLElement;
  btnDelete: HTMLElement;
  btnOpen: HTMLElement;
  btnClose: HTMLElement;
  btnCloseDeleteModel: HTMLElement;
  userData: UserType[];

  constructor() {
    // Get value and display content on body
    this.userListElement = document.getElementById("users__body");

    // Get delete task modal
    this.taskDeleteModal = document.getElementById("userDeleteModal");

    // Get input value
    this.inputFirstName = document.getElementById("input-firstName") as HTMLInputElement;
    this.inputLastName = document.getElementById("input-lastName") as HTMLInputElement;
    this.inputEmail = document.getElementById("input-email") as HTMLInputElement;
    this.inputPhone = document.getElementById("input-phone") as HTMLInputElement;
    this.inputAddress = document.getElementById("input-address") as HTMLInputElement;

    // Get button
    this.btnAddUser = document.getElementById("btnAddUser");
    this.btnUpdate = document.getElementById("updateUser");
    this.btnDelete = document.getElementById("btn-deleteUser");
    this.taskModalElement = document.getElementById("taskModal");
    this.btnOpen = document.getElementById("btnOpen");
    this.btnClose = document.getElementById("btnClose");
    this.btnCloseDeleteModel = document.getElementById("closeDeleteModal");
  }

  /**
   * Display validate message if input text value is empty and format
   *
   */
  checkFirstNameIsNotEmpty = (message: string) => {
    const msgFirstNameIsNotEmpty = document.getElementById("msgFirstName");
    msgFirstNameIsNotEmpty.innerHTML = message;
  };

  checkLastNameIsNotEmpty = (message: string) => {
    const msgLastNameIsNotEmpty = document.getElementById("msgLastName");
    msgLastNameIsNotEmpty.innerHTML = message;
  };

  checkFormatEmail = (message: string) => {
    const msgEmailIsNotEmptyAndFormatEmail = document.getElementById("msgEmail");
    msgEmailIsNotEmptyAndFormatEmail.innerHTML = message;
  };

  checkFormatPhone = (message: string) => {
    const msgPhoneIsNotEmptyAndFormatPhone = document.getElementById("msgPhone");
    msgPhoneIsNotEmptyAndFormatPhone.innerHTML = message;
  };

  checkFormatAddress = (message: string) => {
    const msgAddressIsNotEmptyAndFormatAddress = document.getElementById("msgAddress");
    msgAddressIsNotEmptyAndFormatAddress.innerHTML = message;
  };

  // Clear validate message
  clearValidateMsg = () => {
    document.querySelectorAll(".validate-message").forEach((value) => {
    // eslint-disable-next-line no-param-reassign
      value.innerHTML = "";
    });
  };

  // Show success message
  showSuccessMsg = (msg: string) => {
    Toast({
      title: "Success!",
      message: msg,
      type: "success",
    });
  };

  // Show error message
  showErrorMsg = (msg: string) => {
    Toast({
      title: "Error!",
      message: msg,
      type: "error",
    });
  };

  /**
   * Close task detail modal
   */
  closeTaskModal = () => {
    this.taskModalElement.style.display = "none";
  };

  closeTaskDelete = () => {
    this.taskDeleteModal.style.display = "none";
  };

  /**
   * Open task detail modal
  */
  openTaskModal = () => {
    this.taskModalElement.style.display = "block";
  };

  openTaskDelete = () => {
    this.taskDeleteModal.style.display = "block";
  };

  // Reset form
  resetForm = () => {
    this.inputFirstName.value = "";
    this.inputLastName.value = "";
    this.inputEmail.value = "";
    this.inputPhone.value = "";
    this.inputAddress.value = "";
  };

  // eslint-disable-next-line class-methods-use-this
  createUserElement = (user: UserType): HTMLElement => {
    // Create a cell for displaying user firstName
    const firstNameElement = createElement("td", { className: "user__item", id: `user-firstName-${user.id}` }, `${user.firstName}`);
    // Create a cell for displaying lastName
    const lastNameElement = createElement("td", { className: "user__item", id: `user-lastName-${user.id}` }, `${user.lastName}`);
    // Create a cell for displaying email
    const emailElement = createElement("td", { className: "user__item", id: `user-email-${user.id}` }, `${user.email}`);
    // Create a cell for displaying available quantity
    const phoneElement = createElement("td", { className: "user__item", id: `user-phone-${user.id}` }, `${user.phone}`);
    // Create a cell for displaying total quantity
    const addressElement = createElement("td", { className: "user__item", id: `user-address-${user.id}` }, `${user.address}`);
    // Create a button for display update users
    const iconUpdate = createElement("i", { className: "btn__update fa fa-pen" }, "");
    const btnUpdate = createElement("button", { className: "btn__update" }, [iconUpdate]);
    iconUpdate.dataset.id = user.id;
    // Create a button for display delete users
    const iconDelete = createElement("i", { className: "btn__del fa fa-trash" }, "");
    const btnDel = createElement("button", { className: "btn__del" }, [iconDelete]);
    iconDelete.dataset.id = user.id;
    // Display two button on the cell
    const userControl = createElement("td", { className: "user__item" }, [btnUpdate, btnDel]);
    // Create a row for displaying user item info
    const userRow = createElement("tr", { className: "user__list", id: `${user.id}` }, [firstNameElement, lastNameElement, emailElement, phoneElement, addressElement, userControl]);
    return userRow;
  };

  // Render user list
  renderUser(users: UserType[]) {
    this.userData = users;
    users.forEach((user) => {
      const userRow = this.createUserElement(user);
      this.userListElement.append(userRow);
    });
  };

   // Open task when click
   bindOpenTask() {
    this.btnOpen.addEventListener("click", () => {
      this.openTaskModal();
      this.btnAddUser.style.display = "block";
      this.btnUpdate.style.display = "none";
    });
  }

  // Close task when click
  bindCloseTask() {
    this.btnClose.addEventListener("click", () => {
      this.closeTaskModal();
      this.clearValidateMsg();
      this.resetForm();
    });
  }

  // Close delete modal
  bindCloseDeleteModal() {
    this.btnCloseDeleteModel.addEventListener("click", () => {
      this.closeTaskDelete();
    });
  }

  /**
   * Get the input data and pass it to callback handler in controller
   *
   * @param {callback} handler
   */
  bindAddUserElement(handler: AddUserFunc) {
    this.btnAddUser.addEventListener("click", (event) => {
      event.preventDefault();
      this.clearValidateMsg();
      const newUser: UserType = {
        firstName: this.inputFirstName.value.trim(),
        lastName: this.inputLastName.value.trim(),
        email: this.inputEmail.value.trim(),
        phone: this.inputPhone.value.trim(),
        address: this.inputAddress.value.trim()
      }
      handler( newUser );
    });
  }

  appendUser(newUser: UserType) {
    // Create a task row for displaying data of new task
    const newUserElement = this.createUserElement(newUser);
    this.userListElement.append(newUserElement);
    this.resetForm();
    this.closeTaskModal();
  }

  bindConfirmDeleteUser() {
    // Add event click from userListElement
    this.userListElement.addEventListener("click", (event: Event) => {
      // Find the element whose className is btn__del
      const target = event.target as Element;
      if (target.className === "btn__del fa fa-trash") {
        const { id } = (target as HTMLElement).dataset;
        this.openTaskDelete();
        const modalDelete = document.getElementById("userDeleteModal");
        modalDelete.dataset.id = id;
      }
    });
  }

  bindDeleteUserElement(handle: DeleteUserFunc) {
    this.btnDelete.addEventListener("click", (event) => {
      event.preventDefault();
      const modalDeleteUser = document.getElementById("userDeleteModal");
      const { id } = modalDeleteUser.dataset;
      handle(id);
    });
  }

  deleteUserElement(id: string) {
    const userElement = document.getElementById(id);
    userElement.remove();
    this.closeTaskDelete();
  }

  /**
 * Find the element by id and then display the value on modal
 */
  bindDisplayUserOnModal() {
    this.userListElement.addEventListener("click", (event: Event) => {
      const target = event.target as Element;
      if (target.className === "btn__update fa fa-pen") {
        const { id } = (target as HTMLInputElement).dataset;
        const currentUser = this.userData.find((item) => item.id === id);
        if (currentUser) {
          this.openTaskModal();
          this.btnAddUser.style.display = "none";
          this.btnUpdate.style.display = "block";

          (<HTMLInputElement>document.getElementById("input-firstName")).value = currentUser.firstName;
          (<HTMLInputElement>document.getElementById("input-lastName")).value = currentUser.lastName;
          (<HTMLInputElement>document.getElementById("input-email")).value = currentUser.email;
          (<HTMLInputElement>document.getElementById("input-phone")).value = currentUser.phone;
          (<HTMLInputElement>document.getElementById("input-address")).value = currentUser.address;

          const modal = document.getElementById("taskModal");
          modal.dataset.id = id;
        }
      }
    });
  }

  bindUpdateUser(handle: UpdateUserFunc) {
    this.btnUpdate.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = document.getElementById("taskModal");
      const { id } = modal.dataset;
      const updateUser: UserType = {
        firstName: this.inputFirstName.value.trim(),
        lastName: this.inputLastName.value.trim(),
        email: this.inputEmail.value.trim(),
        phone: this.inputPhone.value.trim(),
        address: this.inputAddress.value.trim(),
      }
      handle( id, updateUser );
    });
  }

  updateUserElement(user: UserType) {
    const userFirstNameElement = document.getElementById(`user-firstName-${user.id}`);
    userFirstNameElement.innerHTML = `${user.firstName}`;
    const userLastNameElement = document.getElementById(`user-lastName-${user.id}`);
    userLastNameElement.innerHTML = `${user.lastName}`;
    const userEmailElement = document.getElementById(`user-email-${user.id}`);
    userEmailElement.innerHTML = `${user.email}`;
    const userPhoneElement = document.getElementById(`user-phone-${user.id}`);
    userPhoneElement.innerHTML = `${user.phone}`;
    const userAddressElement = document.getElementById(`user-address-${user.id}`);
    userAddressElement.innerHTML = `${user.address}`;
    this.resetForm();
    this.closeTaskModal();
  }
}
