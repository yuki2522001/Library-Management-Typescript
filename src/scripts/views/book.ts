import { createElement } from "../helpers/dom";
import Toast from "../components/toast";
import BookType from '../interfaces/book';
import { AddBookFunc, DeleteBookFunc, UpdateBookFunc } from "../types/function";

export default class BookView {
  taskModalElement: HTMLElement;
  taskDeleteModal: HTMLElement;
  bookListElement: HTMLElement;
  inputTile: HTMLInputElement;
  inputAuthor: HTMLInputElement;
  inputPrice: HTMLInputElement;
  inputAvailableQty: HTMLInputElement;
  inputTotalQty: HTMLInputElement;
  btnAdd: HTMLElement;
  btnUpdate: HTMLElement;
  btnDelete: HTMLElement;
  btnSearch: HTMLElement;
  btnOpen: HTMLElement;
  btnClose: HTMLElement;
  btnCloseDeleteModel: HTMLElement;
  bookData: BookType[];

  constructor() {
    // Get task modal element
    this.taskModalElement = document.getElementById("taskModal");
    this.taskDeleteModal = document.getElementById("bookDeleteModal");

    // Get value and display content on body
    this.bookListElement = document.getElementById("books__body");

    // Get input value
    this.inputTile = document.getElementById("input__title") as HTMLInputElement;
    this.inputAuthor = document.getElementById("input__author") as HTMLInputElement;
    this.inputPrice = document.getElementById("input__price") as HTMLInputElement;
    this.inputAvailableQty = document.getElementById("input__availableQty") as HTMLInputElement;
    this.inputTotalQty = document.getElementById("input__totalQty") as HTMLInputElement;

    // Get button
    this.btnAdd = document.getElementById("addBook");
    this.btnUpdate = document.getElementById("updateBook");
    this.btnDelete = document.getElementById("btn__delete");
    this.btnSearch = document.getElementById("btn__search");
    this.btnOpen = document.getElementById("btnOpen");
    this.btnClose = document.getElementById("btnClose");
    this.btnCloseDeleteModel = document.getElementById("closeDeleteModal");
  }

  /**
 * Display validate message if input text value is empty
 *
 */
  checkBookTitleIsNotEmpty = (message: string) => {
    const msgBookTitleIsNotEmpty = document.getElementById("msgTitle");
    msgBookTitleIsNotEmpty.innerHTML = message;
  };

  checkAuthorIsNotEmpty = (message: string) => {
    const msgAuthorIsNotEmpty = document.getElementById("msgAuthor");
    msgAuthorIsNotEmpty.innerHTML = message;
  };

  checkFormatPrice = (message: string) => {
    const msgPriceIsNotEmptyAndNegative = document.getElementById("msgPrice");
    msgPriceIsNotEmptyAndNegative.innerHTML = message;
  };

  checkFormatTotalQty = (message: string) => {
    const msgTotalIsNotEmptyAndNegative = document.getElementById("msgTotal");
    msgTotalIsNotEmptyAndNegative.innerHTML = message;
  };

  checkFormatAvailableQty = (message: string) => {
    const msgAvailableIsNotEmptyAndNegative = document.getElementById("msgAvailable");
    msgAvailableIsNotEmptyAndNegative.innerHTML = message;
  };

  // Clear message
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
    // closeModel("#taskModalCenter");
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
    this.inputTile.value = "";
    this.inputAuthor.value = "";
    this.inputPrice.value = "";
    this.inputTotalQty.value = "";
    this.inputAvailableQty.value = "";
  };

  createBookElement = (book: BookType): HTMLElement => {
    // Create a cell for displaying book title
    const titleElement = createElement("td", { className: "book__item", id: `book-title-${book.id}` }, `${book.title}`);
    // Create a cell for displaying author
    const authorElement = createElement("td", { className: "book__item", id: `book-author-${book.id}` }, `${book.author}`);
    // Create a cell for displaying price
    const priceElement = createElement("td", { className: "book__item", id: `book-price-${book.id}` }, `${book.price}`);
    // Create a cell for displaying total quantity
    const totalQtyElement = createElement("td", { className: "book__item", id: `book-totalQty-${book.id}` }, `${book.totalQty}`);
    // Create a cell for displaying available quantity
    const availableQtyElement = createElement("td", { className: "book__item", id: `book-available-${book.id}` }, `${book.availableQty}`);
    // Create a button for display update books
    const iconUpdate = createElement("i", { className: "btn__update fa fa-pen" }, "");
    const btnUpdate = createElement("button", { className: "btn__update" }, [iconUpdate]);
    iconUpdate.dataset.id = book.id;
    // Create a button for display delete books
    const iconDelete = createElement("i", { className: "btn__del fa fa-trash" }, "");
    const btnDel = createElement("button", { className: "btn__del" }, [iconDelete]);
    iconDelete.dataset.id = book.id;
    // Display two button on the cell
    const bookControl = createElement("td", { className: "book__item" }, [btnUpdate, btnDel]);
    // Create a row for displaying book item info
    const bookRow = createElement("tr", { className: "book__list", id: `${book.id}` }, [titleElement, authorElement, priceElement, totalQtyElement, availableQtyElement, bookControl]);

    return bookRow;

  };

  // Render book list
  renderBook = (books: BookType[]) => {
    this.bookData = books;
    // Create a task node for each task in book list
    books.forEach((book) => {
      const bookRow = this.createBookElement(book);
      // Append task row to the table
      this.bookListElement.append(bookRow);
    });
  }

  // Open task when click
  bindOpenTask() {
    this.btnOpen.addEventListener("click", () => {
      this.openTaskModal();
      this.btnAdd.style.display = "block";
      this.btnUpdate.style.display = "none";
    });
  }

  // Close task when click
  bindCloseTask() {
    this.btnClose.addEventListener("click", () => {
      this.resetForm();
      this.clearValidateMsg();
      this.closeTaskModal();
    });
  }

  // Close task delete model when click
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
   bindAddBookElement(handler: AddBookFunc) {
    this.btnAdd.addEventListener("click", (event) => {
      event.preventDefault();
      this.clearValidateMsg();
      const newBook: BookType = {
        title: this.inputTile.value.trim(),
        author: this.inputAuthor.value.trim(),
        price: +this.inputPrice.value,
        totalQty: +this.inputTotalQty.value,
        availableQty: +this.inputAvailableQty.value
      }
      handler( newBook );
    });
  }

  appendBook(newBook: BookType) {
    // Create a task row for displaying data of new task
    const newBookElement = this.createBookElement(newBook);
    this.bookListElement.append(newBookElement);
    this.resetForm();
    this.closeTaskModal();
  }

  // Display confirm delete modal
  bindConfirmDeleteBook() {
    // Add event click from bookListElement
    this.bookListElement.addEventListener("click", (event: Event) => {
      // Find the element whose className is btn__del
      const target = event.target as Element;
      if (target.className === "btn__del fa fa-trash") {
        const { id } = (target as HTMLElement).dataset;
        this.openTaskDelete();
        // Set id for model
        const modalDelete = document.getElementById("bookDeleteModal");
        modalDelete.dataset.id = id;
      }
    });
  }

  // Delete book element
  bindDeleteBookElement(handle: DeleteBookFunc) {
    this.btnDelete.addEventListener("click", () => {
      const modalDelete = document.getElementById("bookDeleteModal");
      const { id } = modalDelete.dataset;
      handle(id);
    });
  }

  deleteBookElement(id: string) {
    // Get the id of target element
    const bookElement = document.getElementById(id);
    bookElement.remove();
    this.closeTaskDelete();
  }

  // Display data on modal
  bindDisplayBookOnModal() {
    this.bookListElement.addEventListener("click", (event: Event) => {
      const target = event.target as Element;
      if (target.className === "btn__update fa fa-pen") {
        const { id } = (target as HTMLInputElement).dataset;
        const currentBook = this.bookData.find((item) => item.id === id);
        if (currentBook) {
          this.openTaskModal();
          this.btnAdd.style.display = "none";
          this.btnUpdate.style.display = "block";

          // Get value and display on modal
          (<HTMLInputElement>document.getElementById("input__title")).value = currentBook.title;
          (<HTMLInputElement>document.getElementById("input__author")).value = currentBook.author;
          (<HTMLInputElement>document.getElementById("input__price")).value = currentBook.price.toString();
          (<HTMLInputElement>document.getElementById("input__totalQty")).value = currentBook.totalQty.toString();
          (<HTMLInputElement>document.getElementById("input__availableQty")).value = currentBook.availableQty.toString();

          const modal = document.getElementById("taskModal");
          modal.dataset.id = id;
        }
      }
    });
  }

  bindUpdateBook(handle: UpdateBookFunc) {
    this.btnUpdate.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = document.getElementById("taskModal");
      const { id } = modal.dataset;
      const updateBook: BookType = {
        title: this.inputTile.value.trim(),
        author: this.inputAuthor.value.trim(),
        price: +this.inputPrice.value,
        totalQty: +this.inputTotalQty.value,
        availableQty: +this.inputAvailableQty.value
      }
      handle(id, updateBook);
    });
  }

  updateBookElement(book: BookType) {
    const bookTitleElement = document.getElementById(`book-title-${book.id}`);
    bookTitleElement.innerHTML = `${book.title}`;

    const bookAuthorElement = document.getElementById(`book-author-${book.id}`);
    bookAuthorElement.innerHTML = `${book.author}`;

    const bookPriceElement = document.getElementById(`book-price-${book.id}`);
    bookPriceElement.innerHTML = `${book.price}`;

    const bookTotalElement = document.getElementById(`book-totalQty-${book.id}`);
    bookTotalElement.innerHTML = `${book.totalQty}`;

    const bookAvailableTitleElement = document.getElementById(`book-available-${book.id}`);
    bookAvailableTitleElement.innerHTML = `${book.availableQty}`;

    this.resetForm();
    this.closeTaskModal();
  }
}

